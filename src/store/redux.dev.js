import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
})

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(promiseMiddleware, thunkMiddleware, loggerMiddleware)
)
export default function configureStore(initialState) {
  return createStore(reducer, initialState, enhancer)
}
