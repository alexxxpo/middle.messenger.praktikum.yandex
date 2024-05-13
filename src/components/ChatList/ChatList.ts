import { Block } from '../../core/index.ts'
import { type ChatListItemProps } from '../ChatListItem/ChatListItem.ts'
import { connect } from '../../utils/connect.ts'

export interface ChatListProps extends ChatListItemProps {
  chatItems: ChatListItemProps[]
}

interface ChatListType extends ChatListProps {
}

class ChatList extends Block<ChatListType> {
  constructor(props: ChatListProps) {
    super({
      ...props
    })
  }

  render(): string {
    return `
        {{#if isLoading}}
            <span>Загрузка списка чатов</span>
        {{else}}
            {{#if showEmpty}}
                <span>Нет чатов</span>
            {{else}}
                <div class="chatList">
                    <ul>
                        {{{chats}}}
                    </ul>
                </div>
            {{/if}}
        {{/if}}
    `
  }
}

const mapStateToProps = ({ isLoading }) => ({ isLoading })

export default connect(mapStateToProps)(ChatList)
