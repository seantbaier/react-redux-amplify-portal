import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";

import validationSchema from "./validationSchema";

import "./change-password.scss";

class ChangePasswordForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isPending: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      password: "",
    };
  }

  handleCancel = () => {
    const { onCancel } = this.props;

    onCancel();
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;

    onSubmit(this.state);
  };

  render() {
    const { errorMessage } = this.props;

    return (
      <Formik
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
        initialValues={{ password: "" }}
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
          isValid,
        }) => (
          <Form onSubmit={handleSubmit} method="post">
            <div className="form-wrapper">
              <h1>Change Password</h1>
              {errorMessage && <span>{errorMessage}</span>}
              <div className="form-input-container">
                <input
                  type="password"
                  name="password"
                  valid={`${!errors.password}`}
                  invalid={`${touched.password && !!errors.password}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  onInput={this.clearError}
                  placeholder="New password"
                  autoComplete="new-password"
                  onChange={this.handleInputChange}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  valid={`${!errors.confirmPassword}`}
                  invalid={`${
                    touched.confirmPassword && !!errors.confirmPassword
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  onInput={this.clearError}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  onChange={this.handleInputChange}
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
                className="reset-button"
                disabled={isValid && isSubmitting}
                onClick={submitForm}
              >
                Change Password
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}

export default ChangePasswordForm;
