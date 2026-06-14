import { useMemo } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useNoteContent, getAdjacentNotes } from '../hooks/useNotes'
import { useNotesContext } from '../context/NotesContext'
import { NoteViewer } from '../components/NoteViewer'
import { NavButtons } from '../components/NavButtons'

export function NotePage() {
  const { category, slug } = useParams<{ category: string; slug: string }>()
  const data = useNotesContext()

  const note = useMemo(() => {
    if (!data || !category || !slug) return null
    return data.flatList.find(
      (n) => n.category === category && n.slug === slug
    ) ?? null
  }, [data, category, slug])

  const { content, loading } = useNoteContent(note?.file)

  const categoryNotes = useMemo(() => {
    if (!data || !note) return 0
    return data.flatList.filter((n) => n.category === note.category).length
  }, [data, note])

  const { prev, next, currentIndex } = useMemo(() => {
    if (!note || !data) return { prev: null, next: null, currentIndex: 0 }
    return getAdjacentNotes(data.flatList, note.slug, note.category)
  }, [data, note])

  if (!data) return null

  if (!note) return <Navigate to="/" replace />

  return (
    <>
      {loading ? (
        <div className="note-viewer loading-state">
          <div className="spinner" />
        </div>
      ) : (
        <>
          <NoteViewer content={content} />
          <NavButtons
            prev={prev}
            next={next}
            currentIndex={currentIndex}
            total={categoryNotes}
          />
        </>
      )}
    </>
  )
}
