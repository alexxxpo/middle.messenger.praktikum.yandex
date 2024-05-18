import ChatsApi from "../api/Chats.api";
import Router from "../core/Router";
import Store from "../core/Store";
import { Routes } from "../main";
import { UsersRequest, ChatsResponse, CreateChat, CreateChatResponse } from "../types/types";

const router = Router;
const store = Store;
const chatsApi = new ChatsApi();

export const loadChats = async () => {
	store.set({ isLoading: true });
	try {
		const data = await chatsApi.getChats();
		console.log('getChats()');
		
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
				break;
		}

	} catch (error) {
		console.error(error)
		store.set({ createChatsError: { reason: "Неизвестная ошибка" } })
	} finally {
		store.set({ isLoading: false });
	}

}

export const addUserToChat = async (userData: UsersRequest) => {
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
				break;
		}

	} catch (error) {
		console.error(error)
		store.set({ addUserToChatError: { reason: "Неизвестная ошибка" } })
	} finally {
		store.set({ isLoading: false });
	}

}

export const deleteUserFromChat = async (userData: UsersRequest) => {
	store.set({ isLoading: true });
	try {
		const data = await chatsApi.deleteUserFromChat(userData);
		const { response, status } = data
		switch (status) {
			case 200:
				store.set({ deleteUserFromChatError: null })
				break;
			case 400:
				loadChats()
				store.set({ deleteUserFromChatError: JSON.parse(response) })
				break;
			case 401:
				store.set({ deleteUserFromChatError: "Пользователь не авторизован" })
				router.go(Routes.Login)
				break;
			case 500:
				store.set({ deleteUserFromChatError: "Ошибка на сервере" })
				router.go(Routes.Error)
				break;
			default:
				store.set({ deleteUserFromChatError: { reason: "Неизвестная ошибка" } })
				break;
		}

	} catch (error) {
		console.error(error)
		store.set({ deleteUserFromChatError: { reason: "Неизвестная ошибка" } })
	} finally {
		store.set({ isLoading: false });
	}

}

export const setActiveChat = (activeChat: ChatsResponse) => {
	console.log('setActiveChat()');
	
	store.set({ activeChat });
}

export const deleteChat = async (model: CreateChatResponse) => {
	store.set({ isLoading: true });
	try {
		const data = await chatsApi.deleteChat(model);
		const { response, status } = data
		switch (status) {
			case 200:
				store.set({ deleteChatError: null })
				store.set({ activeChat: null })
				await loadChats()
				break;
			case 400:
				loadChats()
				store.set({ deleteChatError: JSON.parse(response) })
				break;
			case 401:
				store.set({ deleteChatError: JSON.parse(response) })
				router.go(Routes.Login)
				break;
			case 403:
				store.set({ deleteChatError: JSON.parse(response) })
				router.go(Routes.Login)
				break;
			case 500:
				store.set({ deleteChatError: JSON.parse(response) })
				router.go(Routes.Error)
				break;
			default:
				store.set({ deleteChatError: { reason: "Неизвестная ошибка" } })
				break;
		}

	} catch (error) {
		console.error(error)
		store.set({ deleteChatError: { reason: "Неизвестная ошибка" } })
	} finally {
		store.set({ isLoading: false });
	}
}

export const getActiveChatUsers = async (id: number) => {
	store.set({ isLoading: true });
	try {
		const data = await chatsApi.getActiveChatUsers(id);
		const { response, status } = data
		switch (status) {
			case 200:
				store.set({ activeChatUsers: JSON.parse(response) })
				store.set({ getActiveChatUsersError: null })
				break;
			case 400:
				store.set({ activeChatUsers: [] })
				store.set({ getActiveChatUsersError: JSON.parse(response) })
				break;
			case 401:
				store.set({ activeChatUsers: [] })
				store.set({ getActiveChatUsersError: JSON.parse(response) })
				router.go(Routes.Login)
				break;
			case 404:
				store.set({ activeChatUsers: [] })
				store.set({ getActiveChatUsersError: JSON.parse(response) })
				router.go(Routes.Error)
				break;
			case 500:
				store.set({ activeChatUsers: [] })
				store.set({ getActiveChatUsersError: JSON.parse(response) })
				router.go(Routes.Error)
				break;
			default:
				store.set({ getActiveChatUsersError: { reason: "Неизвестная ошибка" } })
				break;
		}

	} catch (error) {
		console.error(error)
		store.set({ getActiveChatUsersError: { reason: "Неизвестная ошибка" } })
	} finally {
		store.set({ isLoading: false });
	}
}

export const getToken = async (chatId: number) => {
	try {
		const data = await chatsApi.getToken(chatId)
		const { response, status } = data
		switch (status) {
			case 200:
				store.set({ token: JSON.parse(response) })
				store.set({ getTokenError: null })
				return JSON.parse(response)
			case 401:
				store.set({ token: undefined })
				store.set({ getTokenError: JSON.parse(response) })
				router.go(Routes.Login)
				break;
			case 500:
				store.set({ token: undefined })
				store.set({ getTokenError: JSON.parse(response) })
				router.go(Routes.Error)
				break;
			default:
				store.set({ getTokenError: { reason: "Неизвестная ошибка" } })
				break;
		}

	} catch (e) {
		store.set({ getTokenError: { reason: "Неизвестная ошибка" } })
		console.error(e);
	}
}
