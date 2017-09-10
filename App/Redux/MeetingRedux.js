import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  performingRequest: [],
  requestFailed: ['error'],
  fetchMeetings: ['userId'],
  fetchMeetingsSuccess: ['meetings'],
  fetchMeetingSuccess: ['meeting'],
  showMeeting: ['userId', 'meetingId'],
  showMeetingSuccess: ['meeting'],
  createMeeting: ['userId', 'meetingParams'],
  createMeetingSuccess: ['meeting'],
  destroyMeetingRequest: ['userId', 'meetingId'],
  destroyMeetingSuccess: ['meetingId']
})

export const MeetingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userId: null,
  meetings: null,
  intervals: null,
  meeting: null,
  fetching: false
})

/* ------------- Helper functions ------------- */

const formIntervalsWithMeetingsInfo = (meetings) => {
  let intervals = []

  meetings.map((meeting) => {
    meeting.intervals.map((interval) => {
      interval.title = meeting.title
      interval.description = meeting.description
      interval.location = meeting.location
      intervals.push(interval)
    })
  })

  return intervals
}

const formIntervalsWithMeetingInfo = (meeting) => {
  let intervals = []

  meeting.intervals.map((interval) => {
    interval.title = meeting.title
    interval.description = meeting.description
    interval.location = meeting.location
    intervals.push(interval)
  })

  return intervals
}

/* ------------- reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetching: true })

// we've fetched meetings
export const meetingsFetched = (state, { meetings }) => {
  return state.merge({
    fetching: false,
    error: null,
    meetings: meetings,
    intervals: formIntervalsWithMeetingsInfo(meetings)
  })
}

// we've fetched a meeting
export const meetingFetched = (state, { meeting }) => {
  return state.merge({
    fetching: false,
    error: null,
    meeting: meeting,
    intervals: formIntervalsWithMeetingInfo(meeting)
  })
}

export const addMeeting = (state, { meeting }) => {
  const meetings = state.meetings.concat(meeting)

  return state.merge({
    fetching: false,
    error: null,
    meetings: meetings,
    intervals: formIntervalsWithMeetingInfo(meeting)
  })
}

export const removeMeeting = (state, { meetingId }) => {
  const meetings = state.meetings.filter(meeting => meeting.id !== meetingId)

  return state.merge({
    fetching: false,
    error: null,
    meetings: meetings,
    intervals: formIntervalsWithMeetingsInfo(meetings)
  })
}

// we've had a problem logging in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PERFORMING_REQUEST]: request,
  [Types.REQUEST_FAILED]: failure,
  [Types.FETCH_MEETINGS_SUCCESS]: meetingsFetched,
  [Types.FETCH_MEETING_SUCCESS]: meetingFetched,
  [Types.SHOW_MEETING_SUCCESS]: meetingFetched,
  [Types.CREATE_MEETING_SUCCESS]: addMeeting,
  [Types.DESTROY_MEETING_SUCCESS]: removeMeeting
})
