import typeToReducer from 'type-to-reducer';
import { DEFAULT_ASYNC_STATE } from '../../constants';

import {
  AUTH_FORGOT_PASSWORD,
  AUTH_FORGOT_PASSWORD_CONFIRM
} from '../../actions/types';

const DEFAULT_STATE = {
  ...DEFAULT_ASYNC_STATE,
  data: {
    request: {},
    confirm: {}
  }
};

export default typeToReducer(
  {
    [AUTH_FORGOT_PASSWORD]: {
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
        data: { ...state.data, request: action.payload }
      }),
      RESET: () => DEFAULT_STATE
    },

    [AUTH_FORGOT_PASSWORD_CONFIRM]: {
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
        data: { ...state.data, confirm: action.payload }
      }),
      RESET: () => DEFAULT_STATE
    }
  },
  DEFAULT_STATE
);
