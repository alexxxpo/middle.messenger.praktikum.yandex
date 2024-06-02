import UsersApi from '../api/Users.api'
import Router from '../core/Router'
import Store from '../core/Store'
import { Routes } from '../main'
import { type ChangePasswordRequest, type FindUserRequest, type UserUpdateRequest } from '../types/types'

const store = Store
const router = Router
const usersApi = new UsersApi()

export const changeUserData = async (model: UserUpdateRequest) => {
  store.set({ isLoading: true })
  try {
    const { response, status } = await usersApi.changeUserData(model)
    const responseParse = JSON.parse(response as string)
    switch (status) {
      case 200:
        store.set({ currentUser: responseParse })
        break
      case 400:
        store.set({ changeUserDataError: responseParse })
        break
      case 401:
        store.set({ changeUserDataError: responseParse })
        store.set({ currentUser: null })
        router.go(Routes.Login)
        break
      case 500:
        store.set({ changeUserDataError: responseParse })
        store.set({ currentUser: null })
        router.go(Routes.Error)
        break
      default:
        store.set({ changeUserDataError: { reason: 'Неизвестная ошибка' } })
        store.set({ currentUser: null })
        router.go(Routes.Login)
        break
    }
  } catch (error) {
    console.error(error)
    store.set({ changeUserDataError: { reason: 'Неизвестная ошибка' } })
  } finally {
    store.set({ isLoading: false })
  }
}

export const changePassword = async (model: ChangePasswordRequest) => {
  store.set({ isLoading: true })
  try {
    const { response, status } = await usersApi.changePassword(model)
    const responseParse = JSON.parse(response as string)
    switch (status) {
      case 200:
        store.set({ changePasswordError: null })
        break
      case 400:
        store.set({ changePasswordError: responseParse })
        break
      case 401:
        store.set({ changePasswordError: responseParse })
        store.set({ currentUser: null })
        router.go(Routes.Login)
        break
      case 500:
        store.set({ changePasswordError: responseParse })
        store.set({ currentUser: null })
        router.go(Routes.Error)
        break
      default:
        store.set({ changePasswordError: { reason: 'Неизвестная ошибка' } })
        store.set({ currentUser: null })
        router.go(Routes.Login)
        break
    }
  } catch (error) {
    console.error(error)
    store.set({ changePasswordError: { reason: 'Неизвестная ошибка' } })
  } finally {
    store.set({ isLoading: false })
  }
}

export const searchUsersByLogin = async (userData: FindUserRequest) => {
  store.set({ isLoading: true })
  try {
    const data = await usersApi.searchUsersByLogin(userData)
    const { response, status } = data
    const responseParse = JSON.parse(response as string)
    switch (status) {
      case 200:
        store.set({ usersSearch: responseParse })
        break
      case 400:
        store.set({ usersSearchError: responseParse })
        break
      case 401:
        store.set({ usersSearchError: responseParse })
        store.set({ usersSearch: [] })
        router.go(Routes.Login)
        break
      case 500:
        store.set({ usersSearchError: responseParse })
        store.set({ usersSearch: [] })
        router.go(Routes.Error)
        break
      default:
        store.set({ usersSearchError: { reason: 'Неизвестная ошибка' } })
        store.set({ usersSearch: [] })
        router.go(Routes.Login)
        break
    }
  } catch (error) {
    console.error(error)
    store.set({ usersSearchError: { reason: 'Неизвестная ошибка' } })
  } finally {
    store.set({ isLoading: false })
  }
}

export const changeAvatar = async (userData: HTMLFormElement) => {
  store.set({ isLoading: true })
  try {
    const data = await usersApi.changeAvatar(userData)
    const { response, status } = data
    const responseParse = JSON.parse(response as string)
    switch (status) {
      case 200:
        store.set({ currentUser: responseParse })
        store.set({ changeAvatarError: null })
        break
      case 400:
        store.set({ changeAvatarError: responseParse })
        break
      case 401:
        store.set({ changeAvatarError: responseParse })
        router.go(Routes.Login)
        break
      case 500:
        store.set({ changeAvatarError: responseParse })
        router.go(Routes.Error)
        break
      default:
        store.set({ changeAvatarError: { reason: 'Неизвестная ошибка' } })
        router.go(Routes.Login)
        break
    }
  } catch (error) {
    console.error(error)
    store.set({ changeAvatarError: { reason: 'Неизвестная ошибка' } })
  } finally {
    store.set({ isLoading: false })
  }
}
