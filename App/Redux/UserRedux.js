import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateUserRequest: ['userId', 'userParams'],
  updateUserSuccess: ['user'],
  updateUserFailure: ['error'],
  loginSuccess: ['data']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  error: null
})

/* ------------- Reducers ------------- */

export const setUser = (state, { user }) => state.merge({ error: null, user })

export const setUserFromLogin = (state, { data }) => state.merge({ error: null,
  user: data.user })

export const failure = (state, { error }) => state.merge({ error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_USER_SUCCESS]: setUser,
  [Types.UPDATE_USER_FAILURE]: failure,
  [Types.LOGIN_SUCCESS]: setUserFromLogin
})
