import typeToReducer from 'type-to-reducer';
import { DEFAULT_ASYNC_STATE } from '../../constants';
import { AUTH_CURRENT_SESSION } from '../../actions/types';

const DEFAULT_STATE = {
  ...DEFAULT_ASYNC_STATE,
  data: {}
};

export default typeToReducer(
  {
    [AUTH_CURRENT_SESSION]: {
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
        ...state,
        isFulfilled: true,
        data: action.payload
      }),
      RESET: () => DEFAULT_STATE
    }
  },
  DEFAULT_STATE
);
