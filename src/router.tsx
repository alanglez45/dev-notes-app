import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { IndexPage } from './components/IndexPage'
import { NotePage } from './pages/NotePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <IndexPage /> },
      { path: ':category/:slug', element: <NotePage /> },
    ],
  },
])
