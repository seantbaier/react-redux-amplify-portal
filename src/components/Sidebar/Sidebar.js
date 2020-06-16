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
            <Link to="/discrepancy">
              <img
                src={monitoringIcon}
                alt="Discrepancy Reports Icon"
                title="Discrepancy Report"
              />
            </Link>
            <span className="icon-name">Discrepancies</span>
          </div>
          <div className="nav-icon-container">
            <Link to="/salesforce">
              <img src={researchIcon} alt="Salesforce Reports Icon" />
            </Link>
            <span className="icon-name">Salesforce</span>
          </div>
          <div className="nav-icon-container">
            <Link to="/ecommerce">
              <img src={shopIcon} alt="Ecommerce Summary Page Icon" />
            </Link>
            <span className="icon-name">Ecommerce</span>
          </div>
          <div className="nav-icon-container">
            <Link to="/ums">
              <img src={businessIcon} alt="Organizations List Page" />
            </Link>
            <span className="icon-name">UMS</span>
          </div>
        </div>
        <Dropdown />
      </div>
    )
  }
}

export default Sidebar
