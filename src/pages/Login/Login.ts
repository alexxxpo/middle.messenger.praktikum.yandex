import { Button, Input } from '../../components'
import Block from '../../core/Block'
import { logFields } from '../../utils/LogFormFields'
import { InputValidation, conditions } from '../../utils/validations'

type LoginType = Record<string, Input | Button >

export default class LoginPage extends Block<LoginType> {
  constructor (props = {}) {
    super({
      ...props
    })
  }

  init (): void {
    const onChangeInput = InputValidation.bind(this)

    const inputLogin = new Input({
      label: 'Введите логин',
      name: 'login',
      events: { blur: [e => { onChangeInput(e, this.children.inputLogin as Input, 'Некорректное значение', ...conditions.login) }] }
    })
    const inputPass = new Input({
      label: 'Введите пароль',
      name: 'password',
      events: { blur: [e => { onChangeInput(e, this.children.inputPass as Input, 'Некорректное значение', ...conditions.password) }] }
    })
    const buttonLogin = new Button({ label: 'Авторизироваться', type: 'primary', events: { click: [logFields] } })
    const buttonReg = new Button({ label: 'Нет аккаунта?', type: 'link' })

    this.children = {
      ...this.children,
      inputLogin,
      inputPass,
      buttonLogin,
      buttonReg
    }
  }

  render (): string {
    return `
            <div class="page login_page">
                <div class="form__container">
            
                    <form class="form form_login">
                        <h1 class="form__title">Вход</h1>
            
                        <div class="form__inputs">
                            {{{ inputLogin }}}
                            {{{ inputPass }}}
                        </div>
            
                        <div class="form__buttons">
                            {{{ buttonLogin }}}
                            {{{ buttonReg }}}
                        </div>
                    </form>
                </div>
            </div>
        `
  }
}
