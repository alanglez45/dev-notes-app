export interface Note {
  slug: string
  title: string
  description: string
  file: string
  category: string
}

export interface Category {
  name: string
  icon: string
  notes: Note[]
}

export interface NotesIndex {
  categories: Category[]
  flatList: Note[]
}


