// import scss
import React from 'react'
import './Dashboard.scss'

// Import Images
import datalabLogo from '../../assets/datalab-logo.png'

export default function Dashboard({ children }) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <img src={datalabLogo} alt="Encoura Datalab Logo" />
      </div>
      {children}
    </div>
  )
}
