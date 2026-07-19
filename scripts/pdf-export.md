# PDF Export Guide

Export markdown notes to PDF using Puppeteer.

## Commands

| Command | Description |
|---|---|
| `npm run pdf` | Export all React notes into a single PDF |
| `npm run pdf:folder` | Export all `.md` files from `public/notes/React/` |

## Manual Usage

```bash
# All notes combined
node scripts/md-to-pdf.mjs --all

# Specific folder
node scripts/md-to-pdf.mjs --folder public/notes/React/

# Single file
node scripts/md-to-pdf.mjs public/notes/React/06a-hooks-state.md

# Multiple files
node scripts/md-to-pdf.mjs 01-fundamentals.md 02-jsx.md
```

## Output

PDFs are saved to `output/` directory.

| Flag | Output |
|---|---|
| `--all` | `output/React-Notes.pdf` |
| `--folder <path>` | `output/<folder-name>.pdf` |
| Single file | `output/<file-name>.pdf` |

## Notes

- Uses `index.md` for file ordering when using `--all`
- Includes table of contents and page numbers
- Page breaks between sections
