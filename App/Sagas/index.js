import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import MeetingAPI from '../Services/MeetingApi'
import LoginAPI from '../Services/LoginApi'
import InvitationApi from '../Services/InvitationApi'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { OpenScreenTypes } from '../Redux/OpenScreenRedux'
import { MeetingTypes } from '../Redux/MeetingRedux'
import { InvitationTypes } from '../Redux/InvitationRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, logout } from './LoginSagas'
import { getUserAvatar } from './GithubSagas'
import { openScreen } from './OpenScreenSagas'
import { getMeetings, getMeeting, createMeeting } from './MeetingSagas'
import { getSentInvitations, getReceivedInvitations } from './InvitationSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const meetingApi = MeetingAPI.create()
const loginApi = LoginAPI.create()
const invitationApi = InvitationApi.create()

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

    // invitation sagas
    takeLatest(InvitationTypes.FETCH_SENT_INVITATIONS, getSentInvitations, invitationApi),
    takeLatest(InvitationTypes.FETCH_RECEIVED_INVITATIONS,
               getReceivedInvitations,
               invitationApi)
  ]
}
