import React from 'react'
import ReactDOM from 'react-dom/client'
// Update this line to point to the pages folder
import Dashboard from './pages/Dashboard.jsx' 
import './styles/global.css' // Adjust if your CSS is in the styles folder

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
)