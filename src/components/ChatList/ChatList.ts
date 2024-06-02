import { Block } from '../../core/index.ts'
import { type ChatsResponse } from '../../types/types.ts'
import { type MapStateToProps, connect } from '../../utils/connect.ts'
import ChatListItem from '../ChatListItem/ChatListItem.ts'

class ChatList extends Block {
  constructor (props: Record<string, unknown>) {
    super({
      ...props
    })
  }

  componentDidUpdate (oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
    if (oldProps.chats !== newProps.chats) {
      this.setProps({
        chatListItems: newProps.chats?.map((chat: ChatsResponse) => new ChatListItem({ ...chat })) || []
      })
      return true
    }
    return false
  }

  mapChatsToComponents (chats: ChatsResponse[]) {
    return chats?.map((chat) => new ChatListItem({ ...chat }))
  }

  render (): string {
    return `
        {{#if isLoading}}
            <span>Загрузка списка чатов</span>
        {{else}}
            {{#if showEmpty}}
                <span>Нет чатов</span>
            {{else}}
                <div class="chatList">
                    <ul>
                        {{{chatListItems}}}
                    </ul>
                </div>
            {{/if}}
        {{/if}}
    `
  }
}

const mapStateToProps: MapStateToProps = ({ chats }) => ({ chats })

export default connect(mapStateToProps)(ChatList)
