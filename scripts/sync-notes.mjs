import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const notasDir = path.resolve(__dirname, '../public/notes')
const publicDir = path.resolve(__dirname, '../public')

const iconMap = {
  JavaScript: '/js.png',
  React: '/react.png',
  Redux: '/redux.png',
  TypeScript: '/typescript.png',
  NextJS: '/nextjs.png',
  Zustand: '/zustand.svg',
  BackendNotes: '/nodejs.png',
}

function parseIndexMd(indexPath) {
  const descMap = {}
  try {
    const content = fs.readFileSync(indexPath, 'utf-8')
    const lines = content.split('\n')
    let currentCategory = ''
    for (const line of lines) {
      const catMatch = line.match(/^##\s+(.+)/)
      if (catMatch) currentCategory = catMatch[1].trim()
      const entryMatch = line.match(/^-\s+\[(.+)\]\((.+?\.md)\)\s*(?:-\s*(.+))?/)
      if (entryMatch) {
        const filePath = entryMatch[2].trim()
        const desc = entryMatch[3] ? entryMatch[3].trim() : ''
        descMap[filePath] = desc
      }
    }
  } catch { }
  return descMap
}

function getTitleFromMarkdown(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const match = content.match(/^#\s+(.+)/m)
    return match ? match[1].trim() : path.basename(filePath, '.md')
  } catch {
    return path.basename(filePath, '.md')
  }
}

function syncNotes() {
  if (!fs.existsSync(notasDir)) {
    console.error(`Notas directory not found at ${notasDir}`)
    process.exit(1)
  }

  const descMap = parseIndexMd(path.join(notasDir, 'index.md'))
  const excludeDirs = new Set(['notely', 'node_modules', '.git', 'assets'])
  const categories = []

  const entries = fs.readdirSync(notasDir, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory() || excludeDirs.has(entry.name)) continue

    const categoryDir = path.join(notasDir, entry.name)
    const notes = []

    const files = fs.readdirSync(categoryDir)
    for (const file of files) {
      if (!file.endsWith('.md')) continue

      const filePath = path.join(categoryDir, file)
      const relPath = path.join(entry.name, file)

      const title = getTitleFromMarkdown(filePath)
      const slug = file.replace(/\.md$/, '')
      const description = descMap[relPath] || ''
      notes.push({ slug, title, description, file: relPath })
    }

    notes.sort((a, b) => a.title.localeCompare(b.title))
    categories.push({ name: entry.name, icon: iconMap[entry.name] || '', notes })
  }

  categories.sort((a, b) => a.name.localeCompare(b.name))

  const flatList = categories.flatMap(c =>
    c.notes.map(n => ({ ...n, category: c.name }))
  )

  const indexData = { categories, flatList }
  const dataDir = path.join(publicDir, 'data')
  fs.mkdirSync(dataDir, { recursive: true })
  fs.writeFileSync(
    path.join(dataDir, 'notes-index.json'),
    JSON.stringify(indexData, null, 2),
    'utf-8'
  )

  console.log(`Synced ${flatList.length} notes across ${categories.length} categories`)
}

syncNotes()
