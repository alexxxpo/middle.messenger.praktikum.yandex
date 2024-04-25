import { Button, ChatList, Search } from '../../components/index.ts'
import { type ChatListProps } from '../../components/ChatList/ChatList.ts'
import { Block } from '../../core/index.ts'

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
