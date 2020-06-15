import React, { Component } from 'react'
import { Auth } from 'aws-amplify'

import './login.scss'

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  email: '',
  password: '',
  code: '',
  error: null,
}

class ForgotPasswordSubmit extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  changeState(type, event) {
    const { changeAuthState } = this.props
    changeAuthState(type, event)
  }

  onSubmit = (event) => {
    const { email, code, password } = this.state

    Auth.forgotPasswordSubmit(email, code, password)
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
          this.changeState('signIn', user)
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

  renderForgotPasswordSubmit = () => {
    const { email, code, password } = this.state

    return (
      <>
        <input
          value={email}
          onChange={(event) =>
            this.setState(updateByPropertyName('email', event.target.value))
          }
          type="text"
          placeholder="Email"
        />
        <input
          value={code}
          onChange={(event) =>
            this.setState(updateByPropertyName('code', event.target.value))
          }
          type="text"
          placeholder="Confirmation Code"
        />
        <input
          value={password}
          onChange={(event) =>
            this.setState(updateByPropertyName('password', event.target.value))
          }
          type="text"
          placeholder="New Password"
        />
      </>
    )
  }

  render() {
    const { email, error, password, code } = this.state

    const isInvalid = email === '' || code === '' || password === ''

    return (
      <div className="login-container">
        <form onSubmit={this.onSubmit}>
          <div className="form-wrapper">
            <h1>Forgot</h1>
            <h2>Password?</h2>
            <div className="form-input-container">
              <input
                value={email}
                onChange={(event) =>
                  this.setState(
                    updateByPropertyName('email', event.target.value)
                  )
                }
                type="text"
                placeholder="Email"
              />
              <input
                value={code}
                onChange={(event) =>
                  this.setState(
                    updateByPropertyName('code', event.target.value)
                  )
                }
                type="text"
                placeholder="Confirmation Code"
              />
              <input
                value={password}
                onChange={(event) =>
                  this.setState(
                    updateByPropertyName('password', event.target.value)
                  )
                }
                type="text"
                placeholder="New Password"
              />
              <button
                className="link-button"
                onClick={() => this.changeState('signUp')}
              >
                Cancel
              </button>
            </div>
          </div>
          <div>
            {error && <p className="form-error">{error.message}</p>}
            <button className="login-button" disabled={isInvalid} type="submit">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default ForgotPasswordSubmit
