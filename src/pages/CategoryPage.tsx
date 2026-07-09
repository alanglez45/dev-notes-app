import { useMemo } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { useNotesContext } from '../context/NotesContext'
import { useSelection } from '../context/SelectionContext'

export function CategoryPage() {
  const { category } = useParams<{ category: string }>()
  const data = useNotesContext()
  const { selectedFiles, toggleFile } = useSelection()

  const cat = useMemo(() => {
    if (!data || !category) return null
    return data.categories.find((c) => c.name === category) ?? null
  }, [data, category])

  if (!data) return null
  if (!cat) return <Navigate to="/" replace />

  const allSelected = cat.notes.every((n) => selectedFiles.has(n.file))

  const toggleAll = () => {
    const allFiles = cat.notes.map((n) => n.file)
    const someUnselected = allFiles.some((f) => !selectedFiles.has(f))
    if (someUnselected) {
      for (const f of allFiles) {
        if (!selectedFiles.has(f)) toggleFile(f)
      }
    } else {
      for (const f of allFiles) {
        if (selectedFiles.has(f)) toggleFile(f)
      }
    }
  }

  return (
    <div className="category-page">
      <div className="category-page-notes">
        <div className="category-page-notes-header">
          <h2>
            <span className="cat-icon">
              <img src={cat.icon} alt="" />
            </span>
            {cat.name}
          </h2>
          <label className="select-all-toggle">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
            />
            Seleccionar todas
          </label>
        </div>

        <div className="index-list">
          {cat.notes.map((note) => (
            <div key={note.file} className="index-item">
              <input
                type="checkbox"
                className="note-select"
                checked={selectedFiles.has(note.file)}
                onChange={() => toggleFile(note.file)}
                onClick={(e) => e.stopPropagation()}
              />
              <Link to={`/${category}/${note.slug}`} className="index-link">
                <div className="card-content">
                  <h3>{note.title}</h3>
                  {note.description && <p>{note.description}</p>}
                </div>
                <span className="card-arrow">›</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
