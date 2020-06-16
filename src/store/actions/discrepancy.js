import api from '../../api'
import {
  DISCREPANCY_FIND,
  DISCREPANCY_FINDBYID,
  DISCREPANCY_CREATE,
  DISCREPANCY_UPDATE,
  DISCREPANCY_DELETE,
} from './types'

export const getDiscrepanciesAction = (params) => ({
  type: DISCREPANCY_FIND,
  payload: api.discrepancy.find(params),
})

export const getDiscrepancyAction = (id, includeInactive = false) => ({
  type: DISCREPANCY_FINDBYID,
  payload: api.discrepancy.findById(id, includeInactive),
})

export const createDiscrepancyAction = (params) => ({
  type: DISCREPANCY_CREATE,
  payload: api.discrepancy.create(params),
})

export const updateDiscrepancyAction = (id, params) => ({
  type: DISCREPANCY_UPDATE,
  payload: api.discrepancy.update(id, params),
})

export const deleteDiscrepancyAction = (id) => ({
  type: DISCREPANCY_DELETE,
  payload: api.discrepancy.delete(id),
})
