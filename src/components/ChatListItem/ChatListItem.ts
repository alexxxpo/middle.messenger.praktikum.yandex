import { Block } from '../../core/index.ts'
import { setActiveChat } from '../../services/Chats.service.ts'
import { ChatsResponse } from '../../types/types.ts'
import { MapStateToProps, connect } from '../../utils/connect.ts'

type ChatListItemProps = {
  activeChat: ChatsResponse
}

class ChatListItem extends Block {
  constructor(props: ChatsResponse) {
    super({
      ...props,
      events: {
        click: [() => {
          setActiveChat({...props})
        }]
      }
    })
  }

  componentDidUpdate(oldProps: ChatListItemProps, newProps: ChatListItemProps): boolean {
    if(oldProps.activeChat !== newProps.activeChat) {
      if(newProps.activeChat.id === this.props.id) {
        this.active = true
      } else {
        this.active = false
      }
      return true
    }
    return false
  }

  active: boolean = false

  render(): string {
    return `
        <div class="chatListItem" ${this.active === true ? 'active' : ''}>
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

const mapStateToProps: MapStateToProps = ({ currentUser, activeChat }) => ({ currentUser, activeChat })

export default connect(mapStateToProps)(ChatListItem)
