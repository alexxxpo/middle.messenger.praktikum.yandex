import MessageApi from "../api/Message.api";
import Router from "../core/Router";
import Store from "../core/Store";

const store = Store
const messageApi = new MessageApi()

export const connectChat = async (uid: number, chatId: number, token: string) => {
    
    store.set({ isLoading: true });
    try {
        await messageApi.connect(uid, chatId, token)
    } catch (error) {
        console.error(error)
        store.set({ changeUserDataError: { reason: "Неизвестная ошибка" } })
    } finally {
        store.set({ isLoading: false });
    }
}
