import typeToReducer from 'type-to-reducer';
import { DEFAULT_ASYNC_STATE } from '../../constants';
import { AUTH_SIGN_IN, AUTH_CURRENT_USER } from '../../actions/types';

const DEFAULT_STATE = {
  ...DEFAULT_ASYNC_STATE,
  isAuthenticated: false,
  data: {}
};

export default typeToReducer(
  {
    [AUTH_CURRENT_USER]: {
      PENDING: () => ({
        ...DEFAULT_STATE,
        isPending: true
      }),
      REJECTED: (state, action) => ({
        ...DEFAULT_STATE,
        isRejected: true,
        error: action.payload
      }),
      FULFILLED: (state, action) => ({
        ...DEFAULT_STATE,
        isFulfilled: true,
        data: action.payload,
        isAuthenticated: true
      }),
      RESET: () => DEFAULT_STATE
    },

    [AUTH_SIGN_IN]: {
      PENDING: () => ({
        ...DEFAULT_STATE,
        isPending: true
      }),
      REJECTED: (state, action) => ({
        ...DEFAULT_STATE,
        isRejected: true,
        error: action.payload
      }),
      FULFILLED: (state, action) => ({
        ...DEFAULT_STATE,
        isFulfilled: true,
        data: action.payload,
        isAuthenticated: true
      }),
      RESET: () => DEFAULT_STATE
    }
  },
  DEFAULT_STATE
);
