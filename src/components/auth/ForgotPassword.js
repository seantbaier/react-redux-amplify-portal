import React, { Component } from 'react'
import { Auth } from 'aws-amplify'

import './login.scss'

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
})

const INITIAL_STATE = {
  email: '',
  code: '',
  password: '',
  error: null
}

class ForgotPassword extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  changeState(type, event) {
    const { changeAuthState } = this.props
    changeAuthState(type, event)
  }

  onSubmit = (event) => {
    const { email } = this.state

    Auth.forgotPassword(email)
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
          this.changeState('forgotPasswordSubmit', user)
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

  onForgotPasswordSubmit = (event) => {
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

  renderForgotPassword = () => {
    const { email } = this.state

    return (
      <input
        value={email}
        onChange={(event) =>
          this.setState(updateByPropertyName('email', event.target.value))
        }
        type="text"
        placeholder="Email"
      />
    )
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
          type="password"
          placeholder="New Password"
        />
      </>
    )
  }

  isFormInvalid = () => {
    const { email, code, password } = this.state
    const { authState } = this.props

    if (authState === 'forgotPassword' && email === '') {
      return true
    } else if (
      authState === 'forgotPasswordSubmit' &&
      (code === '' || password === '' || email === '')
    ) {
      return true
    } else {
      return false
    }
  }

  render() {
    const { error } = this.state
    const { authState } = this.props

    let form = this.renderForgotPassword()
    let onSubmit = this.onSubmit
    let buttonText = 'Send Code'

    if (authState === 'forgotPasswordSubmit') {
      form = this.renderForgotPasswordSubmit()
      buttonText = 'Reset Password'
      onSubmit = this.onForgotPasswordSubmit
    }

    return (
      <div className="login-container">
        <form onSubmit={onSubmit}>
          <div className="form-wrapper">
            <h1>Forgot</h1>
            <h2>Password?</h2>
            <div className="form-input-container">
              {form}
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
            <button
              className="login-button"
              disabled={this.isFormInvalid()}
              type="submit"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default ForgotPassword
