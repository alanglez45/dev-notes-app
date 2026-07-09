import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { IndexPage } from './components/IndexPage'
import { CategoryPage } from './pages/CategoryPage'
import { NotePage } from './pages/NotePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <IndexPage /> },
      { path: ':category', element: <CategoryPage /> },
      { path: ':category/:slug', element: <NotePage /> },
    ],
  },
])
