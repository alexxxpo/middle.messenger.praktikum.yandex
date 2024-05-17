import { Button, Input } from '../../components/index.ts'
import Router from '../../core/Router.ts'
import { Block } from '../../core/index.ts'
import { getModel } from '../../utils/LogFormFields/index.ts'
import { InputValidation, conditions } from '../../utils/validations/index.ts'
import { login, me, logout } from '../../services/Auth.service.ts'
import { MapStateToProps, connect } from '../../utils/connect.ts'
import { Routes } from '../../main.ts'
import { Login } from '../../types/types.ts'

const router = Router


class LoginPage extends Block {
  constructor(props = {}) {
    super({
      ...props
    })
  }

  init(): void {
		console.log('init loginPage');

    const getUserInfo = async () => {
      if (this.props.currentUser === null) await me()               // Если нет данных о пользователе, то делаем запрос
      if (this.props.currentUser !== null) router.go(Routes.Chats)  // Если данные есть, то переходим в чаты
    }
    getUserInfo()

    // Handlers
    const onChangeInput = InputValidation.bind(this)
    const toRegPage = () => {
      router.go('/sign-up')
    }

    // Children init
    const inputLogin = new Input({
      label: 'Введите логин',
      name: 'login',
      events: {
        blur: [
          e => { 
            onChangeInput(e, this.children.inputLogin, 'Некорректное значение', ...conditions.login) 
          },
        ]
      }
    })

    const inputPass = new Input({
      label: 'Введите пароль',
      name: 'password',
      events: { 
        blur: [
          e => { 
            onChangeInput(e, this.children.inputPass, 'Некорректное значение', ...conditions.password) 
          },
        ] 
      }
    })

    const buttonLogin = new Button({ 
      label: 'Авторизироваться', 
      type: 'primary', 
      events: { 
        click: [
          e => login(getModel(e) as Login)
        ] 
      } 
    })

    const buttonReg = new Button({ 
      label: 'Нет аккаунта?', 
      type: 'link', 
      events: { 
        click: [
          toRegPage
        ] 
      } 
    })

    const buttonOut = new Button({ 
      label: 'Выйти', 
      type: 'link', 
      events: { 
        click: [
          logout
        ] 
      } 
    })

    this.children = {
      ...this.children,
      inputLogin,
      inputPass,
      buttonLogin,
      buttonReg,
      buttonOut
    }

  }

  componentDidUpdate(oldProps: { [x: string]: any }, newProps: { [x: string]: any }): boolean {
    if(oldProps.currentUser !== newProps.currentUser && newProps.currentUser !== null) {
      router.go(Routes.Chats)
    }
    return true
  }

  render(): string {
    return `{{#if isLoading}}
                <h2>Загрузка данных</h2>
            {{else}}
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
                                {{{ buttonOut }}}
                            </div>
                        </form>
                    </div>
                </div>
            {{/if}}
        `
  }
}

const mapStateToProps: MapStateToProps = ({ isLoading, currentUser }) => ({ isLoading, currentUser })

export default connect(mapStateToProps)(LoginPage)
