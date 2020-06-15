import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Import components
import Dropdown from '../Dropdown/Dropdown'

// Import scss
import './Sidebar.scss'

// Import Images
import monitoringIcon from '../../assets/monitoring-evaluation.svg'
import researchIcon from '../../assets/research.svg'
import shopIcon from '../../assets/shop.svg'
import businessIcon from '../../assets/business.svg'

class Sidebar extends Component {
  async componentDidMount() {}

  render() {
    return (
      <div className="sidebar-container">
        <div className="nav-container">
          <div className="nav-icon-container">
            <Link to="/discrepancy-report">
              <img src={monitoringIcon} alt="Discrepancy Reports Icon" />
            </Link>
          </div>
          <div className="nav-icon-container">
            <Link to="/salesforce-reports">
              <img src={researchIcon} alt="Salesforce Reports Icon" />
            </Link>
          </div>
          <div className="nav-icon-container">
            <Link to="/ecommerce">
              <img src={shopIcon} alt="Ecommerce Summary Page Icon" />
            </Link>
          </div>
          <div className="nav-icon-container">
            <Link to="/organizations">
              <img src={businessIcon} alt="Organizations List Page" />
            </Link>
          </div>
        </div>
        <Dropdown />
      </div>
    )
  }
}

export default Sidebar
