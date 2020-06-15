import React, { Component } from "react";
import queryString from "query-string";
import { Form } from "formik";

class UpdatePasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      code: "",
      newPassword: "",
      confirmNewPassword: "",
      errorMessage: "",
    };
  }

  componentDidMount() {
    const { location: { search = "" } = {} } = this.props;

    if (search) {
      const parsed = queryString.parse(search);

      if (parsed.email) {
        this.setState({
          email: parsed.email,
        });
      }

      if (parsed.code) {
        this.setState({
          code: parsed.code,
        });
      }
    }
  }

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
    const { email = "", code = "" } = this.state;
    const {
      showEmail = false,
      isSubmitting,
      isPending,
      errorMessage,
      clearError,
    } = this.props;

    return (
      <div>
        <Form>
          <h1>Update Password</h1>
          <p>Update your password</p>
          {errorMessage && <span>{errorMessage}</span>}
          {showEmail && (
            <input
              type="text"
              name="email"
              placeholder="Email"
              autoComplete="eamil"
              onChange={this.handleInputChange}
              onInput={clearError}
              defaultValue={email}
            />
          )}

          <input
            type="text"
            name="code"
            placeholder="Code"
            autoComplete="code"
            onChange={this.handleInputChange}
            onInput={clearError}
            defaultValue={code}
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            autoComplete="new-password"
            onChange={this.handleInputChange}
            onInput={clearError}
          />

          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm new password"
            autoComplete="new-password"
            onChange={this.handleInputChange}
            onInput={clearError}
          />

          <button
            color="success"
            block
            disabled={isSubmitting && isPending}
            onClick={this.handleSubmit}
          >
            Reset Password
          </button>
        </Form>
      </div>
    );
  }
}

export default UpdatePasswordForm;
