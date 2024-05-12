import { Block } from "../../core";
import { ButtonAddUser } from "../ButtonAddUser";
import { ButtonDeleteUser } from "../ButtonDeleteUser";

class ChatsControlButtons extends Block<Record<string, string>> {
    constructor(props: Record<string, string>) {
        super({
            ...props
        })
    }

    init() {
        
        const buttonAddUser = new ButtonAddUser({
            title: 'Добавить пользователя'
        })
        const buttonDeleteUser = new ButtonDeleteUser({
            title: 'Удалить пользователя'
        })
        this.children = {
            ...this.children,
            buttonAddUser,
            buttonDeleteUser
        }
    }

    render(): string {
        return `
            <div class="chatsControlButtons {{className}}">
                {{{buttonAddUser}}}
                {{{buttonDeleteUser}}}
            </div>
        `
    }
}

export default ChatsControlButtons
