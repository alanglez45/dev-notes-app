import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'

interface SelectionContextValue {
  selectedFiles: Set<string>
  toggleFile: (file: string) => void
  selectAll: (files: string[]) => void
  clearSelection: () => void
  count: number
}

const SelectionContext = createContext<SelectionContextValue | null>(null)

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())

  const toggleFile = useCallback((file: string) => {
    setSelectedFiles((prev) => {
      const next = new Set(prev)
      if (next.has(file)) {
        next.delete(file)
      } else {
        next.add(file)
      }
      return next
    })
  }, [])

  const selectAll = useCallback((files: string[]) => {
    setSelectedFiles((prev) => {
      const next = new Set(prev)
      for (const f of files) next.add(f)
      return next
    })
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedFiles(new Set())
  }, [])

  const value = useMemo(
    () => ({ selectedFiles, toggleFile, selectAll, clearSelection, count: selectedFiles.size }),
    [selectedFiles, toggleFile, selectAll, clearSelection],
  )

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  )
}

export function useSelection() {
  const ctx = useContext(SelectionContext)
  if (!ctx) throw new Error('useSelection must be used within SelectionProvider')
  return ctx
}
