import { createContext, useContext } from 'react'
import type { NotesIndex } from '../types'

export const NotesContext = createContext<NotesIndex | null>(null)

export function useNotesContext() {
  return useContext(NotesContext)
}
