import { combineReducers } from 'redux'
import * as Actions from './actions'

export const isSignedIn = (state = null, action) => {
  switch (action.type) {
    case Actions.SET_IS_SIGNED_IN: {
      return action.isSignedIn;
    }
    default:
      return state;
  }
}

export const currentUser = (state = null, action) => {
  switch (action.type) {
    case Actions.SET_CURRENT_USER: {
      return action.currentUser;
    }
    default:
      return state;
  }
}

const reducers = (history) =>
  combineReducers({
    isSignedIn,
    currentUser,
  })

export default reducers