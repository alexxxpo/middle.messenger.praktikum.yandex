import { Block } from '../../core/index.ts'
import { setActiveChat } from '../../services/Chats.service.ts'
import { EventsType } from '../../types/types.ts'
import { connect } from '../../utils/connect.ts'

export interface ChatListItemProps {
  active?: boolean
  name?: string
  time?: string
  my?: boolean
  messages?: string[]
  messageCount?: number
  events?: EventsType
}

class ChatListItem extends Block<ChatListItemProps> {
  constructor(props: ChatListItemProps) {
    super({
      ...props,
      events: {
        click: [() => {
          const card = {
            title: props.title,
            avatar: props.avatar,
            id: props.id
          }
          setActiveChat(card)
        }]
      }
    })
  }

  render(): string {
    console.log('chatListItem', this)
    return `
        <div class="chatListItem" ${this.props.active === true ? 'active' : ''}>
            <div class="chatListItem__wrapper">
                <div class="chatListItem__img">
                    <img src="${this.props.avatar}" alt="avatar"/>
                </div>
                <div class="chatListItem__body">
                    <div class="chatListItem__info">
                        <div class="chatName">
                            <h4>{{title}}</h4>
                        </div>
                        <div class="chatListItem__messageTime">{{time}}</div>
                    </div>
                    <div class="chatListItem__meta">
                        <div class="lastMessage">
                            <p>
                                ${this.props.currentUser?.id === this.props.created_by ? '<span>Вы:</span>' : ''}
                                {{message}}
                            </p>
                        </div>
                        <div class="chatListItem__messageCount" ${this.props.unread_count as number > 0 ? 'show' : ''}>{{unread_count}}</div>
                    </div>
                </div>
            </div>
        </div>        
        `
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser })

export default connect(mapStateToProps)(ChatListItem)
