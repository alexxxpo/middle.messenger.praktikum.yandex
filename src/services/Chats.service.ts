import ChatsApi from "../api/Chats.api";
import { Routes } from "../main";

const chatsApi = new ChatsApi();

export const loadChats = async () => {
    window.store.set({ isLoading: true });
    try {
        const data = await chatsApi.getChats();
        const { response, status } = data
        switch (status) {
            case 200:
                window.store.set({ chats: JSON.parse(response) })
                window.store.set({ getChatsError: null })
                break;
            case 401:
                window.store.set({ getChatsError: "Пользователь не авторизован" })
                window.store.set({ chats: [] })
                window.router.go(Routes.Login)
                break;
            case 500:
                window.store.set({ getChatsError: "Ошибка на сервере" })
                window.store.set({ chats: [] })
                window.router.go(Routes.Error)
                break;
            default:
                window.store.set({ getChatsError: { reason: "Неизвестная ошибка" } })
                window.store.set({ chats: [] })
                window.router.go(Routes.Login)
                break;
        }

    } catch (error) {
        console.error(error)
        window.store.set({ getChatsError: { reason: "Неизвестная ошибка" } })
    } finally {
        window.store.set({ isLoading: false });
    }

}

export const createChat = async (title: string) => {
    window.store.set({ isLoading: true });
    try {
        const data = await chatsApi.createChat(title);
        const { response, status } = data
        switch (status) {
            case 200:
                loadChats()
                window.store.set({ createChatsError: null })
                break;
            case 400:
                loadChats()
                window.store.set({ createChatsError: JSON.parse(response) })
                break;
            case 401:
                window.store.set({ createChatsError: "Пользователь не авторизован" })
                window.store.set({ chats: [] })
                window.router.go(Routes.Login)
                break;
            case 500:
                window.store.set({ getChatsError: "Ошибка на сервере" })
                window.store.set({ chats: [] })
                window.router.go(Routes.Error)
                break;
            default:
                window.store.set({ getChatsError: { reason: "Неизвестная ошибка" } })
                window.store.set({ chats: [] })
                window.router.go(Routes.Login)
                break;
        }

    } catch (error) {
        console.error(error)
        window.store.set({ getChatsError: { reason: "Неизвестная ошибка" } })
    } finally {
        window.store.set({ isLoading: false });
    }

}

export const setActiveChat = (activeChat) => {
    window.store.set({activeChat});
}
