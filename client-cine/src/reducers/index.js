import { REQUEST_FAILED } from '../actions/types'

const initialState = { }

const actionsObj = {
  [REQUEST_FAILED]: (state, payload) => ({
    ...state,
    err: payload
  })
}

export const rootReducer = (state = initialState, action) => {
  if (!actionsObj.hasOwnProperty(action.type)) return state
  return actionsObj[action.type](state, action.payload)
}