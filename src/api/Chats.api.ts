import HTTPTransport from "../core/HTTPTransport";
import { AddUserToChat, CreateChat } from "../types/types";

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

    async addUserToChat(data: AddUserToChat) {
        return await chatsApi.put('/users', {
            withCredentials: true,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}
