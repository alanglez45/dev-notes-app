import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import type { Note } from '../types'
import { useNotesContext } from '../context/NotesContext'
import { useSelection } from '../context/SelectionContext'
import { NoteViewer } from './NoteViewer'

const BASE = import.meta.env.BASE_URL

interface ExportModalProps {
  files: string[]
  onClose: () => void
}

export function ExportModal({ files, onClose }: ExportModalProps) {
  const data = useNotesContext()
  const { clearSelection } = useSelection()
  const previewRef = useRef<HTMLDivElement>(null)

  const orderedNotes = useMemo(() => {
    if (!data) return []
    return data.flatList.filter((n) => files.includes(n.file))
  }, [files, data])

  const [contents, setContents] = useState<Map<string, string>>(new Map())
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function fetchAll() {
      setFetching(true)
      const map = new Map<string, string>()
      for (const note of orderedNotes) {
        if (cancelled) return
        try {
          const res = await fetch(`${BASE}notes/${note.file}`)
          const text = await res.text()
          map.set(note.file, text)
        } catch {
          map.set(note.file, '*Error loading note*')
        }
      }
      if (!cancelled) {
        setContents(map)
        setFetching(false)
      }
    }
    fetchAll()
    return () => { cancelled = true }
  }, [orderedNotes])

  const [status, setStatus] = useState<'idle' | 'generating' | 'done'>('idle')
  const [progress, setProgress] = useState(0)
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0)

  const currentNote = currentNoteIndex < orderedNotes.length ? orderedNotes[currentNoteIndex] : null

  const generatePDF = useCallback(async () => {
    setStatus('generating')

    const [{ jsPDF }, html2canvas] = await Promise.all([
      import('jspdf'),
      import('html2canvas').then((m) => m.default),
    ])

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 10
    const usableWidth = pageWidth - 2 * margin
    const usableHeight = pageHeight - 2 * margin

    for (let i = 0; i < orderedNotes.length; i++) {
      setCurrentNoteIndex(i)
      setProgress(i + 1)

      await new Promise((r) => requestAnimationFrame(r))
      await new Promise((r) => setTimeout(r, 300))

      const el = previewRef.current
      if (!el) continue

      const canvas = await html2canvas(el, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })

      if (canvas.width === 0 || canvas.height === 0) continue

      const imgWidth = usableWidth
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      if (i > 0) pdf.addPage()

      if (imgHeight <= usableHeight) {
        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          margin,
          margin,
          imgWidth,
          imgHeight,
        )
      } else {
        let srcY = 0
        let pageNum = 0
        while (srcY < canvas.height) {
          if (pageNum > 0) pdf.addPage()

          const sliceH = Math.min(
            canvas.height - srcY,
            (canvas.width * usableHeight) / imgWidth,
          )

          const sliceCanvas = document.createElement('canvas')
          sliceCanvas.width = canvas.width
          sliceCanvas.height = Math.round(sliceH)
          const ctx = sliceCanvas.getContext('2d')!
          ctx.drawImage(
            canvas,
            0, srcY,
            canvas.width, sliceCanvas.height,
            0, 0,
            canvas.width, sliceCanvas.height,
          )

          pdf.addImage(
            sliceCanvas.toDataURL('image/png'),
            'PNG',
            margin,
            margin,
            imgWidth,
            usableHeight,
          )

          srcY += sliceCanvas.height
          pageNum++
        }
      }
    }

    pdf.save('notas-exportadas.pdf')
    clearSelection()
    setStatus('done')
  }, [orderedNotes, clearSelection])

  const groupByCategory = useMemo(() => {
    if (!data) return []
    const map = new Map<string, Note[]>()
    for (const note of orderedNotes) {
      const arr = map.get(note.category) ?? []
      arr.push(note)
      map.set(note.category, arr)
    }
    return [...map.entries()]
  }, [orderedNotes, data])

  const totalNotes = orderedNotes.length

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Exportar PDF</h2>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {fetching ? (
            <div className="modal-loading">
              <div className="spinner" />
              <p>Cargando notas...</p>
            </div>
          ) : status === 'done' ? (
            <div className="export-status">
              <div className="export-done">
                <p className="export-done-text">PDF generado exitosamente</p>
                <button className="btn btn-primary" onClick={onClose}>
                  Cerrar
                </button>
              </div>
            </div>
          ) : status === 'generating' ? (
            <div className="export-status">
              <div className="export-progress-bar">
                <div
                  className="export-progress-fill"
                  style={{ width: `${(progress / totalNotes) * 100}%` }}
                />
              </div>
              <p className="export-progress-text">
                Generando PDF... {progress} / {totalNotes}
              </p>
              {currentNote && (
                <p className="export-current-note">
                  {currentNote.category}: {currentNote.title}
                </p>
              )}
            </div>
          ) : (
            <>
              <p className="modal-info">
                {totalNotes} nota{totalNotes !== 1 ? 's' : ''} seleccionada{totalNotes !== 1 ? 's' : ''}
              </p>
              <div className="export-list">
                {groupByCategory.map(([cat, notes]) => (
                  <div key={cat} className="export-category-group">
                    <span className="export-category-name">{cat}</span>
                    <ul className="export-category-notes">
                      {notes.map((n) => (
                        <li key={n.file} className="export-note-item">
                          {n.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary export-generate-btn" onClick={generatePDF}>
                Generar PDF
              </button>
            </>
          )}
        </div>
      </div>

      {/* Full-viewport overlay for html2canvas capture - no parent scroll clipping */}
      {status === 'generating' && currentNote && (
        <div className="pdf-capture-overlay">
          <div className="pdf-capture-content" ref={previewRef}>
            <NoteViewer
              content={contents.get(currentNote.file) ?? ''}
              dark={false}
            />
          </div>
        </div>
      )}
    </div>
  )
}
