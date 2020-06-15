import api from '../../api'
import {
  USER_FIND,
  USER_FINDBYID,
  USER_CURRENT_FINDBYID,
  USER_CREATE,
  USER_UPDATE,
  USER_DELETE,
} from './types'

export const getUsersAction = (params) => ({
  type: USER_FIND,
  payload: api.user.find(params),
})

export const getUsersInGroupAction = (id, params) => ({
  type: USER_FIND,
  payload: api.user.findInGroup(id, params),
})

export const getUserAction = (id, includeInactive = false) => ({
  type: USER_FINDBYID,
  payload: api.user.findById(id, includeInactive),
})

export const getCurrentUserAction = (id) => ({
  type: USER_CURRENT_FINDBYID,
  payload: api.user.findById(id),
})

export const createUserAction = (params) => ({
  type: USER_CREATE,
  payload: api.user.create(params),
})

export const updateUserAction = (id, params) => ({
  type: USER_UPDATE,
  payload: api.user.update(id, params),
})

export const deleteUserAction = (id) => ({
  type: USER_DELETE,
  payload: api.user.delete(id),
})
