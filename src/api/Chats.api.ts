import HTTPTransport from "../core/HTTPTransport";

const chatsApi = new HTTPTransport('https://ya-praktikum.tech/api/v2');

export default class ChatsApi {
    async getChats() {
        return await chatsApi.get('/chats', { withCredentials: true })
    }

    async createChat(data) {
        return await chatsApi.post('/chats', {
            withCredentials: true,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}