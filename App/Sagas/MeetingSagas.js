import {call, put} from 'redux-saga/effects'
import MeetingActions from '../Redux/MeetingRedux'

export function* getMeetings (api, action) {
  const {userId} = action

  yield put(MeetingActions.performingRequest())

  const response = yield call(api.getMeetings, userId)

  if (response.ok) {
    yield put(MeetingActions.fetchMeetingsSuccess(response.data))
  } else {
    yield put(MeetingActions.requestFailed())
  }
}

export function* getMeeting (api, action) {
  const {userId, meetingId} = action

  yield put(MeetingActions.performingRequest())

  const response = yield call(api.getMeeting, userId, meetingId)

  if (response.ok) {
    yield put(MeetingActions.fetchMeeting(response.data))
  } else {
    yield put(MeetingActions.requestFailed())
  }
}

export function* createMeeting (api, action) {
  const {userId, meetingParams} = action

  const response = yield call(api.createMeeting, userId, meetingParams)

  yield put(MeetingActions.performingRequest())

  if (response.ok) {
    yield put(MeetingActions.createMeetingSuccess(response.data))
  } else {
    yield put(MeetingActions.requestFailed())
  }
}

export function* destroyMeeting (api, action) {
  const {userId, meetingId} = action

  const response = yield call(api.destroyMeeting, userId, meetingId)

  if (response.ok) {
    yield put(MeetingActions.destroyMeetingSuccess(meetingId))
  } else {
    yield put(MeetingActions.requestFailed("Couldn't destroy a meeting"))
  }
}

export function* updateMeeting (api, action) {
  const {userId, meetingId, meetingParams} = action

  const response = yield call(api.updateMeeting, userId, meetingId, meetingParams)

  if (response.ok) {
    yield put(MeetingActions.updateMeetingSuccess(response.data))
  } else {
    yield put(MeetingActions.requestFailed("Couldn't update a meeting"))
  }
}
