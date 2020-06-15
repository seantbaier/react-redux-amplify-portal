import { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Link from 'next/link'
import amplifyCustomUi from '../../utilities/custom-auth-ui-config'

// import components

// actions

// import scss
import './SalesforceReportsList.scss'

class SalesforceReportsList extends Component {
  render() {
    const { authState } = this.props

    if (authState === 'signedIn') {
      return (
        <div className="list-container">
          <Link href="salesforce-reports/platform-data-contract-check">
            <a>Platform Data Contract Check Report</a>
          </Link>
          <Link href="salesforce-reports/platform-data-contract-check">
            <a>Other Fake Report</a>
          </Link>
        </div>
      )
    } else {
      Auth.signOut()
    }
    return null
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => ({})

export default amplifyCustomUi.withAuthenticator(
  compose(connect(mapStateToProps, mapDispatchToProps))(SalesforceReportsList)
)
