import { Component } from 'react'
import { Auth } from 'aws-amplify'

// import scss
import './Dropdown.scss'

class Dropdown extends Component {
  async componentDidMount() {}

  handleSignOut = () => {
    Auth.signOut()
  }

  render() {
    // TODO: Add withAuthenticator to get user data for this account
    // Or load the user data in the Store?
    return (
      <div className="dropdown-container">
        <img
          onClick={this.handleSignOut}
          src={require('../../assets/images/default-avatar.png')}
        />
      </div>
    )
  }
}

export default Dropdown
