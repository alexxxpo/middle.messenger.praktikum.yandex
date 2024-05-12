import { Block } from "../../core";

class ButtonAddUser extends Block<Record<string, string>> {
    constructor(props: Record<string, string>) {
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
