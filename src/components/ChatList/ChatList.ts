import Block from "../../core/Block"
import { ChatListItem } from "../ChatListItem"


export default class ChatList extends Block {
    constructor(props) {
        const chatList = props.chatItem.reduce((components, data) => {
            const component = new ChatListItem(data)
            components[component._id] = component
            return components
        }, {})

        super({
            ...props,
            chatListItemsKeys: Object.keys(chatList),
            ...chatList,
        })
    }

    render(): string {
        return `
            <div class="chatList">
                ${this.props.chatListItemsKeys.map((key) => `{{{ ${key} }}}`).join(' ')}
            </div>
        `
    }
}
