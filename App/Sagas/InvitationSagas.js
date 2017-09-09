import { call, put } from 'redux-saga/effects'
import InvitationActions from '../Redux/InvitationRedux'

export function* getSentInvitations (api, action) {
  const { userId } = action

  yield put(InvitationActions.performingInvitationRequest())

  const response = yield call(api.getSentInvitations, userId)

  if (response.ok) {
    yield put(InvitationActions.fetchSentInvitationsSuccess(response.data))
  } else {
    yield put(InvitationActions.invitationRequestFailed())
  }
}

export function* getReceivedInvitations (api, action) {
  const { userId } = action

  yield put(InvitationActions.performingInvitationRequest())

  const response = yield call(api.getReceivedInvitations, userId)

  if (response.ok) {
    yield put(InvitationActions.fetchReceivedInvitationsSuccess(response.data))
  } else {
    yield put(InvitationActions.invitationRequestFailed())
  }
}

export function* updateInvitationAccepted (api, action) {
  const { userId, meetingId, invitationId, accepted } = action

  yield put(InvitationActions.performingInvitationRequest())

  const response = yield call(
    api.updateInvitationAccepted,
    userId,
    meetingId,
    invitationId,
    accepted
  )

  if (response.ok) {
    yield put(
      InvitationActions.receivedInvitationChangedSuccess(response.data)
    )
  } else {
    yield put(InvitationActions.invitationRequestFailed())
  }
}

export function* getSentInvitationsByMeeting (api, action) {
  const { userId, meetingId } = action

  yield put(InvitationActions.performingInvitationRequest())

  const response = yield call(
    api.getInvitationsByMeeting,  // ovo je funkcija definisana u services
    userId,
    meetingId
  )

  if (response.ok) {
    yield put(
      InvitationActions.fetchSentInvitationsByMeetingSuccess(response.data)
    )
  } else {
    yield put(InvitationActions.invitationRequestFailed())
  }
}
