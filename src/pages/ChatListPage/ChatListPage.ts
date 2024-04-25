import { Button, ChatList, MessageInput, Search } from '../../components/index.ts'
import { type ChatListProps } from '../../components/ChatList/ChatList.ts'
import { Block } from '../../core/index.ts'
import { logFields } from '../../utils/LogFormFields/LogFormFields.ts'
import img from '../../assets/images/chatMessage.jpg'

export default class ChatListPage extends Block<Record<string, unknown>> {
  constructor(props: ChatListProps) {
    super({
      chatList: new ChatList(props),
      profileButton: new Button({
        type: 'link',
        className: 'profileButton',
        label: 'Профиль'
      }),
      search: new Search({})
    })
  }
  init() {
    const messageInput = new MessageInput({
      name: 'message',
      className: 'chatListPage__messageInput'    
    })

    const sendButton = new Button({
      type: 'round',
      label: '->',
      events: {
        click: [logFields]
      }
    })

    this.children = {
      ...this.children,
      messageInput,
      sendButton
    }
  }

  render(): string {
    return `
        <main class="page chatListPage">
            <div class="chatListPage__sideBar">
                <div class="chatListPage__profileButton">
                    {{{ profileButton }}}
                </div>
                <div class="chatListPage__search">
                     {{{search}}} 
                </div>
                <div class="chatListPage__chatList">
                    {{{ chatList }}}
                </div>
            </div>
            <div class="chatListPage__messageArea">
                    ${this.props.noMessage ? `<p class="infoMessage">Выберите чат, чтобы отправить сообщение</p>` 
                    : 
                    `
                    <div class="chatListPage__chatInfo">
                    </div>
                    <ul class="messagesList">
                        <li class="messagesList__item date">
                            <div class="date">19 июня</div>
                        </li>
                        <li class="messagesList__item text">
                            <div class="message">
                                <p class="message_text">
                                    Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

                                    Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
                                </p>
                            </div>
                        </li>
                        <li class="messagesList__item img">
                            <div class="message">
                                <img class="message_img" src="${img}" />
                            </div>
                        </li>
                        <li class="messagesList__item text self">
                            <div class="message myMessage">
                                <p class="message_text">
                                    Круто!
                                </p>
                            </div>
                        </li>
                    </ul>
                    <form class="chatListPage__sendForm">
                        {{{messageInput}}}
                        {{{sendButton}}}
                    </form>
                    `}
            </div>
        </main>
        `
  }
}
