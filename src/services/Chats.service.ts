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
		const { response, status } = data
		const responseParse = JSON.parse(response)
		switch (status) {
			case 200:
				store.set({ chats: responseParse })
				store.set({ getChatsError: null })
				break;
			case 401:
				store.set({ getChatsError: responseParse })
				store.set({ chats: [] })
				router.go(Routes.Login)
				break;
			case 500:
				store.set({ getChatsError: responseParse })
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
		const responseParse = JSON.parse(response)
		switch (status) {
			case 200:
				loadChats()
				store.set({ createChatsError: null })
				break;
			case 400:
				loadChats()
				store.set({ createChatsError: responseParse })
				break;
			case 401:
				store.set({ createChatsError: responseParse })
				store.set({ chats: [] })
				router.go(Routes.Login)
				break;
			case 500:
				store.set({ createChatsError: responseParse })
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
		const responseParse = JSON.parse(response)
		switch (status) {
			case 200:
				store.set({ addUserToChatError: null })
				break;
			case 400:
				loadChats()
				store.set({ addUserToChatError: responseParse })
				break;
			case 401:
				store.set({ addUserToChatError: responseParse })
				router.go(Routes.Login)
				break;
			case 500:
				store.set({ addUserToChatsError: responseParse })
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
		const responseParse = JSON.parse(response)
		switch (status) {
			case 200:
				store.set({ deleteUserFromChatError: null })
				break;
			case 400:
				loadChats()
				store.set({ deleteUserFromChatError: responseParse })
				break;
			case 401:
				store.set({ deleteUserFromChatError: responseParse })
				router.go(Routes.Login)
				break;
			case 500:
				store.set({ deleteUserFromChatError: responseParse })
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
	store.set({ activeChat });
}

export const deleteChat = async (model: CreateChatResponse) => {
	store.set({ isLoading: true });
	try {
		const data = await chatsApi.deleteChat(model);
		const { response, status } = data
		const responseParse = JSON.parse(response)
		switch (status) {
			case 200:
				store.set({ deleteChatError: null })
				store.set({ activeChat: null })
				await loadChats()
				break;
			case 400:
				loadChats()
				store.set({ deleteChatError: responseParse })
				break;
			case 401:
				store.set({ deleteChatError: responseParse })
				router.go(Routes.Login)
				break;
			case 403:
				store.set({ deleteChatError: responseParse })
				router.go(Routes.Login)
				break;
			case 500:
				store.set({ deleteChatError: responseParse })
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
		const responseParse = JSON.parse(response)
		switch (status) {
			case 200:
				store.set({ activeChatUsers: responseParse })
				store.set({ getActiveChatUsersError: null })
				break;
			case 400:
				store.set({ activeChatUsers: [] })
				store.set({ getActiveChatUsersError: responseParse })
				break;
			case 401:
				store.set({ activeChatUsers: [] })
				store.set({ getActiveChatUsersError: responseParse })
				router.go(Routes.Login)
				break;
			case 404:
				store.set({ activeChatUsers: [] })
				store.set({ getActiveChatUsersError: responseParse })
				router.go(Routes.Error)
				break;
			case 500:
				store.set({ activeChatUsers: [] })
				store.set({ getActiveChatUsersError: responseParse })
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
		const responseParse = JSON.parse(response)
		switch (status) {
			case 200:
				store.set({ token: responseParse })
				store.set({ getTokenError: null })
				return responseParse
			case 401:
				store.set({ token: undefined })
				store.set({ getTokenError: responseParse })
				router.go(Routes.Login)
				break;
			case 500:
				store.set({ token: undefined })
				store.set({ getTokenError: responseParse })
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

export const changeChatImage = async (chatData: HTMLFormElement, chatId: number | undefined) => {
	try {
		const data = await chatsApi.changeChatImage(chatData, chatId)
		const { response, status } = data
		const responseParse = JSON.parse(response)
		switch (status) {
			case 200:
				return responseParse
			case 401:
				store.set({ changeChatImageError: responseParse })
				router.go(Routes.Login)
				break;
			case 500:
				store.set({ changeChatImageError: responseParse })
				router.go(Routes.Error)
				break;
			default:
				store.set({ changeChatImageError: { reason: "Неизвестная ошибка" } })
				break;
		}

	} catch (e) {
		store.set({ changeChatImageError: { reason: "Неизвестная ошибка" } })
		console.error(e);
	}
}
