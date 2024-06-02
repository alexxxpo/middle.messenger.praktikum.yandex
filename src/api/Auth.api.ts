import { BASE_URL } from '../const/const.ts'
import HTTPTransport from '../core/HTTPTransport.ts'
import { type CreateUser, type Login } from '../types/types.ts'

const authApi = new HTTPTransport({
  baseUrl: BASE_URL,
  url: '/auth'
})

export default class AuthApi {
  async create (data: CreateUser) {
    return await authApi.post('/signup', {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async login (data: Login) {
    return await authApi.post('/signin', {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
  }

  async me () {
    return await authApi.get('/user', {
      withCredentials: true
    })
  }

  async logout () {
    return await authApi.post('/logout', {
      withCredentials: true
    })
  }
}
