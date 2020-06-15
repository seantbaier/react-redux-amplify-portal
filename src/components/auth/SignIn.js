import React, { Component } from 'react'
import { Auth } from 'aws-amplify'

import './login.scss'

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
})

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class SignIn extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  changeState(type, event) {
    const { changeAuthState } = this.props
    changeAuthState(type, event)
  }

  onSubmit = (event) => {
    const { email, password } = this.state

    Auth.signIn(email, password)
      .then((user) => {
        this.setState(() => ({ ...INITIAL_STATE }))
        if (
          user.challengeName === 'SMS_MFA' ||
          user.challengeName === 'SOFTWARE_TOKEN_MFA'
        ) {
          this.changeState('confirmSignIn', user)
        } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.changeState('requireNewPassword', user)
        } else if (user.challengeName === 'MFA_SETUP') {
          this.changeState('TOTPSetup', user)
        } else {
          this.changeState('signedIn', user)
        }
      })
      .catch((err) => {
        const { authError } = this.props
        if (err.code === 'UserNotConfirmedException') {
          this.changeState('confirmSignUp')
        } else if (err.code === 'PasswordResetRequiredException') {
          this.changeState('requireNewPassword')
        } else {
          authError(err)
        }
        this.setState(updateByPropertyName('error', err))
      })

    event.preventDefault()
  }

  render() {
    const { email, password, error } = this.state

    const isInvalid = password === '' || email === ''

    return (
      <div className="login-container">
        <form onSubmit={this.onSubmit}>
          <div className="form-wrapper">
            <h1>Hello,</h1>
            <h2>Friend!</h2>
            <div className="form-input-container">
              <input
                value={email}
                onChange={(event) =>
                  this.setState(
                    updateByPropertyName('email', event.target.value)
                  )
                }
                type="text"
                placeholder="Email Address"
              />
              <input
                value={password}
                onChange={(event) =>
                  this.setState(
                    updateByPropertyName('password', event.target.value)
                  )
                }
                type="password"
                placeholder="Password"
              />

              <button
                className="link-button"
                onClick={() => this.changeState('forgotPassword')}
              >
                Forgot Password
              </button>
            </div>
          </div>

          <div>
            {error && <p className="form-error">{error.message}</p>}
            <button className="login-button" disabled={isInvalid} type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn
