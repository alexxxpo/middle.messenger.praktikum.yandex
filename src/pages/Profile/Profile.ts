import { BackButton, Button, PField, PImage, Popup } from "../../components";
import Block from "../../core/Block";



export default class Profile extends Block {
    constructor(props) {

        const pFields = props.fields.reduce((acc, data) => {
            const pField = new PField(data)
            acc[pField._id] = pField
            return acc
        }, {})

        super({

            ...props,

            pFieldsKeys: Object.keys(pFields),
            ...pFields,

            displayName: props.fields.filter(f => f.name === "display_name")[0].value,

            pImage: new PImage({
                className: "editProfilePage__PImage",
            }),

            buttonSave: new Button({
                type: 'primary',
                label: 'Сохранить'
            }),

            buttonChangePassword: new Button({
                type: 'link',
                label: 'Изменить пароль',
                className: "profilePage__Button",
            }),

            buttonChangeData: new Button({
                type: 'link',
                label: 'Изменить данные',
                className: "profilePage__Button"
            }),

            buttonExit: new Button({
                type: 'link',
                label: 'Выйти',
                className: "profilePage__Button profilePage__exitButton"
            }),

            buttonBack: new BackButton({}),

            popupWindow: new Popup({}),
        })
    }
    render(): string {
        return `
        <main class="page profilePage">
            <div class="profilePage__userInfo">
                {{{ buttonBack }}}
        
                {{{pImage}}}
                <h2>{{displayName}}</h2>
                ${this.props.pFieldsKeys.map((key: string) => `{{{ ${key} }}}`).join(' ')}
            </div>
            <div class="profilePage__buttons">
                <div class="pField profilePage__buttonField">
                    {{{ buttonChangeData }}}
                </div>
                <div class="pField profilePage__buttonField">
                    {{{ buttonChangePassword }}}
                </div>
                <div class="pField profilePage__buttonField">
                    {{{ buttonExit }}}
                </div>
            </div>
        </main>
        `
    }
}