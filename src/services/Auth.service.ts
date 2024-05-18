import AuthApi from "../api/Auth.api.ts";
import Router from "../core/Router.ts";
import Store from "../core/Store.ts";
import { Routes } from "../main.ts";
import { CreateUser, Login } from "../types/types.ts";

const store = Store;
const router = Router;
const authApi = new AuthApi();

export const login = async (model: Login) => {
    store.set({ isLoading: true });
    try {
        const data = await authApi.login(model);
        const { response, status } = data
        switch (status) {
            case 200:
                store.set({ loginError: null })
                await me()
                break;
            case 400:
                store.set({ loginError: JSON.parse(response) })
                break;
            case 401:
                store.set({ loginError: JSON.parse(response) })
                router.go(Routes.Login)
                break;
            case 500:
                store.set({ loginError: JSON.parse(response) })
                break;
            default:
                store.set({ loginError: { reason: "Неизвестная ошибка", status } })
                break;
        }
    } catch (error) {
        console.error(error)
        store.set({ loginError: { reason: "Неизвестная ошибка" } });
    } finally {
        store.set({ isLoading: false });
    }

}

export const create = async (model: CreateUser) => {
    store.set({ isLoading: true });
    try {
        const data = await authApi.create(model);
        const { response, status } = data
        switch (status) {
            case 200:
                store.set({ createUserError: null })
                await me()
                break;
            case 400:
                store.set({ createUserError: JSON.parse(response) })
                break;
            case 401:
                store.set({ createUserError: JSON.parse(response) })
                router.go(Routes.Login)
                break;
            case 500:
                store.set({ createUserError: JSON.parse(response) })
                break;
            default:
                store.set({ createUserError: { reason: "Неизвестная ошибка", status } })
                break;
        }
    } catch (error) {
        console.error(error)
        store.set({ createUserError: { reason: "Неизвестная ошибка" } });
    } finally {
        store.set({ isLoading: false });
    }
}

export const me = async () => {
    store.set({ isLoading: true });
    try {
        const data = await authApi.me();
        const { response, status } = data
        switch (status) {
            case 200:
                store.set({ currentUser: JSON.parse(response) })
                store.set({ getUserError: null })
                break;
            case 400:
                store.set({ getUserError: JSON.parse(response) })
                break;
            case 401:
                store.set({ getUserError: JSON.parse(response) })
                router.go(Routes.Login)
                break;
            case 500:
                store.set({ getUserError: JSON.parse(response) })
                break;
            default:
                store.set({ getUserError: { reason: "Неизвестная ошибка" } })
                router.go(Routes.Chats)
                break;
        }
    } catch (error) {
        console.error(error)
        store.set({ getUserError: { reason: "Неизвестная ошибка" } });
    } finally {
        store.set({ isLoading: false });
    }
}

export const logout = async () => {
    store.set({ isLoading: true });
    try {
        await authApi.logout();
        const { response, status } = await authApi.me();
        store.set({ currentUser: null })
        switch (status) {
            case 200:
                router.go(Routes.Login)
                break;
            case 500:
                store.set({ logoutError: JSON.parse(response) })
                router.go(Routes.Login)
                break;
            default:
                store.set({ logoutError: { reason: "Неизвестная ошибка" } })
                router.go(Routes.Login)
                break;
        }
    } catch (error) {
        console.error(error)
        store.set({ logoutError: { reason: "Неизвестная ошибка" } });
    } finally {
        store.set({ isLoading: false });
    }
}
