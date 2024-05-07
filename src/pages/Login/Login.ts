import { Button, Input } from '../../components/index.ts'
import Router from '../../core/Router.ts'
import { Block } from '../../core/index.ts'
import { logFields, getModel } from '../../utils/LogFormFields/index.ts'
import { InputValidation, conditions } from '../../utils/validations/index.ts'
import { login, me } from '../../services/Auth.service.ts'

type LoginType = Record<string, Input | Button>

export default class LoginPage extends Block<LoginType> {
  constructor(props = {}) {
    super({
      ...props
    })
  }

  

  componentDidMount(oldProps: any): void {
    me()
  }
  
  init(): void {
    const onChangeInput = InputValidation.bind(this)
    const toRegPage = () => {
      Router.go('/sign-up')
    }

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
    const buttonLogin = new Button({ label: 'Авторизироваться', type: 'primary', events: { click: [logFields, e => login(getModel(e))] } })
    const buttonReg = new Button({ label: 'Нет аккаунта?', type: 'link', events: { click: [toRegPage] } })

    this.children = {
      ...this.children,
      inputLogin,
      inputPass,
      buttonLogin,
      buttonReg
    }

  }

  render(): string {
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
