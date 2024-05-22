import { Block } from "../../core";
import { ButtonShow } from "../ButtonShow";
import { ChatsControlButtons } from "../ChatsControlButtons";

class ChatControl extends Block<Record<string, string | boolean>> {

    constructor(props: Record<string, string | boolean>) {
        super({
            ...props
        })
        this.setProps({showPanel: false})
    }

    init() {
        const toggleBind = this._toggleControlPanel.bind(this)
        const buttonShow = new ButtonShow({
            className: 'chatControl__buttonShow',
            events: {
                click: [toggleBind]
            }
        })

        const chatsControlButtons = new ChatsControlButtons({
            className: 'chatControl__chatsControlButtons'
        })

        this.children = {
            ...this.children,
            buttonShow,
            chatsControlButtons
        }
    }

    private _toggleControlPanel() {
        this.setProps({showPanel: !this.props.showPanel})
    }

    render(): string {
        return `
            <div class="chatControl {{className}}">
                {{{buttonShow}}}
                ${this.props.showPanel ? 
                    `
                        {{{chatsControlButtons}}}
                    ` :
                    ''
                }
            </div>
        `
    }
}

export default ChatControl
