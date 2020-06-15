import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import reducer from './reducers'

const enhancer = applyMiddleware(promiseMiddleware, thunkMiddleware)

export default function configureStore(initialState) {
  return createStore(reducer, initialState, enhancer)
}
