import { Block } from "../../core";
import { connect } from "../../utils/connect.ts";

class ButtonShow extends Block<Record<string, string>> {
    constructor(props: Record<string, string>) {
        super({
            ...props
        })
    }

    render(): string {
        return `
            <div class="buttonShow">
                <span class="buttonShow__dot"></span>
                <span class="buttonShow__dot"></span>
                <span class="buttonShow__dot"></span>            
            </div>
        `
    }
}

export default connect(() => {})(ButtonShow)
