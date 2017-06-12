import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * login (api, action) {
  const {username, password} = action

  const response = yield call(api.login, username, password)

  if (response.ok) {
    yield put(LoginActions.loginSuccess(response.data))
  } else {
    yield put(LoginActions.loginFailure('Invalid username/password!'))
  }
}
