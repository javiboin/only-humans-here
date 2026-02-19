import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PositionList } from './components/PositionList.jsx'
import { Footer } from './Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PositionList />
    <Footer />
  </StrictMode>,
)
