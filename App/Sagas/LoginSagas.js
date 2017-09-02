import { call, put } from "redux-saga/effects";
import LoginActions from "../Redux/LoginRedux";

// attempts to login
export function* login(api, action) {
  const userId = 1; // nikolalsvk's ID (change this to 2, 3)

  yield put(LoginActions.loginSuccess(userId));

  /*
  Uncomment this if you want login to check username
  and password on the server

  const {username, password} = action;

  const response = yield call(api.login, username, password);

  if (response.ok) {
    yield put(LoginActions.loginSuccess(response.data));
  } else {
    yield put(LoginActions.loginFailure('Invalid username/password!'));
  }
  */
}

export function* logout() {
  yield put(LoginActions.logout());
}
