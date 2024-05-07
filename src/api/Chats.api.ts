import HTTPTransport from "../core/HTTPTransport";

const chatsApi = new HTTPTransport('https://ya-praktikum.tech/api/v2');

export default class ChatsApi {
    async getChats() {
        const { response } = await chatsApi.get('/chats', { credentials: 'include', headers: { mode: 'cors', accept: 'application/json' } })
        return response;
    }
}