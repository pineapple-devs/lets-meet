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
  const getSentInvitations = (userId) => {
    return api.get(`users/${userId}/sent_invitations`)
    .then((response) => {
      return response
    })
  }
  const getReceivedInvitations = (userId) => {
    return api.get(`users/${userId}/received_invitations`)
    .then((response) => {
      return response
    })
  }

  return {
    getRoot,
    getSentInvitations,
    getReceivedInvitations
  }
}

export default {
  create
}
