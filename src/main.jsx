import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/*En un futur fer que directament et porti a HomePage o Loading i eliminar App*/}
  </StrictMode>,
)
