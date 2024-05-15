import UsersApi from "../api/Users.api";
import Router from "../core/Router";
import Store from "../core/Store";
import { Routes } from "../main";
import { ChangeProfile } from "../types/types";

const store = Store
const router = Router
const usersApi = new UsersApi();

export const changeUserData = async (model: ChangeProfile) => {
    console.log(model);
    
    store.set({ isLoading: true });
    try {
        const { response, status } = await usersApi.changeUserData(model);
        switch (status) {
            case 200:
                store.set({ currentUser: JSON.parse(response) })
                break;
            case 400:
                store.set({ changeUserDataError: JSON.parse(response) })
                break;
            case 401:
                store.set({ changeUserDataError: JSON.parse(response) })
                store.set({ currentUser: null })
                router.go(Routes.Login)
                break;
            case 500:
                store.set({ changeUserDataError: JSON.parse(response) })
                store.set({ currentUser: null })
                router.go(Routes.Error)
                break;
            default:
                store.set({ changeUserDataError: { reason: "Неизвестная ошибка" } })
                store.set({ currentUser: null })
                router.go(Routes.Login)
                break;
        }
    } catch (error) {
        console.error(error)
        store.set({ changeUserDataError: { reason: "Неизвестная ошибка" } })
    } finally {
        store.set({ isLoading: false });
    }

}

export const searchUsersByLogin = async (userData) => {
    store.set({ isLoading: true });
    try {
        const data = await usersApi.searchUsersByLogin(userData);
        const { response, status } = data
        switch (status) {
            case 200:
                store.set({ usersSearch: JSON.parse(response) })
                break;
            case 400:
                store.set({ usersSearchError: JSON.parse(response) })
                break;
            case 401:
                store.set({ usersSearchError: "Пользователь не авторизован" })
                store.set({ usersSearch: [] })
                router.go(Routes.Login)
                break;
            case 500:
                store.set({ usersSearchError: "Ошибка на сервере" })
                store.set({ usersSearch: [] })
                router.go(Routes.Error)
                break;
            default:
                store.set({ usersSearchError: { reason: "Неизвестная ошибка" } })
                store.set({ usersSearch: [] })
                router.go(Routes.Login)
                break;
        }

    } catch (error) {
        console.error(error)
        store.set({ usersSearchError: { reason: "Неизвестная ошибка" } })
    } finally {
        store.set({ isLoading: false });
    }

}
