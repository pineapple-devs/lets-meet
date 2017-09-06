import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  performingRequest: [],
  requestFailed: ['error'],
  fetchSentInvitations: ['userId'],
  fetchSentInvitationsSuccess: ['sentInvitations'],
  fetchReceivedInvitations: ['userId'],
  fetchReceivedInvitationsSuccess: ['receivedInvitations']
})

export const MeetingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  sentInvitations: null,
  receivedInvitations: null,
  fetching: false
})

/* ------------- reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetching: true })

// we've fetched sent invitations for a user
export const sentInvitationsFetched = (state, { sentInvitations }) =>
  state.merge({
    fetching: false,
    error: null,
    sentInvitations: sentInvitations
  })

// we've fetched received invitations for a user
export const receivedInvitationsFetched = (state, { meeting }) => {
  return state.merge({
    fetching: false,
    error: null,
    meeting: meeting
  })
}

// we've had a problem
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PERFORMING_REQUEST]: request,
  [Types.REQUEST_FAILED]: failure,
  [Types.FETCH_SENT_INVITATIONS_SUCCESS]: sentInvitationsFetched,
  [Types.FETCH_RECEIVED_INVITATIONS_SUCCESS]: receivedInvitationsFetched
})
