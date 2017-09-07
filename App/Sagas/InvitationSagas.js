import {call, put} from 'redux-saga/effects'
import InvitationActions from '../Redux/InvitationRedux'

export function* getSentInvitations (api, action) {
  const {userId} = action

  yield put(InvitationActions.performingInvitationRequest())

  const response = yield call(api.getSentInvitations, userId)

  if (response.ok) {
    yield put(InvitationActions.fetchSentInvitationsSuccess(response.data))
  } else {
    yield put(InvitationActions.invitationRequestFailed())
  }
}
