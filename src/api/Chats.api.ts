import HTTPTransport from "../core/HTTPTransport";
import { UsersRequest, CreateChat, CreateChatResponse } from "../types/types";

const chatsApi = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');

export default class ChatsApi {
    async getChats() {
        return await chatsApi.get('/', { withCredentials: true })
    }

    async createChat(data: CreateChat) {
        return await chatsApi.post('/', {
            withCredentials: true,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    async addUserToChat(data: UsersRequest) {
        return await chatsApi.put('/users', {
            withCredentials: true,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    async deleteUserFromChat(data: UsersRequest) {
        return await chatsApi.delete('/users', {
            withCredentials: true,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    async getToken(id: number) {
        return await chatsApi.post(`/token/${id}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    async deleteChat(model: CreateChatResponse) {
        return await chatsApi.delete('/', {
            withCredentials: true,
            data: JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    async getActiveChatUsers(id: number) {
        return await chatsApi.get(`/${id}/users`, {
            withCredentials: true
        })
    }
}

