import { useState, useEffect } from 'react'
import type { NotesIndex, Note } from '../types'

const BASE = import.meta.env.BASE_URL

export function useNotesIndex() {
  const [data, setData] = useState<NotesIndex | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BASE}data/notes-index.json`)
      .then((r) => r.json())
      .then((d: NotesIndex) => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}

export function useNoteContent(file: string | undefined) {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!file) {
      setContent('')
      return
    }
    setLoading(true)
    fetch(`${BASE}notes/${file}`)
      .then((r) => r.text())
      .then(setContent)
      .catch(() => setContent('*Error loading note*'))
      .finally(() => setLoading(false))
  }, [file])

  return { content, loading }
}

export function getAdjacentNotes(
  flatList: Note[],
  currentSlug: string,
  currentCategory: string
): { prev: Note | null; next: Note | null; currentIndex: number } {
  const categoryNotes = flatList.filter((n) => n.category === currentCategory)
  const currentIndex = categoryNotes.findIndex((n) => n.slug === currentSlug)
  return {
    prev: currentIndex > 0 ? categoryNotes[currentIndex - 1] : null,
    next: currentIndex < categoryNotes.length - 1 ? categoryNotes[currentIndex + 1] : null,
    currentIndex,
  }
}
