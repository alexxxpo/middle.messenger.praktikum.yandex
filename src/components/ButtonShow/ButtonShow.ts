import { Block } from "../../core";

class ButtonShow extends Block<Record<string, string>> {
    constructor(props: Record<string, string>) {
        super({
            ...props
        })
    }

    render(): string {
        return `
            <div class="buttonShow {{className}}">
                <span class="buttonShow__dot"></span>
                <span class="buttonShow__dot"></span>
                <span class="buttonShow__dot"></span>            
            </div>
        `
    }
}

export default ButtonShow
