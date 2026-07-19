#!/usr/bin/env node

import { readFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import { createHighlighter } from 'shiki';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const NOTES_DIR = join(ROOT, 'public', 'notes');
const OUTPUT_DIR = join(ROOT, 'output');

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 14px;
    line-height: 1.7;
    color: #1a1a1a;
    padding: 40px 50px;
    max-width: 900px;
    margin: 0 auto;
  }

  h1 { font-size: 28px; font-weight: 700; margin: 32px 0 16px; color: #111; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
  h2 { font-size: 22px; font-weight: 600; margin: 28px 0 12px; color: #1f2937; }
  h3 { font-size: 18px; font-weight: 600; margin: 24px 0 8px; color: #374151; }
  h4 { font-size: 15px; font-weight: 600; margin: 20px 0 8px; color: #4b5563; }

  p { margin: 8px 0; }

  a { color: #2563eb; text-decoration: none; }
  a:hover { text-decoration: underline; }

  code {
    font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
    font-size: 13px;
  }

  /* Inline code */
  .inline-code {
    background: #DADEE1;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
    border: 1px solid #e7e5e4;
    color: #1a1a1a;
  }

  /* Code block wrapper */
  .code-block-wrap {
    border-radius: 10px;
    overflow: hidden;
    margin: 12px 0;
    border: 1px solid #DADEE1;
    page-break-inside: avoid;
  }

  /* Code block header */
  .code-block-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 14px;
    background: #DADEE1;
    border-bottom: 1px solid #DADEE1;
  }

  .code-lang {
    color: #64687e;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 12px;
  }

  .code-block-wrap pre {
    margin: 0;
    border-radius: 0 0 8px 8px;
    padding: 0;
    font-size: 13px;
    line-height: 1.5;
    overflow-x: auto;
  }

  .code-block-wrap pre code {
    background: none;
    padding: 0;
    font-size: 13px;
  }

  .code-block-wrap .shiki {
    background: transparent !important;
    border-radius: 0 0 8px 8px;
    padding: 10px 14px;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
    font-size: 13px;
    page-break-inside: avoid;
  }

  th, td {
    border: 1px solid #d1d5db;
    padding: 8px 12px;
    text-align: left;
  }

  th {
    background: #f9fafb;
    font-weight: 600;
    color: #374151;
  }

  tr:nth-child(even) { background: #f9fafb; }

  blockquote {
    border-left: 4px solid #3b82f6;
    padding: 12px 16px;
    margin: 12px 0;
    background: #eff6ff;
    color: #1e40af;
    border-radius: 0 6px 6px 0;
  }

  blockquote p { margin: 0; }

  ul, ol { margin: 8px 0; padding-left: 24px; }
  li { margin: 4px 0; }

  hr { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }

  strong { font-weight: 600; }

  .file-title {
    font-size: 32px;
    font-weight: 700;
    color: #111;
    margin-bottom: 8px;
    page-break-after: avoid;
  }

  .file-separator {
    page-break-before: always;
    border-top: 3px solid #3b82f6;
    padding-top: 20px;
    margin-top: 0;
  }

  .toc { page-break-after: always; }
  .toc h1 { border-bottom: 3px solid #3b82f6; }
  .toc ul { list-style: none; padding: 0; }
  .toc li { padding: 6px 0; border-bottom: 1px dashed #e5e7eb; }
  .toc li a { color: #374151; font-weight: 500; }

`;

marked.setOptions({
  gfm: true,
  breaks: false,
});

function parseIndex(indexPath) {
  const content = readFileSync(indexPath, 'utf-8');
  const files = [];
  const regex = /\[.*?\]\((.*?\.md)\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    files.push(match[1]);
  }
  return files;
}

function getMdFiles(dir) {
  return readdirSync(dir)
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .sort();
}

let highlighter;

async function initHighlighter() {
  highlighter = await createHighlighter({
    themes: ['github-light'],
    langs: [
      'javascript', 'typescript', 'jsx', 'tsx',
      'html', 'css', 'json', 'bash', 'shell',
      'python', 'sql', 'markdown', 'yaml', 'text',
    ],
  });
}

function highlightCode(code, lang) {
  const langMap = {
    js: 'javascript',
    ts: 'typescript',
    sh: 'shell',
    shellscript: 'shell',
  };
  const resolvedLang = langMap[lang] || lang || 'text';

  try {
    return highlighter.codeToHtml(code, {
      lang: resolvedLang,
      theme: 'github-light',
    });
  } catch {
    return highlighter.codeToHtml(code, {
      lang: 'text',
      theme: 'github-light',
    });
  }
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function wrapCodeBlock(lang, highlighted) {
  return `
    <div class="code-block-wrap">
      <div class="code-block-header">
        <span class="code-lang">${lang}</span>
      </div>
      ${highlighted}
    </div>`;
}

function mdToHtml(filePath) {
  const md = readFileSync(filePath, 'utf-8');
  const rawHtml = marked.parse(md);

  // Step 1: code blocks with language class
  let result = rawHtml.replace(
    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
    (_, lang, code) => {
      const decoded = decodeHtmlEntities(code);
      const highlighted = highlightCode(decoded, lang);
      return wrapCodeBlock(lang, highlighted);
    }
  );

  // Step 2: code blocks without language class
  result = result.replace(
    /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
    (_, code) => {
      const decoded = decodeHtmlEntities(code);
      const highlighted = highlightCode(decoded, 'text');
      return wrapCodeBlock('text', highlighted);
    }
  );

  // Step 3: inline code — protect code blocks first
  const blocks = [];
  result = result.replace(/(<div class="code-block-wrap">[\s\S]*?<\/div>)/g, (m) => {
    blocks.push(m);
    return `%%BLOCK_${blocks.length - 1}%%`;
  });

  result = result.replace(/<code>([^<]+)<\/code>/g, (_, content) => {
    return `<code class="inline-code">${content}</code>`;
  });

  result = result.replace(/%%BLOCK_(\d+)%%/g, (_, i) => blocks[Number(i)]);

  return result;
}

function buildHtml(sections, title) {
  const tocItems = sections.map((s, i) =>
    `<li><a href="#section-${i}">${s.title}</a></li>`
  ).join('\n');

  const contentParts = sections.map((s, i) => {
    const cls = i > 0 ? 'file-separator' : '';
    return `<div id="section-${i}" class="${cls}">${s.html}</div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>${CSS}</style>
</head>
<body>
  <div class="toc">
    <h1>${title}</h1>
    <p style="color:#6b7280;margin-bottom:20px;">Table of Contents</p>
    <ul>${tocItems}</ul>
  </div>
  ${contentParts}
</body>
</html>`;
}

async function generatePdf(html, outputPath) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('screen');

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: '<div style="font-size:9px;color:#9ca3af;width:100%;text-align:center;padding:0 50px;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
  });

  await browser.close();
  console.log(`PDF generated: ${outputPath}`);
}

async function main() {
  await initHighlighter();

  const args = process.argv.slice(2);

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Mode 1: --all (combine all files from index.md)
  if (args.includes('--all')) {
    const indexPath = join(NOTES_DIR, 'React', 'index.md');
    const files = parseIndex(indexPath);
    const sections = files.map(f => {
      const filePath = join(NOTES_DIR, 'React', f);
      if (!existsSync(filePath)) {
        console.warn(`File not found: ${f}`);
        return null;
      }
      const title = basename(f, '.md');
      const html = mdToHtml(filePath);
      return { title, html };
    }).filter(Boolean);

    const fullHtml = buildHtml(sections, 'React Notes');
    const outputPath = join(OUTPUT_DIR, 'React-Notes.pdf');
    await generatePdf(fullHtml, outputPath);
    await highlighter.dispose();
    return;
  }

  // Mode 2: --folder <path> (combine all .md from a folder)
  const folderIdx = args.indexOf('--folder');
  if (folderIdx !== -1 && args[folderIdx + 1]) {
    const folderPath = resolve(args[folderIdx + 1]);
    const files = getMdFiles(folderPath);
    const sections = files.map(f => {
      const filePath = join(folderPath, f);
      const title = basename(f, '.md');
      const html = mdToHtml(filePath);
      return { title, html };
    });

    const folderName = basename(folderPath);
    const fullHtml = buildHtml(sections, folderName);
    const outputPath = join(OUTPUT_DIR, `${folderName}.pdf`);
    await generatePdf(fullHtml, outputPath);
    await highlighter.dispose();
    return;
  }

  // Mode 3: Individual file(s)
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node scripts/md-to-pdf.mjs --all                          # All React notes in one PDF');
    console.log('  node scripts/md-to-pdf.mjs --folder public/notes/React     # All .md from folder');
    console.log('  node scripts/md-to-pdf.mjs path/to/file.md                # Single file');
    console.log('  node scripts/md-to-pdf.mjs file1.md file2.md              # Multiple files');
    await highlighter.dispose();
    return;
  }

  const files = args.filter(a => !a.startsWith('--'));
  const sections = files.map(f => {
    const filePath = resolve(f);
    if (!existsSync(filePath)) {
      console.warn(`File not found: ${f}`);
      return null;
    }
    const title = basename(f, '.md');
    const html = mdToHtml(filePath);
    return { title, html };
  }).filter(Boolean);

  if (sections.length === 1) {
    const outputPath = join(OUTPUT_DIR, `${sections[0].title}.pdf`);
    const html = buildHtml(sections, sections[0].title);
    await generatePdf(html, outputPath);
  } else {
    const fullHtml = buildHtml(sections, 'React Notes');
    const outputPath = join(OUTPUT_DIR, 'React-Notes.pdf');
    await generatePdf(fullHtml, outputPath);
  }

  await highlighter.dispose();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
