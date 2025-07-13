import { ReactDOM } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConsultaProvider } from './context/ConsultaContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConsultaProvider>
      <App />
    </ConsultaProvider>
  </React.StrictMode>
);
