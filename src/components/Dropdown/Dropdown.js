import React, { Component } from 'react'
import { Auth } from 'aws-amplify'

// import scss
import './Dropdown.scss'

// Import Images
import defaultAvatar from '../../assets/default-avatar.png'

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
          src={defaultAvatar}
          alt="Default Profile Avatar"
        />
      </div>
    )
  }
}

export default Dropdown
