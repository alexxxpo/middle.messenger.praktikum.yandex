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
    const onLoginBind = this.onLogin.bind(this);


    const inputLogin = new Input({ label: 'Введите логин', name: 'login', onBlur: onChangeLoginBind  });
    const inputPass = new Input({ label: 'Введите пароль', name: 'password' });
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
    console.log('asd');

    const inputValue = e.target.value;
    const regExp = /[a-zA-Z]+/
    if (regExp.test(inputValue) === false) {
      this.children.inputLogin.setProps({ error: true, errorText: 'some error' });
      return;
    } else {
      this.children.inputLogin.setProps({ error: false, errorText: null })
      console.log('valid value');
    }

    this.setProps({ login: inputValue })
  }

  onLogin() {
    console.log({
      login: this.login
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
