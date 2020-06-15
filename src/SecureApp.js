import React, { Component } from 'react'
import amplifyCustomUi from 'aws-amplify-react-custom-ui'
import { Auth } from 'aws-amplify'

const styes = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: { width: '200px', height: '60px', backgroundColor: 'red' },
}
class SecureApp extends Component {
  signOut = () => {
    const { onStateChange } = this.props
    Auth.signOut().then(() => {
      onStateChange('signIn')
    })
  }
  render() {
    return (
      <div style={styes.container}>
        <h1> hello world </h1>
        <button onClick={this.signOut} style={styes.button}>
          sign Out
        </button>
      </div>
    )
  }
}

export default amplifyCustomUi.withAuthenticator(SecureApp)
