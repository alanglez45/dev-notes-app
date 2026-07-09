import { useState } from 'react'
import { useSelection } from '../context/SelectionContext'
import { ExportModal } from './ExportModal'

export function ExportButton() {
  const { count, selectedFiles } = useSelection()
  const [open, setOpen] = useState(false)

  if (count === 0) return null

  return (
    <>
      <button
        className="export-btn"
        onClick={() => setOpen(true)}
        title={`Exportar ${count} notas`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span className="export-btn-label">Exportar</span>
        <span className="export-badge">{count}</span>
      </button>
      {open && (
        <ExportModal
          files={[...selectedFiles]}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
