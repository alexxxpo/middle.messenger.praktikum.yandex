import AuthApi from "../api/Auth.api.ts";
import { Routes } from "../main.ts";

const authApi = new AuthApi();

export const login = async (model) => {
    window.store.set({ isLoading: true });
    try {
        await authApi.login(model);
        // window.router.go(Routes.Chats);        
    } catch (error) {
        window.store.set({ loginError: 'some error' });
    } finally {
        window.store.set({ isLoading: false });
    }

}

export const create = async (model) => {
    window.store.set({ isLoading: true });
    try {
        await authApi.create(model);
    } catch (error) {
        window.store.set({ signUpError: 'some error' });
    } finally {
        window.store.set({ isLoading: false });
    }
}

export const me = async () => {
    window.store.set({ isLoading: true });
    try {
        const { response } = await authApi.me();
        window.store.set({ currentUser: JSON.parse(response) })
    } catch (error) {
        window.store.set({ signUpError: 'some error' });
    } finally {
        window.store.set({ isLoading: false });
    }
}