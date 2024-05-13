import UsersApi from "../api/Users.api";
import { Routes } from "../main";

const usersApi = new UsersApi();

export const changeUserData = async (userData) => {
    console.log('User data',userData)
    window.store.set({ isLoading: true });
    try {
        const data = await usersApi.changeUserData(userData);
        const { response, status } = data
        switch (status) {
            case 200:
                console.log(data)
                window.store.set({ currentUser: JSON.parse(response) })
                break;
            case 400:
                window.store.set({ changeUserDataError: JSON.parse(response) })
                break;
            case 401:
                window.store.set({ changeUserDataError: "Пользователь не авторизован" })
                window.store.set({ currentUser: null })
                window.router.go(Routes.Login)
                break;
            case 500:
                window.store.set({ changeUserDataError: "Ошибка на сервере" })
                window.store.set({ currentUser: null })
                window.router.go(Routes.Error)
                break;
            default:
                window.store.set({ changeUserDataError: { reason: "Неизвестная ошибка" } })
                window.store.set({ currentUser: null })
                window.router.go(Routes.Login)
                break;
        }

    } catch (error) {
        console.error(error)
        window.store.set({ changeUserDataError: { reason: "Неизвестная ошибка" } })
    } finally {
        window.store.set({ isLoading: false });
    }

}
