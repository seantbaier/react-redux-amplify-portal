import React from 'react'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import SignIn from './components/auth/SignIn'
import ForgotPassword from './components/auth/ForgotPassword'
import ForgotPasswordSubmit from './components/auth/ForgotPasswordSubmit'
import Amplify from 'aws-amplify'
import { Provider } from 'react-redux'
import configureStore from './store'

// Components
import View from './views'
import './styles/app.css'

import * as aws_amplify_react from 'aws-amplify-react'
import AmplifyCustomUi from 'aws-amplify-react-custom-ui'

const {
  REACT_APP_AMPLIFY_REGION,
  REACT_APP_AMPLIFY_AUTH_USER_POOL_ID,
  REACT_APP_AMPLIFY_AUTH_APP_CLIENT_ID,
  REACT_APP_AMPLIFY_AUTH_IDENTITY_POOL_ID,
} = process.env

const config = {
  mandatorySignIn: true,
  region: REACT_APP_AMPLIFY_REGION,
  userPoolId: REACT_APP_AMPLIFY_AUTH_USER_POOL_ID,
  identityPoolId: REACT_APP_AMPLIFY_AUTH_IDENTITY_POOL_ID,
  userPoolWebClientId: REACT_APP_AMPLIFY_AUTH_APP_CLIENT_ID,
}

Amplify.configure(config)
AmplifyCustomUi.configure(aws_amplify_react)
AmplifyCustomUi.setSignIn(SignIn)
AmplifyCustomUi.setForgotPassword(ForgotPassword)

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <div>
      <AmplifySignOut />
      <View />
    </div>
  </Provider>
)

export default withAuthenticator(App)
