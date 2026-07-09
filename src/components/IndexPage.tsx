import { Link } from 'react-router-dom'
import { useNotesContext } from '../context/NotesContext'
import { useSelection } from '../context/SelectionContext'

export function IndexPage() {
  const data = useNotesContext()
  const categories = data?.categories ?? []
  const { selectedFiles, toggleFile } = useSelection()

  const totalNotes = categories.reduce((sum, c) => sum + c.notes.length, 0)

  const allSelected = categories.every((cat) =>
    cat.notes.every((n) => selectedFiles.has(n.file)),
  )

  const toggleAll = () => {
    const allFiles = categories.flatMap((c) => c.notes.map((n) => n.file))
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
    <div className="index-page">
      <div className="index-header">
        <div>
          <h1>Dev Notes</h1>
          <p className="index-subtitle">
            {totalNotes} notes across {categories.length} categories
          </p>
        </div>
        <label className="select-all-toggle">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={toggleAll}
          />
          Seleccionar todas
        </label>
      </div>

      {categories.map((cat) => (
        <section key={cat.name} className="index-section">
          <h2>
            <span>
              <img src={cat.icon} alt="" />
            </span>
            {cat.name}
            <span className="index-section-count">{cat.notes.length}</span>
          </h2>
          <ul className="index-list">
            {cat.notes.map((note) => (
              <li key={note.file} className="index-item">
                <input
                  type="checkbox"
                  className="note-select"
                  checked={selectedFiles.has(note.file)}
                  onChange={() => toggleFile(note.file)}
                  onClick={(e) => e.stopPropagation()}
                />
                <Link
                  to={`/${cat.name}/${note.slug}`}
                  className="index-link"
                >
                  <div className="card-content">
                    <h3>{note.title}</h3>
                    {note.description && <p>{note.description}</p>}
                  </div>
                  <span className="card-arrow">›</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
