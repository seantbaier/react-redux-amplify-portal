import typeToReducer from 'type-to-reducer'
import get from 'lodash/get'

import { DEFAULT_ASYNC_STATE } from '../constants'

export default function createReducer(actionType, fulfilledField = 'data') {
  const DEFAULT_STATE = {
    ...DEFAULT_ASYNC_STATE,
    data: {},
  }

  return typeToReducer(
    {
      [actionType]: {
        PENDING: () => ({
          ...DEFAULT_STATE,
          isPending: true,
        }),
        REJECTED: (state, action) => ({
          ...DEFAULT_STATE,
          isRejected: true,
          error: action.payload,
        }),
        FULFILLED: (state, action) => {
          const data = fulfilledField
            ? get(action.payload, fulfilledField)
            : action.payload

          return {
            ...DEFAULT_STATE,
            isFulfilled: true,
            data,
          }
        },
        RESET: () => DEFAULT_STATE,
      },
    },
    DEFAULT_STATE
  )
}
