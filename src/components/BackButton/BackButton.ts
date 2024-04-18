import Block from "../../core/Block";
import { Button } from "../../components";



export default class BackButton extends Block {
    constructor(props) {
        super({
            ...props,
            button: new Button({
                type: 'round',
                label: '<-'
            })
        })
    }
    render(): string {
        return `
        <div class="backButton {{class}}">
            {{{ button }}} 
        </div>
        `
    }
}