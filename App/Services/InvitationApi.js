import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'https://lets-meet-api.herokuapp.com/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 30000
  })

  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
  }

  const getRoot = () => api.get('')
  const getSentInvitations = userId => {
    return api
      .get(`users/${userId}/sent_invitations`)
      .then(response => response)
  }
  const getReceivedInvitations = userId => {
    return api
      .get(`users/${userId}/received_invitations`)
      .then(response => response)
  }
  const getInvitationsByMeeting = (userId, meetingId) => {
    return api
      .get(`users/${userId}/meetings/${meetingId}/invitations`)
      .then(response => response)
  }

  const updateInvitation = (
    userId,
    meetingId,
    invitationId,
    invitationParams
  ) => {
    return api
      .put(
        `users/${userId}/meetings/${meetingId}/invitations/${invitationId}`,
        invitationParams
      )
      .then(response => response)
  }
  const updateInvitationAccepted = (
    userId,
    meetingId,
    invitationId,
    accepted
  ) => {
    const invitationParams = { invitation: { accepted: accepted } }
    return updateInvitation(userId, meetingId, invitationId, invitationParams)
  }

  return {
    getRoot,
    getSentInvitations,
    getReceivedInvitations,
    updateInvitationAccepted,
    getInvitationsByMeeting
  }
}

export default {
  create
}
