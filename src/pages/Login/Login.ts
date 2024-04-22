import { Button, Input } from '../../components'
import Block from '../../core/Block'

type LoginType = Record<string, Input | Button>

export default class LoginPage extends Block<LoginType> {
  constructor(props = {}) {
    super({
      ...props,
    })
  }

  init(): void {

    const onChangeLoginBind = this.onChangeLogin.bind(this);
    const onChangePasswordBind = this.onChangePassword.bind(this);
    const onLoginBind = this.onLogin.bind(this);


    const inputLogin = new Input({ label: 'Введите логин', name: 'login', events: { blur: onChangeLoginBind } });
    const inputPass = new Input({ label: 'Введите пароль', name: 'password', events: { blur: onChangePasswordBind } });
    const buttonLogin = new Button({ label: 'Авторизироваться', type: 'primary', events: { click: onLoginBind } });
    const buttonReg = new Button({ label: 'Нет аккаунта?', type: 'link' });

    this.children = {
      ...this.children,
      inputLogin,
      inputPass,
      buttonLogin,
      buttonReg
    }
  }


  onChangeLogin(e) {
    const inputValue = e.target.value;
    console.log(inputValue);

    const regExp = /[a-zA-Z]{3,}/
    if (regExp.test(inputValue) === false) {
      this.children.inputLogin.setProps({ error: true, errorText: 'Минимум 3 латинских буквы' });
      return;
    } else {
      this.children.inputLogin.setProps({ error: false, errorText: null })
    }

    this.setProps({ login: inputValue })
  }

  onChangePassword(e) {
    const inputValue = e.target.value;
    
    const condition1 = /[A-Z]/.test(inputValue)
    const condition2 = /[a-z]/.test(inputValue)
    const condition3 = /[0-9]/.test(inputValue)
    const condition4 = /[^.$]{8,40}/.test(inputValue)

    if (!condition1 || !condition2 || !condition3 || !condition4) {
      this.children.inputPass.setProps({ error: true, errorText: 'Пароль некорректен' });
      return;
    } else {
      this.children.inputPass.setProps({ error: false, errorText: null })
    }

    this.setProps({ password: inputValue })
  }

  onLogin() {
    console.log({
      login: this.props.login

    })

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
