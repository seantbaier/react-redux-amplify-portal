import { Component } from 'react'
import Link from 'next/link'

// import components
import Dropdown from '../Dropdown/Dropdown'

// import scss
import './Sidebar.scss'

class Sidebar extends Component {
  async componentDidMount() {}

  render() {
    return (
      <div className="sidebar-container">
        <div className="nav-container">
          <div className="nav-icon-container">
            <Link href="/discrepancy-report">
              <img
                src={require('../../assets/images/monitoring-evaluation.svg')}
              />
            </Link>
          </div>
          <div className="nav-icon-container">
            <Link href="salesforce-reports">
              <img src={require('../../assets/images/research.svg')} />
            </Link>
          </div>
          <div className="nav-icon-container">
            <Link href="/ecommerce">
              <img src={require('../../assets/images/shop.svg')} />
            </Link>
          </div>
          <div className="nav-icon-container">
            <Link href="/organizations">
              <img src={require('../../assets/images/business.svg')} />
            </Link>
          </div>
        </div>
        <Dropdown />
      </div>
    )
  }
}

export default Sidebar
