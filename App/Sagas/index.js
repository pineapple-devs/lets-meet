import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import MeetingAPI from '../Services/MeetingApi'
import LoginAPI from '../Services/LoginApi'
import InvitationApi from '../Services/InvitationApi'
import NotificationApi from '../Services/NotificationApi'
import UserApi from '../Services/UserApi'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { OpenScreenTypes } from '../Redux/OpenScreenRedux'
import { MeetingTypes } from '../Redux/MeetingRedux'
import { InvitationTypes } from '../Redux/InvitationRedux'
import { NotificationTypes } from '../Redux/NotificationRedux'
import { UserTypes } from '../Redux/UserRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, logout } from './LoginSagas'
import { getUserAvatar } from './GithubSagas'
import { openScreen } from './OpenScreenSagas'
import {
  getMeetings,
  getMeeting,
  createMeeting,
  destroyMeeting,
  updateMeeting
} from './MeetingSagas'
import {
  getSentInvitations,
  getReceivedInvitations,
  updateInvitationAccepted,
  getSentInvitationsByMeeting
} from './InvitationSagas'
import { notificationSignup } from './NotificationSagas'
import { updateUser } from './UserSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const meetingApi = MeetingAPI.create()
const loginApi = LoginAPI.create()
const invitationApi = InvitationApi.create()
const notificationApi = NotificationApi.create()
const userApi = UserApi.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, loginApi),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout),
    takeLatest(OpenScreenTypes.OPEN_SCREEN, openScreen),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    // meeting sagas
    takeLatest(MeetingTypes.FETCH_MEETINGS, getMeetings, meetingApi),
    takeLatest(MeetingTypes.SHOW_MEETING, getMeeting, meetingApi),
    takeLatest(MeetingTypes.CREATE_MEETING, createMeeting, meetingApi),
    takeLatest(MeetingTypes.DESTROY_MEETING_REQUEST, destroyMeeting, meetingApi),
    takeLatest(MeetingTypes.UPDATE_MEETING, updateMeeting, meetingApi),

    // invitation sagas
    takeLatest(
      InvitationTypes.FETCH_SENT_INVITATIONS,
      getSentInvitations,
      invitationApi
    ),
    takeLatest(
      InvitationTypes.FETCH_RECEIVED_INVITATIONS,
      getReceivedInvitations,
      invitationApi
    ),
    takeLatest(
      InvitationTypes.UPDATE_INVITATION_ACCEPTED,
      updateInvitationAccepted,
      invitationApi
    ),
    takeLatest(InvitationTypes.FETCH_SENT_INVITATIONS_BY_MEETING, getSentInvitationsByMeeting, invitationApi),

    // notification sagas
    takeLatest(NotificationTypes.NOTIFICATION_SIGNUP, notificationSignup, notificationApi),

    // user sagas
    takeLatest(UserTypes.UPDATE_USER_REQUEST, updateUser, userApi)
  ]
}
