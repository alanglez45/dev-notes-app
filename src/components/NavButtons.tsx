import { useNavigate } from 'react-router-dom'
import type { Note } from '../types'

interface NavButtonsProps {
  prev: Note | null
  next: Note | null
  currentIndex: number
  total: number
}

export function NavButtons({ prev, next, currentIndex, total }: NavButtonsProps) {
  const navigate = useNavigate()

  return (
    <div className="nav-buttons">
      <div className="nav-position">
        {currentIndex + 1} / {total}
      </div>
      <div className="nav-actions">
        <button
          className="nav-btn"
          disabled={!prev}
          onClick={() => prev && navigate(`/${prev.category}/${prev.slug}`)}
        >
          ← Previous
        </button>
        <button
          className="nav-btn"
          disabled={!next}
          onClick={() => next && navigate(`/${next.category}/${next.slug}`)}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
