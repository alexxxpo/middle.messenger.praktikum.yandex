import { Button, Input } from '../../components'
import Block from '../../core/Block'

type RegType = Record<string, Input | Button>

export default class Registration extends Block<RegType> {
  constructor (props = {}) {
    super({
      ...props,
      regEmail: new Input({
        label: 'Почта',
        type: 'email',
        name: 'email'
      }),

      regLogin: new Input({
        label: 'Введите логин',
        name: 'login'
      }),

      regFirstName: new Input({
        label: 'Имя', type: 'text', name: 'first_name'
      }),

      regSecondName: new Input({
        label: 'Фамилия', type: 'text', name: 'second_name'
      }),

      regPhone: new Input({
        label: 'Телефон', type: 'tel', name: 'phone'
      }),

      regPass: new Input({
        label: 'Введите пароль',
        name: 'password'
      }),

      regPassAgain: new Input({
        label: 'Пароль еще раз',
        name: 'password'
      }),

      buttonLogin: new Button({
        type: 'link',
        label: 'Войти'
      }),
      buttonReg: new Button({
        type: 'primary',
        label: 'Зарегистрироваться'
      })

    })
  }

  render (): string {
    return `
        <div class="page registration_page">
            <div class="form__container">
        
                <form class="form form_registration">
                    <h1 class="form__title">Регистрация</h1>
        
                    <div class="form__inputs">
                        {{{ regLogin }}}
                        {{{ regFirstName }}}
                        {{{ regSecondName }}}
                        {{{ regPhone }}}
                        {{{ regPass }}}
                        {{{ regPassAgain }}}
                    </div>
        
                    <div class="form__buttons">
                        {{{ buttonReg }}}
                        {{{ buttonLogin }}}
                    </div>
                </form>
            </div>
        </div>
        `
  }
}
