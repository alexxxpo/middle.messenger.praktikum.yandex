import Block from "../../core/Block";
import { Button } from "../../components";



export default class Popup extends Block {
    constructor(props) {
        super({
            ...props,
            buttonChange: new Button({
                type: "primary",
                label: "Поменять"
            })
        })
    }

    render(): string {
        return `
        <div class="popup">
            <form class="popup__form">
                <h3 class="popup__form_title">Загрузите файл {{title}}</h3>
                <div class="popup__form_inner">
                    <label><input type="file" name={{name}} id=""></label>
                </div>
                <div class="popup__form_button">
                    {{{ buttonChange }}}
                </div>
                <p class="popup__form_errorMessage">{{errorMessage}}</p>
            </form>
        </div>
        `
    }
}