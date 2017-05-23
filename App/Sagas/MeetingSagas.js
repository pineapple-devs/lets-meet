import { call, put } from 'redux-saga/effects'
import MeetingActions from '../Redux/MeetingRedux'

export function * getMeetings (api, action) {
  const { userId } = action

  const response = yield call(api.getMeetings, userId)

  yield put(MeetingActions.performingRequest())

  if (response.ok) {
    yield put(MeetingActions.fetchMeetingsSuccess(response.data))
  } else {
    yield put(MeetingActions.requestFailed())
  }
}

export function * getMeeting (api, action) {
  const { userId, meetingId } = action

  const response = yield call(api.getMeeting, userId, meetingId)

  yield put(MeetingActions.performingRequest())

  if (response.ok) {
    yield put(MeetingActions.fetchMeeting(response.data))
  } else {
    yield put(MeetingActions.requestFailed())
  }
}