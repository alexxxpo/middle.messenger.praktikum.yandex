import { Block } from "../../core";
import { addUserToChat, createChat } from "../../services/Chats.service";
import { searchUsersByLogin } from "../../services/Users.service";
import { getModel } from "../../utils/LogFormFields";
import { connect } from "../../utils/connect";
import { ButtonAddUser } from "../ButtonAddUser";
import { ButtonDeleteUser } from "../ButtonDeleteUser";
import { PopupAdd } from "../PopupAdd";

class ChatsControlButtons extends Block<Record<string, string | boolean>> {
    constructor(props: Record<string, string>) {
        super({
            ...props,
            showPopup: false
        })
    }

    init() {
        // Handlers
        const closePopup = (e) => {
            e.stopPropagation()
            if (e.target === this.children.popupAddUser.getElement()) {
                this.setProps({ showPopup: false })
            }
        }
        const closePopupBind = closePopup.bind(this)

        const searchUser = (e) => {
            searchUsersByLogin(JSON.parse(getModel(e)))
        }

        const addUser = async (e) => {
            e.preventDefault()
            const model = JSON.parse(getModel(e))
            const selectedUser = this.props.usersSearch.filter(i => i.login === model.login)[0] || {}
            this.setProps({
                selectedUser
            })
            if(this.props.selectedUser.id !== undefined) {
                await addUserToChat({
                    "users": [
                        this.props.selectedUser?.id
                    ],
                    "chatId": this.props.activeChat?.id
                })

                this.setProps({ showPopup: false })
            }

        }

        const selectUser = (e) => {
            if (e.target.children.length === 0) {
                const value = e.target.innerText
                const popup = this.children.popupAddUser
                popup.children.input.setProps({
                    value
                })
            }

        }

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

        this.children = {
            ...this.children,
            buttonAddUser,
            buttonDeleteUser,
            popupAddUser
        }
    }

    render(): string {
        return `
            <div class="chatsControlButtons {{className}}">
                {{{buttonAddUser}}}
                {{{buttonDeleteUser}}}
                {{#if showPopup}}
                    {{{popupAddUser}}}
                {{/if}}
            </div>
        `
    }
}

const mapStateToProps = ({ activeChat, usersSearch, isLoading }) => ({ activeChat, usersSearch, isLoading })

export default connect(mapStateToProps)(ChatsControlButtons)
