import { findUser, findOrCreateUser } from '../services'

export const SET_REGISTRATIONS = 'SET_REGISTRATIONS'
export const SET_SESSIONS = 'SET_SESSIONS'
export const SET_IS_SIGNED_IN = 'SET_IS_SIGNED_IN'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const SET_USERS = 'SET_USERS'

export const setRegistrations = (registrations) => ({ type: SET_REGISTRATIONS, registrations })
export const setSessions = (sessions) => ({ type: SET_SESSIONS, sessions })

export const setCurrentUser = (currentUser) => ({ type: SET_CURRENT_USER, currentUser })



// THUNKS
export const signOut = () => (dispatch) => {
    window.localStorage.setItem('user_uid', '')
    dispatch(setCurrentUser(null))
}

export const upsertUser = (userData) => async (dispatch, getState) => {
    const user = await findOrCreateUser(userData)
    console.log(user)
    if (user) {
        dispatch(setCurrentUser(user))
    }
}

export const checkCurrentUser = (userId) => async (dispatch, getState) => {
    const user = await findUser(userId)
    if (user) {
        dispatch(setCurrentUser(user))
    }
}
