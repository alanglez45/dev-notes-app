import { useNavigate } from 'react-router-dom'
import type { Category } from '../types'

interface SidebarProps {
  categories: Category[]
  activeCategory?: string
  onHome: () => void
  mobileOpen?: boolean
  onCloseMobile?: () => void
}

export function Sidebar({ categories, activeCategory, onHome, mobileOpen, onCloseMobile }: SidebarProps) {
  const navigate = useNavigate()

  const drawer = (
    <nav className="sidebar">
      <div className="sidebar-category">
        <button
          className={`sidebar-category-header${!activeCategory ? ' active' : ''}`}
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
            className={`sidebar-category-header${cat.name === activeCategory ? ' active' : ''}`}
            onClick={() => {
              navigate(`/${cat.name}`)
              onCloseMobile?.()
            }}
          >
            <span className='icon'>
              <img src={cat.icon} alt={cat.name} />
            </span>
            {cat.name}
          </button>
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
