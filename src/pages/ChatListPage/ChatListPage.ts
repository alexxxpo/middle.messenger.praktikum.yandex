import { Button, ChatList, ChatListItem, MessageInput, Search, TopPanel } from '../../components/index.ts'
import { Block } from '../../core/index.ts'
import { logFields } from '../../utils/LogFormFields/LogFormFields.ts'
import { me } from '../../services/Auth.service.ts'
import { loadChats } from '../../services/Chats.service.ts'
import { logout } from '../../services/Auth.service.ts'
import img from '../../assets/images/chatMessage.jpg'
import { connect } from '../../utils/connect.ts'
import { Routes } from '../../main.ts'

class ChatListPage extends Block<Record<string, unknown>> {

  componentDidMount() {
    me()
    loadChats()
    console.log('cdm page')

  }

  init() {
    console.log('init page')

    const chatList = new ChatList({ chats: this.mapChatsToComponents(this.props.chats) || [],  showEmpty: this.props.chats.length === 0})

    const profileButton = new Button({
      type: 'link',
      className: 'profileButton',
      label: 'Профиль',
      events: {
        click: [() => {window.router.go(Routes.Profile)}]
      }
    })

    const search = new Search({})

    const topPanel = new TopPanel({title: "Active chat"})

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
      sendButton,
      chatList,
      profileButton,
      search,
      topPanel
    }
  }

  componentDidUpdate(oldProps, newProps) {
    if (oldProps.chats !== newProps.chats) {
      console.log('cdu page')
      this.children.chatList.setProps({
        chats: this.mapChatsToComponents(newProps.chats) || [],
        showEmpty: newProps.chats.length === 0
      })
    }
  }

  mapChatsToComponents(chats) {
    return chats?.map((chat) => new ChatListItem({ ...chat }))
  }



  render(): string {
    console.log(this)
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
                      {{{topPanel}}}
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
                                <img class="message_img" src="${img}" alt="Изображение сообщения" />
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

const mapStateToProps = ({ chats, currentUser }) => ({ chats, currentUser })

export default connect(mapStateToProps)(ChatListPage)
