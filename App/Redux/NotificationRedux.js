import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

const {Types, Creators} = createActions({
  notificationSignup: ['token', 'os', 'userId'],
  notificationSignupSuccess: null,
  notificationSignupFailure: null
})

export const NotificationTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({})

export const reducer = createReducer(INITIAL_STATE, {})
