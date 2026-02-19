import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PositionList } from './components/PositionList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PositionList />
  </StrictMode>,
)
