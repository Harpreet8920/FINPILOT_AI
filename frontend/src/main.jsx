import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './Dashboard' // Make sure this matches your filename
import './index.css' // Ensure this file exists for Tailwind/CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
)