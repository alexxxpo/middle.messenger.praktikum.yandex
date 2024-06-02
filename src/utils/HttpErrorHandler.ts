import Router from '../core/Router'
import Store from '../core/Store'
import { Routes } from '../main'
const defaultStore = Store
const router = Router

export const HttpResponseHandler = (status: number, response: any, stateError: any, store = defaultStore, stateData?: any): void => {
  switch (status) {
    case 200:
      store.set({ [stateData]: JSON.parse(response as string) })
      store.set({ [stateError]: null })
      break
    case 400:
      store.set({ [stateError]: JSON.parse(response as string) })
      break
    case 401:
      store.set({ [stateError]: JSON.parse(response as string) })
      router.go(Routes.Login)
      break
    case 500:
      store.set({ [stateError]: JSON.parse(response as string) })
      break
    default:
      store.set({ [stateError]: { reason: 'Неизвестная ошибка', status } })
      router.go(Routes.Login)
      break
  }
}
