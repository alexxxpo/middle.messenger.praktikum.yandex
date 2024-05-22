import { Block } from "../../core";
import { EventsType } from "../../types/types";

class ButtonShow extends Block<Record<string, string | EventsType>> {
    constructor(props: Record<string, string | EventsType>) {
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
