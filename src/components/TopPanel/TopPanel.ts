import { Block } from "../../core";
import { connect } from "../../utils/connect";

class TopPanel extends Block<Record<string, unknown>> {
    constructor(props: Record<string, unknown>) {
        super({...props})
    }

    render(): string {
        return `
            <div class="topPanel {{className}}"
                <img src="{{avatar}} ${this.props.activeChat?.avatar || ''}"/>
                <h2 class="topPanel__title">{{title}} ${this.props.activeChat?.title || ''}</h2>
            </div>
        `
    }
}

const mapStateToProps = ({isLoading, activeChat}) => ({isLoading, activeChat})

export default connect(mapStateToProps)(TopPanel)
