import { Block } from "../../core";

class ButtonDeleteUser extends Block<Record<string, string>> {
    constructor(props: Record<string, string>) {
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
