import { Block } from "../../core";
import { connect } from "../../utils/connect";
import { ButtonShow } from "../ButtonShow";

class TopPanel extends Block<Record<string, unknown>> {
    constructor(props: Record<string, unknown>) {
        super({...props})        
    }
    init() {
        const buttonShow = new ButtonShow({})
        this.children = {
            ...this.children,
            buttonShow
        }
    }

    render(): string {
        return `
            <div class="topPanel {{className}}">
                <img src="{{avatar}} ${this.props.activeChat?.avatar || ''}"/>
                <h2 class="topPanel__title">{{title}} ${this.props.activeChat?.title || ''}</h2>
                {{{buttonShow}}}
            </div>
        `
    }
}

const mapStateToProps = ({isLoading, activeChat}) => ({isLoading, activeChat})

export default connect(mapStateToProps)(TopPanel)
