import {Block} from '../../core/index.ts'
import { ChatListItem } from '../ChatListItem/index.ts'
import { type ChatListItemProps } from '../ChatListItem/ChatListItem.ts'

export interface ChatListProps extends ChatListItemProps {
  chatItems: ChatListItemProps[]
}

interface ChatListType extends ChatListProps {
  chatListItemsKeys: string[]
}

export default class ChatList extends Block<ChatListType> {
  constructor (props: ChatListProps) {
    const chatList = props.chatItems.reduce((list: Record<string, ChatListItem> = {}, chatData) => {
      const component: ChatListItem = new ChatListItem(chatData)
      list[component._id] = component
      return list
    }, {})

    super({
      ...props,
      chatListItemsKeys: Object.keys(chatList),
      ...chatList
    })
  }

  render (): string {
    return `
            <div class="chatList">
                ${Array.isArray(this.props.chatListItemsKeys) ? this.props.chatListItemsKeys.map((key) => `{{{ ${key} }}}`).join(' ') : ''}
            </div>
        `
  }
}
