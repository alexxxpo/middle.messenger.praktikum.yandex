import { Block } from "../../core";
import { connect } from "../../utils/connect";
import { ChatControl } from "../ChatControl";

class TopPanel extends Block<Record<string, unknown>> {
    constructor(props: Record<string, unknown>) {
        super({...props})        
    }
    init() {
        const chatControl = new ChatControl({})
        this.children = {
            ...this.children,
            chatControl
        }
    }

    render(): string {
        return `
            <div class="topPanel {{className}}">
                <div class="topPanel__info">

                    <div class="topPanel__avatar_container">
                        <img 
                            class="topPanel__avatar" 
                            src="{{avatar}} ${this.props.activeChat?.avatar || ''} " 
                        />
                    </div>

                    <h2 class="topPanel__title">${this.props.activeChat?.title || ''}</h2>
                </div>
                {{{chatControl}}}

                {{{buttonShow}}}

                {{{сhatsControlButtons}}}
            </div>
        `
    }
}

const mapStateToProps = ({isLoading, activeChat}) => ({isLoading, activeChat})

export default connect(mapStateToProps)(TopPanel)
