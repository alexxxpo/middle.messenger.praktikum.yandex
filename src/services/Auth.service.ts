import AuthApi from "../api/Auth.api.ts";
import Router from "../core/Router.ts";
import Store from "../core/Store.ts";
import { Routes } from "../main.ts";
import { ILogin } from "../types/types.ts";

const store = Store;
const router = Router;
const authApi = new AuthApi();



export const login = async (model: ILogin) => {
    store.set({ isLoading: true });
    try {
        await authApi.login(model);
        router.go(Routes.Chats);    
    } catch (error) {
        console.log(error)
        store.set({ loginError: 'some error' });
    } finally {
        store.set({ isLoading: false });
    }

}

export const create = async (model) => {
    window.store.set({ isLoading: true });
    try {
        await authApi.create(model);
        window.router.go(Routes.Chats);
    } catch (error) {
        console.log(error)
        window.store.set({ signUpError: 'some error' });
    } finally {
        window.store.set({ isLoading: false });
    }
}

export const me = async () => {
    window.store.set({ isLoading: true });
    try {
        const data = await authApi.me();
        const { response, status } = data
        switch (status) {
            case 200:
                window.store.set({ currentUser: JSON.parse(response) })
                window.store.set({ getUserError: null })
                break;
            case 400:
                window.store.set({ getUserError: JSON.parse(response) })
                break;
            case 401:
                window.store.set({ getUserError: JSON.parse(response) })
                window.router.go(Routes.Login)
                break;
            case 500:
                window.store.set({ getUserError: JSON.parse(response) })
                break;
            default:
                window.store.set({ getUserError: { reason: "Неизвестная ошибка" } })
                window.router.go(Routes.Chats)
                break;
        }
    } catch (error) {
        console.error(error)
        window.store.set({ getUserError: 'some error' });
    } finally {
        window.store.set({ isLoading: false });
    }
}

export const logout = async () => {
    window.store.set({ isLoading: true });
    try {
        await authApi.logout();
        window.router.go(Routes.Login)
        window.store.set({ currentUser: null })
    } catch (error) {
        console.log(error)
        window.store.set({ logoutError: 'some error' });
    } finally {
        window.store.set({ isLoading: false });
    }
}
