import { Block } from "../../core";
import { addUserToChat, deleteChat } from "../../services/Chats.service";
import { searchUsersByLogin } from "../../services/Users.service";
import { ChatsResponse, CreateChatResponse, UserResponse } from "../../types/types";
import { getModel } from "../../utils/LogFormFields";
import { MapStateToProps, connect } from "../../utils/connect";
import { ButtonAddUser } from "../ButtonAddUser";
import { ButtonDeleteUser } from "../ButtonDeleteUser";
import { PopupAdd } from "../PopupAdd";

type ChatsControlButtonsProps = {
	usersSearch: UserResponse[];
	activeChat: ChatsResponse | null;
	isLoading: boolean;
	showPopup: boolean;
	selectedUser: UserResponse;
}

class ChatsControlButtons extends Block<ChatsControlButtonsProps> {
	showPopup: boolean

	constructor(props: ChatsControlButtonsProps) {
		super({
			...props,
		})
		this.showPopup = false
	}

	init() {
		// Handlers
		const closePopup = (e: Event) => {
			e.stopPropagation()
			if (e.target === this.children.popupAddUser.getElement()) {
				this.setProps({ showPopup: false })
			}
		}
		const closePopupBind = closePopup.bind(this)

		const searchUser = (e: Event) => {
			searchUsersByLogin(getModel(e))
		}

		const addUser = async (e: Event) => {
			e.preventDefault()
			const model = getModel(e)
			const selectedUser = this.props.usersSearch.filter(i => i.login === model.login)[0] || {}
			this.setProps({
				selectedUser
			})
			if (this.props.selectedUser.id !== undefined) {
				const model = {
					users: [
						this.props.selectedUser?.id
					],
					chatId: this.props.activeChat?.id
				}
				if(model.chatId !== undefined) {
					await addUserToChat({
						users: [
							this.props.selectedUser?.id
						],
						chatId: this.props.activeChat?.id || 0
					})
				}
				this.setProps({ showPopup: false })
			}

		}

		const selectUser = (e: Event) => {
			const target = e.target as HTMLElement
			if (target.children.length === 0) {
				const value = target.innerText
				const popup = this.children.popupAddUser
				popup.children.input.setProps({
					value
				})
			}

		}

		const deleteChatHandler = () => {
			if(this.props.activeChat !== null) {
				const model: CreateChatResponse = {chatId: this.props.activeChat.id}
				deleteChat(model)
			}
		}
		const deleteChatHandlerBind = deleteChatHandler.bind(this)

		// Children        
		const buttonAddUser = new ButtonAddUser({
			title: 'Добавить пользователя',
			events: {
				click: [
					() => {
						this.setProps({ showPopup: true })
					}
				]
			}
		})

		const popupAddUser = new PopupAdd({
			title: 'Добавить пользователя',
			name: 'login',
			clickButton: addUser,
			changeInput: searchUser,
			listClick: selectUser,
			events: {
				click: [
					closePopupBind
				]
			},
		})

		const buttonDeleteUser = new ButtonDeleteUser({
			title: 'Удалить пользователя'
		})

		const buttonDeleteChat = new ButtonDeleteUser({
			title: 'Удалить чат',
			events: {
				click: [
					deleteChatHandlerBind
				]
			}
		})

		this.children = {
			...this.children,
			buttonAddUser,
			buttonDeleteUser,
			popupAddUser,
			buttonDeleteChat
		}
	}

	render(): string {
		return `
            <div class="chatsControlButtons {{className}}">
                {{{buttonAddUser}}}
                {{{buttonDeleteUser}}}
				{{{buttonDeleteChat}}}
                {{#if showPopup}}
                    {{{popupAddUser}}}
                {{/if}}
            </div>
        `
	}
}

const mapStateToProps: MapStateToProps = ({ activeChat, usersSearch, isLoading }) => ({ activeChat, usersSearch, isLoading })

export default connect(mapStateToProps)(ChatsControlButtons)
