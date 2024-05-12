import { Block } from "../../core";
import { connect } from "../../utils/connect";
import { ButtonAddUser } from "../ButtonAddUser";
import { ButtonDeleteUser } from "../ButtonDeleteUser";
import { ButtonShow } from "../ButtonShow";
import { ChatsControlButtons } from "../ChatsControlButtons";

class TopPanel extends Block<Record<string, unknown>> {
    constructor(props: Record<string, unknown>) {
        super({...props})        
    }
    init() {
        const buttonShow = new ButtonShow({
            className: 'topPanel__buttonShow'
        })
        const buttonAddUser = new ButtonAddUser({
            
        })
        const buttonDeleteUser = new ButtonDeleteUser({
            
        })
        const сhatsControlButtons = new ChatsControlButtons({
            
        })
        this.children = {
            ...this.children,
            buttonShow,
            buttonAddUser,
            buttonDeleteUser,
            сhatsControlButtons
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

                    <h2 class="topPanel__title">{{title}} ${this.props.activeChat?.title || ''}</h2>
                </div>

                {{{buttonShow}}}

                {{{сhatsControlButtons}}}
            </div>
        `
    }
}

const mapStateToProps = ({isLoading, activeChat}) => ({isLoading, activeChat})

export default connect(mapStateToProps)(TopPanel)
