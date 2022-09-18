import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
  </HashRouter>
)
