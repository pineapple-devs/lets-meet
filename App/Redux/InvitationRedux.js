import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  performingInvitationRequest: [],
  invitationRequestFailed: ['error'],
  fetchSentInvitations: ['userId'],
  fetchSentInvitationsSuccess: ['sentInvitations'],
  fetchSentInvitationsByMeeting: ['userId', 'meetingId'],
  fetchSentInvitationsByMeetingSuccess: ['meetingInvitations'],
  fetchReceivedInvitations: ['userId'],
  fetchReceivedInvitationsSuccess: ['receivedInvitations'],
  updateInvitationAccepted: ['userId', 'meetingId', 'invitationId', 'accepted'],
  receivedInvitationChangedSuccess: ['invitation']
})

export const InvitationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  sentInvitations: null,
  receivedInvitations: null,
  meetingInvitations: null,
  fetching: false
})

/* ------------- reducers ------------- */

// we're attempting to login
export const request = state => state.merge({ fetching: true })

// we've had a problem
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

// we've fetched sent invitations for a user
export const sentInvitationsFetched = (state, { sentInvitations }) =>
  state.merge({
    fetching: false,
    error: null,
    sentInvitations: sentInvitations
  })

// we've fetched received invitations for a user
export const receivedInvitationsFetched = (state, { receivedInvitations }) => {
  return state.merge({
    fetching: false,
    error: null,
    receivedInvitations: receivedInvitations
  })
}

export const updateReceivedInvitation = (state, { invitation }) => {
  const receivedInvitations = state.receivedInvitations.map(
    receivedInvitation => {
      if (receivedInvitation.id === invitation.id) {
        return invitation
      }

      return receivedInvitation
    }
  )

  return state.merge({
    fetching: false,
    error: null,
    receivedInvitations: receivedInvitations
  })
}

export const invitationsByMeetingFetched = (state, {meetingInvitations}) => {
  debugger
  return state.merge({
    fetching: false,
    error: null,
    meetingInvitations: meetingInvitations
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PERFORMING_INVITATION_REQUEST]: request,
  [Types.INVITATION_REQUEST_FAILED]: failure,
  [Types.FETCH_SENT_INVITATIONS_SUCCESS]: sentInvitationsFetched,
  [Types.FETCH_RECEIVED_INVITATIONS_SUCCESS]: receivedInvitationsFetched,
  [Types.RECEIVED_INVITATION_CHANGED_SUCCESS]: updateReceivedInvitation,
  [Types.FETCH_SENT_INVITATIONS_BY_MEETING_SUCCESS]: invitationsByMeetingFetched
})
