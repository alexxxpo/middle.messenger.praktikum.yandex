import { Button, Input } from '../../components/index.ts'
import Router from '../../core/Router.ts'
import { Block } from '../../core/index.ts'
import { logFields, getModel } from '../../utils/LogFormFields/index.ts'
import { InputValidation, conditions } from '../../utils/validations/index.ts'
import { create, me } from '../../services/Auth.service.ts'
import { type CreateUser } from '../../types/types.ts'
import { Routes } from '../../main.ts'
import { type MapStateToProps, connect } from '../../utils/connect.ts'

const router = Router

type RegType = Record<string, Input | Button>

class Registration extends Block<RegType> {
  constructor (props = {}) {
    super({
      ...props
    })
  }

  init () {
    console.log('init chatListPage')
    const getUserInfo = async () => {
      if (this.props.currentUser === null) await me() // Если нет данных о пользователе, то делаем запрос
      if (this.props.currentUser !== null) router.go(Routes.Chats) // Если данные есть, то переходим в чаты
    }
    getUserInfo()

    // Handlers
    const onChangeInput = InputValidation.bind(this)
    const toLoginPage = () => {
      router.go(Routes.Login)
    }

    // Children
    const regEmail = new Input({
      label: 'Почта',
      type: 'email',
      name: 'email',
      events: {
        blur: [e => { onChangeInput(e, this.children.regEmail as Input, 'Некорректный формат email (example@example.com)', ...conditions.email) }]
      }
    })

    const regLogin = new Input({
      label: 'Введите логин',
      name: 'login',
      events: {
        blur: [e => { onChangeInput(e, this.children.regLogin as Input, 'Может содеражать цифры, но не состоять из них', ...conditions.login) }]
      }
    })

    const regFirstName = new Input({
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      events: {
        blur: [e => { onChangeInput(e, this.children.regFirstName as Input, 'Имя должно начинаться с заглавной буквы', ...conditions.names) }]
      }
    })

    const regSecondName = new Input({
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      events: {
        blur: [e => { onChangeInput(e, this.children.regSecondName as Input, 'Фамилия должна начинаться с заглавной буквы', ...conditions.names) }]
      }
    })

    const regPhone = new Input({
      label: 'Телефон',
      type: 'tel',
      name: 'phone',
      events: {
        blur: [e => { onChangeInput(e, this.children.regPhone as Input, 'Телефон может содержать только цифры и может начинаться с +', ...conditions.phone) }]
      }
    })

    const regPass = new Input({
      label: 'Введите пароль',
      name: 'password',
      type: 'password',
      events: {
        blur: [e => { onChangeInput(e, this.children.regPass as Input, 'Пароль должен содержать строчные и заглавные буквы и цифры', ...conditions.password) }]
      }
    })

    const regPassAgain = new Input({
      label: 'Пароль (еще раз)',
      name: 'password',
      type: 'password',
      events: {
        blur: [e => { onChangeInput(e, this.children.regPassAgain as Input, 'Пароль должен содержать строчные и заглавные буквы и цифры', ...conditions.password) }]
      }
    })

    const buttonLogin = new Button({
      type: 'link',
      label: 'Войти',
      events: {
        click: [toLoginPage]
      }
    })

    const buttonReg = new Button({
      type: 'primary',
      label: 'Зарегистрироваться',
      events: {
        click: [logFields, async e => { await create(getModel(e) as CreateUser) }]
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

  render (): string {
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

const mapStateToProps: MapStateToProps = ({ currentUser }) => ({ currentUser })

export default connect(mapStateToProps)(Registration)
