import { StrictMode } from 'react'
import { createRoot, ReactDOM } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConsultaProvider } from './context/ConsultaContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConsultaProvider>
      <App />
    </ConsultaProvider>
  </StrictMode>,
)
