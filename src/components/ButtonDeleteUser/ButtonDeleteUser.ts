import { Block } from "../../core";
import { EventsType } from "../../types/types";

type ButtonDeleteUserProps = {
    events?: EventsType;
    title?: string;
}

class ButtonDeleteUser extends Block<ButtonDeleteUserProps> {
    constructor(props: ButtonDeleteUserProps) {
        super({
            ...props
        })
    }

    render(): string {
        return `
            <div class="buttonDeleteUser__container">
                <div class="buttonDeleteUser {{className}}">
                    <span class="buttonDeleteUser__cross">
                        <span class="cross_1"></span>
                        <span class="cross_2"></span>
                    </span>
                </div>
                {{title}}
            </div>
        `
    }
}

export default ButtonDeleteUser
