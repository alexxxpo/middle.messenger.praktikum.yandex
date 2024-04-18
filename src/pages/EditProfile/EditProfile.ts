import { BackButton, Button, Input, Popup } from "../../components";
import Block from "../../core/Block";

const fields = [
    {
        label: 'Почта',
        type: 'text',
        value: 'pochta@yandex.ru',
        name: 'email'
    },
    {
        label: 'Логин',
        type: 'text',
        value: 'ivanivanov',
        name: 'login'
    },
    {
        label: 'Имя',
        type: 'text',
        value: 'Иван',
        name: 'first_name'
    },
    {
        label: 'Фамилия',
        type: 'text',
        value: 'Иванов',
        name: 'second_name'
    },
    {
        label: 'Имя в чате',
        type: 'text',
        value: 'Иван',
        name: 'display_name'
    },
    {
        label: 'Телефон',
        type: 'text',
        value: '+7(909)9673030',
        name: 'phone'
    },
]


export default class EditProfile extends Block {
    constructor(props) {
        const inputs = fields.reduce((acc, data) => {
            const input = new Input(data)
            acc[input._id] = input
            return acc
        }, {})
        console.log(inputs);

        super({
            ...props,
            inputsKeys: Object.keys(inputs),
            ...inputs,
            buttonSave: new Button({
                type: "primary",
                label: "Сохранить"
            }),
            buttonBack: new BackButton({}),
            popupWindow: new Popup({}),

        })
    }
    render(): string {
        return `
        <main  class="page editProfilePage">
            <div class="editProfilePage__userInfo">
                
                {{{ buttonBack }}}
                
                PImage class="editProfilePage__PImage"

                <h2>Иван</h2>
                <div class="editProfilePage__inputs">
                    ${this.props.inputsKeys.map((key) => `{{{ ${key} }}}`).join(' ')}
                </div>
            </div>
            <div class="editProfilePage__buttons">
                <div class="editProfilePage__buttonField">
                    {{{ buttonSave }}}
                </div>
            </div>
            ${this.props.popup ? '{{{ popupWindow }}}' : ''}
        </main>
        `
    }
}