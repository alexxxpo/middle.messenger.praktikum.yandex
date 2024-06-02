import Store from '../core/Store'
import { WSTransport } from '../core/WSTransport'
import { type ChatMessageType, type Message } from '../types/types'
import { getToken } from './Chats.service'

const store = Store

export class MessageService {
  socket = new WSTransport('wss://ya-praktikum.tech/ws/chats')
  connectChat = async (uid: number, chatId: number) => {
    try {
      // Получаем токен
      const { token } = await getToken(chatId)
      // Подключаемся к чату
      await this.socket.connect(uid, chatId, token as string)

      const { sockets } = store.getState()
      sockets?.push({
        chatId,
        socket: this.socket
      })
      store.set({
        sockets
      })

      this.socket.on('message', (data: Message) => {
        // Получаем сообщения текущего чата
        const { messages = [] } = store.getState()

        // Если массив, то обновляем список сообщений
        if (Array.isArray(data)) store.set({ messages: messages.reverse().concat(data.reverse()) })

        // Если не массив, то добавляем в список новое сообщение
        if (!Array.isArray(data)) {
          store.set({ messages: [...messages, { ...data, chat_id: chatId }] })
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  send = async (message: ChatMessageType) => {
    this.socket.send(message)
  }

  getOld = async (offset = 0) => {
    await this.send({
      type: 'get old',
      content: offset.toString()
    })
  }

  disconnectChat = () => {
    try {
      this.socket.close()
    } catch (error) {
      console.error(error)
      store.set({ changeUserDataError: { reason: 'Неизвестная ошибка' } })
    }
  }

  clearMessageList () {
    store.set({ messages: [] })
  }
}
