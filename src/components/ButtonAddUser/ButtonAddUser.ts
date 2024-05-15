import { Block } from "../../core";
import { EventsType } from "../../types/types";

type ButtonAddUserProps = {
    events?: EventsType;
    title?: string
}

class ButtonAddUser extends Block<ButtonAddUserProps> {
    constructor(props: ButtonAddUserProps) {
        super({
            ...props
        })
    }

    render(): string {
        return `
            <div class="buttonAddUser__container">
                <div class="buttonAddUser {{className}}">
                    <span class="buttonAddUser__cross">
                        <span class="cross_1"></span>
                        <span class="cross_2"></span>
                    </span>
                </div>
                {{title}}
            </div>
        `
    }
}

export default ButtonAddUser
