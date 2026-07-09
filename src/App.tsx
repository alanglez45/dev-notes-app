import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import { useNotesIndex } from './hooks/useNotes'
import { Sidebar } from './components/Sidebar'
import { SearchBar } from './components/SearchBar'
import { ThemeToggle } from './components/ThemeToggle'
import { ExportButton } from './components/ExportButton'
import { NotesContext } from './context/NotesContext'

export function App() {
  const { dark, toggle } = useTheme()
  const { data } = useNotesIndex()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const activeCategory = useLocation().pathname.split('/')[1]

  const categories = data?.categories ?? []
  const flatList = data?.flatList ?? []

  const goHome = () => {
    navigate('/')
    setMobileMenuOpen(false)
  }

  return (
    <NotesContext.Provider value={data}>
      <div className="app">
        <header className="header">
          <div className="header-left">
            <button
              className="hamburger"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 6l16 0" />
                <path d="M4 12l16 0" />
                <path d="M4 18l16 0" />
              </svg>
            </button>
            <h1 className="logo"><span>Dev</span> Notes</h1>
          </div>
          {categories.length > 0 && (
            <SearchBar notes={flatList} />
          )}
          <ExportButton />
          <ThemeToggle dark={dark} onToggle={toggle} />
        </header>

        <div className="main">
          {categories.length > 0 && (
            <Sidebar
              categories={categories}
              activeCategory={activeCategory}
              onHome={goHome}
              mobileOpen={mobileMenuOpen}
              onCloseMobile={() => setMobileMenuOpen(false)}
            />
          )}

          <main className="content">
            <Outlet />
          </main>
        </div>
        {/* <ExportModal /> */}
      </div>
    </NotesContext.Provider>
  )
}
