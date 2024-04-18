import Block from "../../core/Block";
import { Button } from "../Button";



export default class ErrorComp extends Block {
    constructor(props) {
        super({
            ...props,
            button: new Button({
                type: "link",
                label: "Назад к чатам"
            })
        })
    }
    render(): string {
        return `
        <div class="errorComp">
            <h1 class="errorComp__errNo">{{errNo}}</h1>
            <h2 class="errorComp__message">{{message}}</h2>
            <div class="errorComp__returnButton">{{{ button }}}</div>
        </div>
        `
    }
}