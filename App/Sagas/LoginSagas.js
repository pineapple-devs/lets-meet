import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import PushNotification from 'react-native-push-notification'

// attempts to login
export function* login (api, action) {
  /*
  const userId = 1; // nikolalsvk's ID (change this to 2, 3)

  yield put(LoginActions.loginSuccess(userId));

  Uncomment this if you want login to check username
  and password on the server
  const {username, password} = action
  */

  const response = yield call(api.login, 'nikolalsvk', 'voce')

  if (response.ok) {
    const senderId = response.data.appCredentials.senderId
    PushNotification.configure({ senderID: senderId })

    yield put(LoginActions.loginSuccess(response.data))
  } else {
    yield put(LoginActions.loginFailure('Sorry, those are invalid credentials!'))
  }
}

export function* logout () {
  yield put(LoginActions.logout())
}
