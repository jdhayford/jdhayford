import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
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

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    isSignedIn,
    currentUser,
  })
