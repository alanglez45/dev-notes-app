import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Category } from '../types'

interface SidebarProps {
  categories: Category[]
  activeNote: string | undefined
  onHome: () => void
  mobileOpen?: boolean
  onCloseMobile?: () => void
}

export function Sidebar({ categories, activeNote, onHome, mobileOpen, onCloseMobile }: SidebarProps) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    for (const cat of categories) {
      init[cat.name] = cat.notes.some((n) => n.file === activeNote)
    }
    return init
  })

  const toggle = (name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const drawer = (
    <nav className="sidebar">
      <div className="sidebar-category">
        <button
          className="sidebar-category-header"
          onClick={onHome}
        >
          <span className='icon'>
            <img src="/home.png" alt="Home icon" />
          </span>
          Home
        </button>
      </div>
      {categories.map((cat) => (
        <div key={cat.name} className="sidebar-category">
          <button
            className={`sidebar-category-header ${expanded[cat.name] ? 'expanded' : ''}`}
            onClick={() => toggle(cat.name)}
          >
            <span className='icon'>
              <img src={cat.icon} alt={cat.name} />
            </span>
            {cat.name}
            <span className="note-count">{cat.notes.length}</span>
          </button>
          {expanded[cat.name] && (
            <ul className="sidebar-notes">
              {cat.notes.map((note) => (
                <li
                  key={note.file}
                  className={`sidebar-note ${note.file === activeNote ? 'active' : ''}`}
                  onClick={() => {
                    navigate(`/${cat.name}/${note.slug}`)
                    onCloseMobile?.()
                  }}
                >
                  <span className="sidebar-note-title">{note.title}</span>
                  {note.description && (
                    <span className="sidebar-note-desc">{note.description}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  )

  return (
    <>
      {drawer}
      <div className={`mobile-overlay ${mobileOpen ? 'show' : ''}`} onClick={onCloseMobile} />
      <div className={`mobile-drawer ${mobileOpen ? 'show' : ''}`}>
        <div className="mobile-drawer-header">
          <button className="mobile-drawer-close" onClick={onCloseMobile} aria-label="Close navigation">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        {drawer}
      </div>
    </>
  )
}
