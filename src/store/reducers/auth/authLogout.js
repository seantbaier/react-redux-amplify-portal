import typeToReducer from 'type-to-reducer';
import { AUTH_LOGOUT } from '../../actions/types';
import { DEFAULT_ASYNC_STATE } from '../../constants';

const DEFAULT_STATE = {
  ...DEFAULT_ASYNC_STATE
};

export default typeToReducer(
  {
    [AUTH_LOGOUT]: {
      PENDING: () => ({
        ...DEFAULT_STATE,
        isPending: true
      }),
      REJECTED: (state, action) => ({
        ...DEFAULT_STATE,
        isRejected: true,
        error: action.payload
      }),
      FULFILLED: () => ({
        ...DEFAULT_STATE,
        isFulfilled: true
      }),
      RESET: () => DEFAULT_STATE
    }
  },
  DEFAULT_STATE
);
