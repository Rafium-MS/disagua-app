import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/tailwind.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import { loadFromIndexedDBToLocalStorage, syncLocalStorageToIndexedDB } from './utils/indexeddbSync.js'

// Bootstrap IndexedDB sync
await loadFromIndexedDBToLocalStorage();
await syncLocalStorageToIndexedDB();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
