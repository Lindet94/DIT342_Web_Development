import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

export const Api = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT || 'http://localhost:3000/api'
})

Api.defaults.withCredentials = true

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest) =>
  Api.post('/users/refresh-token').then((tokenRefreshResponse) => {
    localStorage.setItem('user', JSON.stringify(tokenRefreshResponse.data))
    Api.defaults.headers.common.Authorization = `token ${tokenRefreshResponse.data.token
      }`

    failedRequest.response.config.headers.Authorization = 'Bearer ' + tokenRefreshResponse.data.token
    return Promise.resolve()
  })

// Instantiate the interceptor
createAuthRefreshInterceptor(Api, refreshAuthLogic)
