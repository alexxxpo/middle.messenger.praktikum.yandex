import { WSTransport } from "../core/WSTransport";

const messageApi = new WSTransport('https://ya-praktikum.tech/ws/chats');

export default class MessageApi {
	async connect(uid: number, chatId: number, token: string) {
		return await messageApi.connect(uid, chatId, token)
	}
}