import { combineReducers } from 'redux'

import authSignUp from './auth/authSignUp'
import authCompleteNewPassword from './auth/authCompleteNewPassword'
import authSignUpConfirm from './auth/authSignUpConfirm'
import authCreateAccount from './auth/authCreateAccount'
import authUserDelete from './auth/authUserDelete'
import authCurrentUser from './auth/authCurrentUser'
import authCurrentSession from './auth/authCurrentSession'
import authPasswordReducer from './auth/authPassword'
import authChangePassword from './auth/authChangePassword'
import authLogout from './auth/authLogout'
import authUpdateAttributes from './auth/authUpdateAttributes'

import userFind from './users/userFind'
import userFindById from './users/userFindById'
import userCurrentFindById from './users/userCurrentFindById'
import userCreate from './users/userCreate'
import userUpdate from './users/userUpdate'
import userDelete from './users/userDelete'

import discrepancyFind from './discrepancies/discrepancyFind'
import discrepancyFindById from './discrepancies/discrepancyFindById'
import discrepancyCreate from './discrepancies/discrepancyCreate'
import discrepancyUpdate from './discrepancies/discrepancyUpdate'
import discrepancyDelete from './discrepancies/discrepancyDelete'

export default combineReducers({
  auth: combineReducers({
    signUp: authSignUp,
    completeNewPassword: authCompleteNewPassword,
    signUpConfirm: authSignUpConfirm,
    currentUser: authCurrentUser,
    currentSession: authCurrentSession,
    forgotPassword: authPasswordReducer,
    changePassword: authChangePassword,
    createAccount: authCreateAccount,
    logout: authLogout,
    deleteUser: authUserDelete,
    updateAttributes: authUpdateAttributes,
  }),
  user: combineReducers({
    find: userFind,
    findById: userFindById,
    current: userCurrentFindById,
    create: userCreate,
    update: userUpdate,
    delete: userDelete,
  }),
  discrepancy: combineReducers({
    find: discrepancyFind,
    findById: discrepancyFindById,
    create: discrepancyCreate,
    update: discrepancyUpdate,
    delete: discrepancyDelete,
  }),
})
