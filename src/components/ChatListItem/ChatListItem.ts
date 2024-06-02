import { Block } from '../../core/index.ts'
import { getActiveChatUsers, setActiveChat } from '../../services/Chats.service.ts'
import { MessageService } from '../../services/Message.service.ts'
import { type ChatsResponse } from '../../types/types.ts'
import { type MapStateToProps, connect } from '../../utils/connect.ts'
import img from '../../assets/images/Union.png'

interface ChatListItemProps {
  activeChat: ChatsResponse
  active: string
}

class ChatListItem extends Block {
  socket?: MessageService
  constructor (props: ChatsResponse) {
    super({
      ...props,
      events: {
        click: [() => {
          setActiveChat({ ...props })
          getActiveChatUsers(props.id)
        }]
      }
    })
  }

  init () {
    this.setProps({ socket: new MessageService() })
    this.props.socket.connectChat(this.props.currentUser.id, this.props.id)
  }

  componentDidUpdate (oldProps: ChatListItemProps, newProps: ChatListItemProps): boolean {
    if (oldProps.activeChat !== newProps.activeChat) {
      if (newProps.activeChat.id === this.props.id) {
        this.setProps({ active: 'active' })
        this.props.socket?.getOld()
      } else if (newProps.activeChat.id !== this.props.id && oldProps.active === 'active') {
        this.setProps({ active: '' })
        this.props.socket?.clearMessageList()
      }
      return true
    }
    return false
  }

  active: boolean = false

  render (): string {
    return `
        <div class="chatListItem" {{active}}>
            <div class="chatListItem__wrapper">
                <div class="chatListItem__img">
                    <img src="${this.props.avatar ? 'https://ya-praktikum.tech/api/v2/resources/' + this.props.avatar : img}" alt="avatar"/>
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
                                ${this.props.currentUser?.id === this.props.last_message?.user.id ? '<span>Вы:</span>' : ''}
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

const mapStateToProps: MapStateToProps = ({ currentUser, activeChat }) => ({ currentUser, activeChat })

export default connect(mapStateToProps)(ChatListItem)
