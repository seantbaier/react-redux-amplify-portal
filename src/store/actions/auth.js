import api from '../../api';
import { createUserAction } from './user';
import {
  AUTH_SIGN_IN,
  AUTH_COMPLETE_NEW_PASSWORD,
  AUTH_SIGN_UP,
  AUTH_SIGN_UP_CONFIRM,
  AUTH_RESEND_SIGN_UP,
  AUTH_CURRENT_SESSION,
  AUTH_CURRENT_SESSION_RESET,
  AUTH_CURRENT_USER,
  AUTH_CURRENT_USER_RESET,
  AUTH_LOGOUT,
  AUTH_FORGOT_PASSWORD,
  AUTH_FORGOT_PASSWORD_RESET,
  AUTH_FORGOT_PASSWORD_CONFIRM,
  AUTH_FORGOT_PASSWORD_CONFIRM_RESET,
  AUTH_CREATE_ACCOUNT,
  AUTH_USER_DELETE,
  AUTH_CHANGE_PASSWORD,
  AUTH_UPDATE_ATTRS
} from './types';

export const signInAction = credentials => ({
  type: AUTH_SIGN_IN,
  payload: api.auth.signIn(credentials)
});

export const completeNewPasswordAction = (user, password) => ({
  type: AUTH_COMPLETE_NEW_PASSWORD,
  payload: api.auth.completeNewPassword(user, password)
});

export const signUpAction = params => ({
  type: AUTH_SIGN_UP,
  payload: api.auth.signUp(params)
});

export const resendSignUpAction = params => ({
  type: AUTH_RESEND_SIGN_UP,
  payload: api.auth.resendSignUp(params)
});

export const confirmSignUpAction = (username, code) => ({
  type: AUTH_SIGN_UP_CONFIRM,
  payload: api.auth.confirmSignUp(username, code)
});

export const currentSessionAction = () => ({
  type: AUTH_CURRENT_SESSION,
  payload: api.auth.currentSession()
});

export const getAuthenticatedUser = () => ({
  type: AUTH_CURRENT_USER,
  payload: api.auth.currentUser()
});

export const logout = () => ({
  type: AUTH_LOGOUT,
  payload: api.auth.logout()
});

export const forgotPasswordAction = username => ({
  type: AUTH_FORGOT_PASSWORD,
  payload: api.auth.forgotPassword(username)
});

export const resetForgotPasswordAction = () => ({
  type: AUTH_FORGOT_PASSWORD_RESET
});

export const forgotPasswordConfirmAction = params => ({
  type: AUTH_FORGOT_PASSWORD_CONFIRM,
  payload: api.auth.forgotPasswordConfirm(params)
});

export const resetForgotPasswordConfirmAction = () => ({
  type: AUTH_FORGOT_PASSWORD_CONFIRM_RESET
});

export const resetCurrentUser = () => ({
  type: AUTH_CURRENT_USER_RESET
});

export const resetCurrentSession = () => ({
  type: AUTH_CURRENT_SESSION_RESET
});

export const changePasswordAction = (
  cognitoUser,
  oldPassword,
  newPassword
) => ({
  type: AUTH_CHANGE_PASSWORD,
  payload: api.auth.changePassword(cognitoUser, oldPassword, newPassword)
});

export const updateAuthAttributesAction = (cognitoUser, attributes) => ({
  type: AUTH_UPDATE_ATTRS,
  payload: api.auth.updateAuthAttributes(cognitoUser, attributes)
});

export const deleteAuthUserAction = cognitoUser => ({
  type: AUTH_USER_DELETE,
  payload: new Promise((resolve, reject) => {
    cognitoUser.deleteUser((err, data) => (err ? reject(err) : resolve(data)));
  })
});

/**
 * Create account action.
 * Complex action that will signup in cognito and create a profile in mongo
 *
 * @param {*} params
 */
export const createAccountAction = params => dispatch =>
  dispatch({
    type: AUTH_CREATE_ACCOUNT,
    payload: async () => {
      const { email, password, phoneNumber } = params;
      const { value: { userSub } = {} } = await dispatch(
        signUpAction({ email, password, phoneNumber })
      );

      await dispatch(
        createUserAction({
          ...params,
          externalId: userSub
        })
      );
    }
  });
