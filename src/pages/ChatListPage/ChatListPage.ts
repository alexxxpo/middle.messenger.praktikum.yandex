import { Button, ButtonAddUser, ChatList, MessageInput, PopupAdd, Search, TopPanel, UsersList } from '../../components/index.ts'
import { Block } from '../../core/index.ts'
import { getModel, logFields } from '../../utils/LogFormFields/LogFormFields.ts'
import { me } from '../../services/Auth.service.ts'
import { createChat, loadChats } from '../../services/Chats.service.ts'
import img from '../../assets/images/chatMessage.jpg'
import { connect } from '../../utils/connect.ts'
import { Routes } from '../../main.ts'
import  { IState } from '../../core/Store.ts'
import Router from '../../core/Router.ts'
import { ChatsResponse, CreateChat, UserResponse } from '../../types/types.ts'

const router = Router

type ChatListPageProps = {
	chats: ChatsResponse[];
	currentUser: UserResponse;
	activeChat: ChatsResponse;
	showPopup: boolean;
	token?: string;
}

class ChatListPage extends Block<ChatListPageProps> {

	init() {
		console.log('init chatListPage');
		
		const getUserInfo = async () => {
			if (this.props.currentUser === null) await me() // Если нет данных о пользователе, то делаем запрос
			if (this.props.currentUser !== null) await loadChats() // Если данные есть, то загружаем данные чатов
		}
		getUserInfo()

		// Handlers
		const addChat = (e: Event) => {
			createChat(getModel(e) as CreateChat)
			this.setProps({showPopup: false})
		}

		const closePopup = (e: Event) => {
			e.stopPropagation()
			if (e.target === this.children.popupAddChat.getElement()) {
				this.setProps({ showPopup: false })
			}
		}
		const closePopupBind = closePopup.bind(this)

		// Children

		const popupAddChat = new PopupAdd({
			title: 'Добавить чат',
			clickButton: addChat,
			name: 'title',
			events: {
				click: [
					closePopupBind
				]
			}
		})

		const chatList = new ChatList({})

		const profileButton = new Button({
			type: 'link',
			className: 'profileButton',
			label: 'Профиль',
			events: {
				click: [() => { router.go(Routes.Profile) }]
			}
		})

		const search = new Search({})

		const topPanel = new TopPanel({ title: "Active chat" })

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

		const addChatButton = new ButtonAddUser({
			events: {
				click: [
					() => this.setProps({showPopup: true})
				]
			}
		})

		const usersList = new UsersList({
			className: 'messagesList__usersList'
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
			addChatButton,
			usersList
		}
	}

	componentDidUpdate(oldProps: ChatListPageProps, newProps: ChatListPageProps) {
		if(oldProps.currentUser !== newProps.currentUser) {
			return true
		}
		if(oldProps.showPopup !== newProps.showPopup) {
			return true
		}
		if(oldProps.activeChat !== newProps.activeChat) {
			return true
		}

		return false
	}

	render(): string {
		console.log('render chatlist page');
		
		return `
        <main class="page chatListPage">
            <div class="chatListPage__sideBar">
                <div class="chatListPage__profileButton">
					${this.props.currentUser?.display_name ? this.props.currentUser?.display_name : this.props.currentUser?.login }
                    {{{ profileButton }}}
                </div>
                <div class="chatListPage__search">
                     {{{search}}} 
                </div>
                <div class="chatListPage__chatList">
                    {{{ chatList }}}
                </div>
                <div class="chatListPage_addChatButton">
                    {{{addChatButton}}}
                </div>
            </div>
            <div class="chatListPage__messageArea">
                    ${!this.props.activeChat ? `<p class="infoMessage">Выберите чат, чтобы отправить сообщение</p>`
				:
				`
                    <div class="chatListPage__chatInfo">
                      {{{topPanel}}}
                    </div>
					<div class="messagesList__container">
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
						{{{usersList}}}
						</ul>
					</div>
                    <form class="chatListPage__sendForm">
                        {{{messageInput}}}
                        {{{sendButton}}}
                    </form>
                    `}
            </div>
			${this.props.showPopup === true ? `{{{popupAddChat}}}` : ``}
        </main>
        `
	}
}

const mapStateToProps: (state: IState) => IState = ({ currentUser, activeChat }) => ({ currentUser, activeChat })

export default connect(mapStateToProps)(ChatListPage)
