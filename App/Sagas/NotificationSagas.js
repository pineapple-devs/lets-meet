import {call, put} from 'redux-saga/effects'
import notificationActions from '../Redux/NotificationRedux'

export function * notificationSignup (api, {token, os, userId}) {
  yield call(api.signUp, token, os, userId)

  yield put(notificationActions.notificationSignupSuccess())
}
