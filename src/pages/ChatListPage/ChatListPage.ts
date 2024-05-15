import { Button, ChatList, ChatListItem, MessageInput, PopupAdd, Search, TopPanel } from '../../components/index.ts'
import { Block } from '../../core/index.ts'
import { getModel, logFields } from '../../utils/LogFormFields/LogFormFields.ts'
import { me } from '../../services/Auth.service.ts'
import { createChat, loadChats } from '../../services/Chats.service.ts'
import img from '../../assets/images/chatMessage.jpg'
import { connect } from '../../utils/connect.ts'
import { Routes } from '../../main.ts'
import { IState } from '../../core/Store.ts'
import Router from '../../core/Router.ts'
import { ChatsResponse, CreateChat } from '../../types/types.ts'

const router = Router

interface ChatListPageType extends Record<string, unknown> {
  chats: ChatsResponse[]
}

class ChatListPage extends Block<ChatListPageType> {

  init() {
    const getUserInfo = async () => {
      if (this.props.currentUser === null) await me() // Если нет данных о пользователе, то делаем запрос
      if (this.props.currentUser !== null) await loadChats() // Если данные есть, то загружаем данные чатов
    }
    getUserInfo()

    // Handlers
    const addChat = (e: Event) => {
      createChat(getModel(e) as CreateChat)
    }
    
    // Children

    const popupAddChat = new PopupAdd({
      title: 'Добавить чат',
      clickButton: addChat,
      name: 'title'
    })

    const chatList = new ChatList({ 
      chats: this.mapChatsToComponents(this.props.chats) || [],  
      showEmpty: this.props.chats
    })

    const profileButton = new Button({
      type: 'link',
      className: 'profileButton',
      label: 'Профиль',
      events: {
        click: [() => {router.go(Routes.Profile)}]
      }
    })

    const search = new Search({})

    const topPanel = new TopPanel({title: "Active chat"})

    const messageInput = new MessageInput({
      name: 'message',
      className: 'chatListPage__messageInput',
      type: 'text'
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
      topPanel,
      popupAddChat,
    }
  }

  componentDidUpdate(oldProps: ChatListPageType, newProps: ChatListPageType) {
    if (oldProps.chats !== newProps.chats) {
      this.children.chatList.setProps({
        chats: this.mapChatsToComponents(newProps.chats) || [],
        showEmpty: newProps.chats.length === 0
      })
    }
    return true
  }

  mapChatsToComponents(chats: ChatsResponse[]) {
    return chats?.map((chat) => new ChatListItem({ ...chat }))
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
                    ${!this.props.activeChat ? `<p class="infoMessage">Выберите чат, чтобы отправить сообщение</p>`
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

const mapStateToProps: (state: IState) => IState = ({ chats, currentUser, activeChat }) => ({ chats, currentUser, activeChat })

export default connect(mapStateToProps)(ChatListPage)
