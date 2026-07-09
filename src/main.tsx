import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ThemeProvider } from './context/ThemeContext'
import { SelectionProvider } from './context/SelectionContext'
import './normalize.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SelectionProvider>
        <RouterProvider router={router} />
      </SelectionProvider>
    </ThemeProvider>
  </StrictMode>,
)
