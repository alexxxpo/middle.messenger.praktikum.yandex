import Block from '../../core/Block'

export interface ChatListItemProps {
    active?: boolean;
    name?: string;
    time?: string;
    my?: boolean;
    message?: string;
    messageCount?: number;
}

export default class ChatListItem extends Block<ChatListItemProps> {
  constructor (props: ChatListItemProps) {
    super({
      ...props
    })
  }

  render (): string {
    return `
        <div class="chatListItem" ${this.props.active ? 'active' : ''}>
            <div class="chatListItem__wrapper">
                <div class="chatListItem__img"></div>
                <div class="chatListItem__body">
                    <div class="chatListItem__info">
                        <div class="chatName">
                            <h4>{{name}}</h4>
                        </div>
                        <div class="chatListItem__messageTime">{{time}}</div>
                    </div>
                    <div class="chatListItem__meta">
                        <div class="lastMessage">
                            <p>
                                ${this.props.my ? "<span>Вы:</span>" : ""}
                                {{message}}
                            </p>
                        </div>
                        <div class="chatListItem__messageCount" ${ this.props.messageCount ? "show" : ""}>{{messageCount}}</div>
                    </div>
                </div>
            </div>
        </div>        
        `
  }
}
