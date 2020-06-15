export const DEFAULT_ASYNC_STATE = {
  isPending: false,
  isRejected: false,
  isFulfilled: false,
}

export const SUCCESSFUL_PASSWORD_RESET_REDIRECT = '/login'
export const SUCCESSFUL_SIGNUP_CONFIRM_REDIRECT = '/login'
export const SUCCESSFUL_SIGNUP_REDIRECT_URL = '/register-confirm'
export const CHANGE_PASSWORD_REDIRECT_URL = '/change-password'
export const FORGOT_PASSWORD_REDIRECT_URL = '/forgot-password'
export const NON_AUTHORIZED_REDIRECT_URL = '/login'
export const REGISTER_REDIRECT_URL = '/register'
export const LOGGED_IN_REDIRECT_URL = '/'
export const LOGGED_OUT_REDIRECT_URL = '/login'
export const HOME_REDIRECT_URL = '/'

export const FEDERATED = {
  GOOGLE: process.env.REACT_APP_AMPLIFY_AUTH_FEDERATED_GOOGLE,
  FACEBOOK: process.env.REACT_APP_AMPLIFY_AUTH_FEDERATED_FACEBOOK,
}

export const FEDERATED_STATE = {
  SIGNED_IN: 'signedIn',
}

export const SOCIAL_BUTTON = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
}

export const ENDPOINT_TYPE = {
  PUBLIC: 'public',
  AUTH: 'auth',
}
