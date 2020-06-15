import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'

import validationSchema from './validationSchema'

import './forgot-password.scss'

class ForgotPasswordForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isPending: PropTypes.bool
  }
  constructor(props) {
    super(props)
  }

  handleCancel = () => {
    const { onCancel } = this.props

    onCancel()
  }

  handleSubmit = async (values, { setSubmitting }) => {
    const { onSubmit } = this.props

    await onSubmit(values)
    setSubmitting(false)
  }

  render() {
    const { errorMessage } = this.props

    return (
      <Formik
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
        initialValues={{ email: '' }}
      >
        {({
          isSubmitting,
          handleSubmit,
          submitForm,
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          isValid
        }) => (
          <Form onSubmit={handleSubmit} method="post">
            <div className="form-wrapper">
              <h1>Forgot Password?</h1>
              {errorMessage && <div>{errorMessage}Please try again.</div>}
              <div className="form-input-container">
                <input
                  autoFocus
                  type="text"
                  placeholder="Email"
                  autoComplete="email"
                  name="email"
                  valid={`${!errors.email}`}
                  invalid={`${touched.email && !!errors.email}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  onInput={this.clearError}
                  data-testid="email"
                />
              </div>
              <button
                type="button"
                color="secondary"
                onClick={this.handleCancel}
                className="link-button"
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                type="submit"
                data-testid="reset-password-submit-button"
                onClick={submitForm}
                className="reset-button"
                disabled={!isValid || isSubmitting}
              >
                Reset Password
              </button>
            </div>
          </Form>
        )}
      </Formik>
    )
  }
}

export default ForgotPasswordForm
