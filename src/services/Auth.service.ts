import AuthApi from '../api/Auth.api.ts'
import Router from '../core/Router.ts'
import Store from '../core/Store.ts'
import { Routes } from '../main.ts'
import { type CreateUser, type Login } from '../types/types.ts'

const store = Store
const router = Router
const authApi = new AuthApi()

export const login = async (model: Login) => {
  store.set({ isLoading: true })
  try {
    const data = await authApi.login(model)
    const { response, status } = data
    switch (status) {
      case 200:
        await me()
        store.set({ loginError: null })
        break
      case 400:
        store.set({ loginError: JSON.parse(response as string) })
        break
      case 401:
        store.set({ loginError: JSON.parse(response as string) })
        router.go(Routes.Login)
        break
      case 500:
        store.set({ loginError: JSON.parse(response as string) })
        break
      default:
        store.set({ loginError: { reason: 'Неизвестная ошибка', status } })
        break
    }
  } catch (error) {
    console.error(error)
    store.set({ loginError: { reason: 'Неизвестная ошибка' } })
  } finally {
    store.set({ isLoading: false })
  }
}

export const create = async (model: CreateUser) => {
  store.set({ isLoading: true })
  try {
    const data = await authApi.create(model)
    const { response, status } = data
    const responseParse = JSON.parse(response as string)
    switch (status) {
      case 200:
        store.set({ createUserError: null })
        await me()
        break
      case 400:
        store.set({ createUserError: responseParse })
        break
      case 401:
        store.set({ createUserError: responseParse })
        router.go(Routes.Login)
        break
      case 500:
        store.set({ createUserError: responseParse })
        break
      default:
        store.set({
          createUserError: { reason: 'Неизвестная ошибка', status }
        })
        break
    }
  } catch (error) {
    console.error(error)
    store.set({ createUserError: { reason: 'Неизвестная ошибка' } })
  } finally {
    store.set({ isLoading: false })
  }
}

export const me = async () => {
  store.set({ isLoading: true })
  try {
    const data = await authApi.me()
    const { response, status } = data
    const responseParse = JSON.parse(response as string)
    switch (status) {
      case 200:
        store.set({ currentUser: responseParse })
        store.set({ getUserError: null })
        break
      case 400:
        store.set({ getUserError: responseParse })
        break
      case 401:
        store.set({ getUserError: responseParse })
        router.go(Routes.Login)
        break
      case 500:
        store.set({ getUserError: responseParse })
        break
      default:
        store.set({ getUserError: { reason: 'Неизвестная ошибка' } })
        router.go(Routes.Chats)
        break
    }
  } catch (error) {
    console.error(error)
    store.set({ getUserError: { reason: 'Неизвестная ошибка' } })
  } finally {
    store.set({ isLoading: false })
  }
}

export const logout = async () => {
  store.set({ isLoading: true })
  try {
    await authApi.logout()
    const { response, status } = await authApi.me()
    const responseParse = JSON.parse(response as string)
    store.set({ currentUser: null })
    switch (status) {
      case 200:
        break
      case 500:
        store.set({ logoutError: responseParse })
        break
      default:
        store.set({ logoutError: { reason: 'Неизвестная ошибка' } })
        break
    }
  } catch (error) {
    console.error(error)
    store.set({ logoutError: { reason: 'Неизвестная ошибка' } })
  } finally {
    store.set({ isLoading: false })
    router.go(Routes.Login)
  }
}
