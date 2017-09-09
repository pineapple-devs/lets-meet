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

  const updateUser = (userId, userParams) => {
    return api.put(`users/${userId}`, userParams)
    .then(response => response)
    .catch(error => console.tron.error(error))
  }

  return { updateUser }
}

export default {
  create
}
