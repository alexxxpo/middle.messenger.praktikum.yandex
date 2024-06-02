import { WSTransport } from '../core/WSTransport'

const messageApi = new WSTransport()

export default class MessageApi {
  async connect (uid: number, chatId: number, token: string) {
    await messageApi.connect(uid, chatId, token)
  }

  async close () {
    messageApi.close()
  }
}
