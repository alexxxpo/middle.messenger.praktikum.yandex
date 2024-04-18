import { Button, ChatList, Search } from "../../components";
import Block from "../../core/Block";



export default class ChatListPage extends Block{
    constructor(props) {
        
        super({
            ...props,
            chatList: new ChatList(props),
            profileButton: new Button({
                type: "link",
                class: "profileButton",
                label: "Профиль"
            }),
            search: new Search({})
        })
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
                <p class="infoMessage">Выберите чат, чтобы отправить сообщение</p>
            </div>
        </main>
        `
    }
}