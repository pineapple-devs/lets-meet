import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'

export function* updateUser (api, action) {
  const {userId, userParams} = action

  const response = yield call(api.updateUser, userId, userParams)

  if (response.ok) {
    yield put(UserActions.updateUserSuccess(response.data))
  } else {
    yield put(UserActions.updateUserFailure("Couldn't update the user"))
  }
}
