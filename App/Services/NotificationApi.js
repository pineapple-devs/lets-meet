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

  const signUp = (token, os, userId) => {
    return api.post(`users/${userId}/register_device`, {token, os})
    .then(response => {
      if (!response.ok) {
        return new Error('not_ok')
      }

      return response.data
    })
    .catch(error => console.tron.error(error))
  }

  return { signUp }
}

export default {
  create
}
