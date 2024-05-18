import { Button, ButtonAddUser, ChatList, MessageInput, PopupAdd, Search, TopPanel, UsersList } from '../../components/index.ts'
import { Block } from '../../core/index.ts'
import { getModel } from '../../utils/LogFormFields/LogFormFields.ts'
import { me } from '../../services/Auth.service.ts'
import { createChat, loadChats } from '../../services/Chats.service.ts'
import { MapStateToProps, connect } from '../../utils/connect.ts'
import { Routes } from '../../main.ts'
import Router from '../../core/Router.ts'
import { ChatMessageType, ChatsResponse, CreateChat, Message, SocketType, UserResponse } from '../../types/types.ts'

const router = Router

type ChatListPageProps = {
	chats: ChatsResponse[];
	currentUser: UserResponse;
	activeChat: ChatsResponse;
	showPopup: boolean;
	token?: string;
	sockets?: SocketType[];
	messages?: Message[];
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
			this.setProps({ showPopup: false })
		}

		const closePopup = (e: Event) => {
			e.stopPropagation()
			if (e.target === this.children.popupAddChat.getElement()) {
				this.setProps({ showPopup: false })
			}
		}
		const closePopupBind = closePopup.bind(this)

		const sendMessage = (e: Event) => {
			e.preventDefault()
			const model = getModel(e)
			const target = e.target as HTMLButtonElement
			const input = target.form?.children[0] as HTMLInputElement
			input.value = ''

			const message: ChatMessageType = {
				type: 'message',
				content: model.message
			}



			const socket = this.props.sockets?.filter(s => s.chatId === this.props.activeChat.id)[0]
			socket?.socket.send(message)
		}

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
				click: [sendMessage]
			}
		})

		const addChatButton = new ButtonAddUser({
			events: {
				click: [
					() => this.setProps({ showPopup: true })
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
		if (oldProps.currentUser !== newProps.currentUser) {
			this.children.chatList.setProps({
				currentUser: newProps.currentUser
			})
			return true
		}
		if (oldProps.showPopup !== newProps.showPopup) {
			return true
		}
		if (oldProps.activeChat !== newProps.activeChat) {
			return true
		}
		if (oldProps.messages?.length !== newProps.messages?.length) {

			return true
		}
		return false
	}


	render(): string {
		console.log('render chatlist page');

		const messages = this.props.messages?.map(message => {
			return `<li class="messagesList__item text ${message.user_id === this.props.currentUser.id ? 'self' : ''} " >
						<div class="message" >
							<p class="message_text " > ${message.content} ${message.time} </p>
						</div>
					</li>`
		}).join('')

		return `
        <main class="page chatListPage">
            <div class="chatListPage__sideBar">
                <div class="chatListPage__profileButton">
					${this.props.currentUser?.display_name ? this.props.currentUser?.display_name : this.props.currentUser?.login}
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
							${messages}
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

const mapStateToProps: MapStateToProps = ({ currentUser, activeChat, sockets, messages }) => ({ currentUser, activeChat, sockets, messages })

export default connect(mapStateToProps)(ChatListPage)
