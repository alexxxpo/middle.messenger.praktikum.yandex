import { Button, Input } from '../../components'
import Block from '../../core/Block'

type LoginType = Record<string, Input | Button>

export default class LoginPage extends Block<LoginType> {
  constructor (props = {}) {
    super({
      ...props,
      inputLogin: new Input({
        label: 'Введите логин',
        name: 'login'
      }),
      inputPass: new Input({
        label: 'Введите пароль',
        name: 'password'
      }),
      buttonLogin: new Button({
        type: 'primary',
        label: 'Авторизоваться'
      }),
      buttonReg: new Button({
        type: 'link',
        label: 'Нет аккаунта?'
      })
    })
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
