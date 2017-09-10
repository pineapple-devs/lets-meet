import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

const rootReducer = combineReducers({
  github: require('./GithubRedux').reducer,
  login: require('./LoginRedux').reducer,
  search: require('./SearchRedux').reducer,
  meeting: require('./MeetingRedux').reducer,
  invitation: require('./InvitationRedux').reducer,
  user: require('./UserRedux').reducer
})

export default configureStore(rootReducer, rootSaga)
