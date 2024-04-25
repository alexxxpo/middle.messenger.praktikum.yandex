import { Button, Input } from '../../components/index.ts'
import { Block } from '../../core/index.ts'
import { logFields } from '../../utils/LogFormFields/index.ts'
import { InputValidation, conditions } from '../../utils/validations/index.ts'

type RegType = Record<string, Input | Button>

export default class Registration extends Block<RegType> {
  constructor(props = {}) {
    super({
      ...props
    })
  }

  init(): void {
    const onChangeInput = InputValidation.bind(this)

    const regEmail = new Input({
      label: 'Почта',
      type: 'email',
      name: 'email',
      events: {
        blur: [e => { onChangeInput(e, this.children.regEmail as Input, 'Некорректное значение', ...conditions.email) }]
      }
    })

    const regLogin = new Input({
      label: 'Введите логин',
      name: 'login',
      events: {
        blur: [e => { onChangeInput(e, this.children.regLogin as Input, 'Некорректное значение', ...conditions.login) }]
      }
    })

    const regFirstName = new Input({
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      events: {
        blur: [e => { onChangeInput(e, this.children.regFirstName as Input, 'Некорректное значение', ...conditions.names) }]
      }
    })

    const regSecondName = new Input({
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      events: {
        blur: [e => { onChangeInput(e, this.children.regSecondName as Input, 'Некорректное значение', ...conditions.names) }]
      }
    })

    const regPhone = new Input({
      label: 'Телефон',
      type: 'tel',
      name: 'phone',
      events: {
        blur: [e => { onChangeInput(e, this.children.regPhone as Input, 'Неверный формат', ...conditions.phone) }]
      }
    })

    const regPass = new Input({
      label: 'Введите пароль',
      name: 'password',
      type: 'password',
      events: {
        blur: [e => { onChangeInput(e, this.children.regPass as Input, 'Некорректное значение', ...conditions.password) }]
      }
    })

    const regPassAgain = new Input({
      label: 'Пароль (еще раз)',
      name: 'password',
      type: 'password',
      events: {
        blur: [e => { onChangeInput(e, this.children.regPassAgain as Input, 'Некорректное значение', ...conditions.password) }]
      }
    })

    const buttonLogin = new Button({
      type: 'link',
      label: 'Войти'
    })

    const buttonReg = new Button({
      type: 'primary',
      label: 'Зарегистрироваться',
      events: {
        click: [logFields]
      }
    })

    this.children = {
      ...this.children,
      regEmail,
      regLogin,
      regFirstName,
      regSecondName,
      regPhone,
      regPass,
      regPassAgain,
      buttonLogin,
      buttonReg
    }
  }

  render(): string {
    return `
        <div class="page registration_page">
            <div class="form__container">
        
                <form class="form form_registration">
                    <h1 class="form__title">Регистрация</h1>
        
                    <div class="form__inputs">
                        {{{ regEmail }}}
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
