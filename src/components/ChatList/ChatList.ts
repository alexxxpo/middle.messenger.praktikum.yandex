import Block from '../../core/Block'
import { ChatListItem } from '../ChatListItem'
import { ChatListItemProps } from '../ChatListItem/ChatListItem'

export interface ChatListProps extends ChatListItemProps {
  chatItems: ChatListItemProps[];
}

interface ChatListType extends ChatListProps {
  chatListItemsKeys: string[];
}

export default class ChatList extends Block<ChatListType> {
  constructor (props: ChatListProps) {
    const chatList = props.chatItems.reduce((list: {[key: string]: ChatListItem} = {}, chatData) => {
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
                ${this.props.chatListItemsKeys.map((key) => `{{{ ${key} }}}`).join(' ')}
            </div>
        `
  }
}
