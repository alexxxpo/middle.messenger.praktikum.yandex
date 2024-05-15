import ChatsApi from "../api/Chats.api";
import Router from "../core/Router";
import Store from "../core/Store";
import { Routes } from "../main";
import { AddUserToChat, ChatsResponse, CreateChat } from "../types/types";

const router = Router;
const store = Store;
const chatsApi = new ChatsApi();

export const loadChats = async () => {
    store.set({ isLoading: true });
    try {
        const data = await chatsApi.getChats();
        const { response, status } = data
        switch (status) {
            case 200:
                store.set({ chats: JSON.parse(response) })
                store.set({ getChatsError: null })
                break;
            case 401:
                store.set({ getChatsError: JSON.parse(response) })
                store.set({ chats: [] })
                router.go(Routes.Login)
                break;
            case 500:
                store.set({ getChatsError: JSON.parse(response) })
                store.set({ chats: [] })
                break;
            default:
                store.set({ getChatsError: { reason: "Неизвестная ошибка" } })
                store.set({ chats: [] })
                break;
        }

    } catch (error) {
        console.error(error)
        store.set({ getChatsError: { reason: "Неизвестная ошибка" } })
    } finally {
        store.set({ isLoading: false });
    }

}

export const createChat = async (title: CreateChat) => {
    store.set({ isLoading: true });
    try {
        const data = await chatsApi.createChat(title);
        const { response, status } = data
        switch (status) {
            case 200:
                loadChats()
                store.set({ createChatsError: null })
                break;
            case 400:
                loadChats()
                store.set({ createChatsError: JSON.parse(response) })
                break;
            case 401:
                store.set({ createChatsError: "Пользователь не авторизован" })
                store.set({ chats: [] })
                router.go(Routes.Login)
                break;
            case 500:
                store.set({ createChatsError: "Ошибка на сервере" })
                store.set({ chats: [] })
                router.go(Routes.Error)
                break;
            default:
                store.set({ createChatsError: { reason: "Неизвестная ошибка" } })
                store.set({ chats: [] })
                router.go(Routes.Login)
                break;
        }

    } catch (error) {
        console.error(error)
        store.set({ createChatsError: { reason: "Неизвестная ошибка" } })
    } finally {
        store.set({ isLoading: false });
    }

}

export const addUserToChat = async (userData: AddUserToChat) => {
    store.set({ isLoading: true });
    try {
        const data = await chatsApi.addUserToChat(userData);
        const { response, status } = data
        switch (status) {
            case 200:
                store.set({ addUserToChatError: null })
                break;
            case 400:
                loadChats()
                store.set({ addUserToChatError: JSON.parse(response) })
                break;
            case 401:
                store.set({ addUserToChatError: "Пользователь не авторизован" })
                router.go(Routes.Login)
                break;
            case 500:
                store.set({ addUserToChatsError: "Ошибка на сервере" })
                router.go(Routes.Error)
                break;
            default:
                store.set({ addUserToChatError: { reason: "Неизвестная ошибка" } })
                router.go(Routes.Login)
                break;
        }

    } catch (error) {
        console.error(error)
        store.set({ addUserToChatError: { reason: "Неизвестная ошибка" } })
    } finally {
        store.set({ isLoading: false });
    }

}

export const setActiveChat = (activeChat: ChatsResponse) => {
    store.set({activeChat});
}
