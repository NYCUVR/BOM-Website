import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n'
import { AuthProvider } from './context/AuthContext.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <App />
      </Suspense>
    </AuthProvider>
  </React.StrictMode>,
)
