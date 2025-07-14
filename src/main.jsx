import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConsultaProvider } from './context/ConsultaContext.jsx'
import { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConsultaProvider>
      <App />
    </ConsultaProvider>
  </StrictMode>
);
