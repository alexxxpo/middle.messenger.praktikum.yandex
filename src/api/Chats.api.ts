import HTTPTransport from "../core/HTTPTransport";

const chatsApi = new HTTPTransport('https://ya-praktikum.tech/api/v2');

export default class ChatsApi {
    async getChats() {
        return await chatsApi.get('/chats', { withCredentials: true })
    }

    async createChat(title: string) {
        return await chatsApi.post('/chats', {
            withCredentials: true,
            data: JSON.stringify({ title }),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}