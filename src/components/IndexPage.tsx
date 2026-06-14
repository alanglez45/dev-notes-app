import { Link } from 'react-router-dom'
import { useNotesContext } from '../context/NotesContext'

export function IndexPage() {
  const data = useNotesContext()
  const categories = data?.categories ?? []

  const totalNotes = categories.reduce((sum, c) => sum + c.notes.length, 0)

  return (
    <div className="index-page">
      <h1>JavaScript Notes</h1>
      <p className="index-subtitle">
        {totalNotes} notes across {categories.length} categories
      </p>

      {categories.map((cat) => (
        <section key={cat.name} className="index-section">
          <h2>
            <span>
              <img src={cat.icon} alt="" />
            </span>
            {cat.name}
          </h2>
          <ul className="index-list">
            {cat.notes.map((note) => (
              <li key={note.file} className="index-item">
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
