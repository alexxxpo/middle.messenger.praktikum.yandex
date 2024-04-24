import { BackButton, Button, PField, PImage, Popup } from '../../components'
import { type PFieldProps } from '../../components/PField/PField'
import { type PopupProps } from '../../components/Popup/Popup'
import Block from '../../core/Block'
import { logFields } from '../../utils/LogFormFields'
import { InputValidation, conditions } from '../../utils/validations'

export interface ProfileProps {
  popupProps?: PopupProps
  fieldsProps?: PFieldProps[]
  editPassword?: boolean
  editData?: boolean
}

export interface ProfileType extends ProfileProps {

}

export default class Profile extends Block<ProfileType> {
  constructor (props: ProfileProps) {
    super({
      ...props,
      editPassword: false,
      editData: false
    })
  }

  init (): void {
    const onChangeDataBind = this.onChangeData.bind(this)
    const onSaveDataBind = this.onSaveData.bind(this)
    const onChangePasswordBind = this.onChangePassword.bind(this)

    const onChangeInput = InputValidation.bind(this)

    // profile
    const email = new PField({
      label: 'Почта',
      type: 'text',
      value: 'pochta@yandex.ru',
      disabled: true,
      name: 'email',
      events: {
        blur: [e => { onChangeInput(e, this.children.email, 'Некорректный email', ...conditions.email) }]
      }
    })
    const login = new PField({
      label: 'Логин',
      type: 'text',
      value: 'ivanivanov',
      disabled: true,
      name: 'login',
      events: {
        blur: [e => { onChangeInput(e, this.children.login, 'Некорректный логин', ...conditions.login) }]
      }
    })
    const firstName = new PField({
      label: 'Имя',
      type: 'text',
      value: 'Иван',
      disabled: true,
      name: 'first_name',
      events: {
        blur: [e => { onChangeInput(e, this.children.firstName, 'Некорректное имя', ...conditions.names) }]
      }
    })
    const secondName = new PField({
      label: 'Фамилия',
      type: 'text',
      value: 'Иванов',
      disabled: true,
      name: 'second_name',
      events: {
        blur: [e => { onChangeInput(e, this.children.secondName, 'Некорректная фамилия', ...conditions.names) }]
      }
    })
    const displayName = new PField({
      label: 'Имя в чате',
      type: 'text',
      value: 'Иван',
      disabled: true,
      name: 'display_name',
      events: {
        blur: [e => { onChangeInput(e, this.children.displayName, 'Некорректное имя', ...conditions.names) }]
      }
    })
    const phone = new PField({
      label: 'Телефон',
      type: 'text',
      value: '+7(909)9673030',
      disabled: true,
      name: 'phone',
      events: {
        blur: [e => { onChangeInput(e, this.children.phone, 'Некорректный номер', ...conditions.phone) }]
      }
    })

    // change password
    const oldPasword = new PField({
      label: 'Старый пароль',
      type: 'password',
      value: 'sdafadfa',
      name: 'old_password',
      events: {
        blur: [e => { onChangeInput(e, this.children.oldPasword, 'Некорректный формат', ...conditions.password) }]
      }
    })
    const newPassword = new PField({
      label: 'Новый пароль',
      type: 'password',
      value: 'ivanivanov',
      name: 'new_password',
      events: {
        blur: [e => { onChangeInput(e, this.children.newPassword, 'Некорректный формат', ...conditions.password) }]
      }
    })
    const newPasswordAgain = new PField({
      label: 'Повторите новый пароль',
      type: 'password',
      value: 'ivanivanov',
      name: 'new_password',
      events: {
        blur: [e => { onChangeInput(e, this.children.newPasswordAgain, 'Некорректный формат', ...conditions.password) }]
      }
    })

    // buttons profile
    const buttonChangePassword = new Button({
      type: 'link',
      label: 'Изменить пароль',
      className: 'profilePage__Button',
      events: {
        click: [onChangePasswordBind]
      }
    })

    const buttonChangeData = new Button({
      type: 'link',
      label: 'Изменить данные',
      className: 'profilePage__Button',
      events: {
        click: [onChangeDataBind]
      }
    })

    const buttonExit = new Button({
      type: 'link',
      label: 'Выйти',
      className: 'profilePage__Button profilePage__exitButton'
    })

    // button save
    const buttonSave = new Button({
      type: 'primary',
      label: 'Сохранить',
      events: {
        click: [logFields, onSaveDataBind]
      }
    })

    // common
    const backButton = new BackButton({})

    const pImage = new PImage({
      className: 'profilePage__PImage',
      events: {
        click: [e => { this.setProps({ popup: true }) }]
      }
    })

    const popup = new Popup({
      title: 'Загрузите файл',
      clickButton: e => { e.preventDefault(); this.setProps({ popup: false }) }
    })

    this.children = {
      ...this.children,
      email,
      login,
      firstName,
      secondName,
      phone,
      oldPasword,
      newPassword,
      newPasswordAgain,
      displayName,
      buttonChangePassword,
      buttonChangeData,
      buttonExit,
      buttonSave,
      backButton,
      pImage,
      popup
    }
  }

  onChangeData (): void {
    const names = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone']
    Object.values(this.children).forEach(child => {
      if (names.includes(child.props.name as string)) {
        child.setProps({
          disabled: false
        })
      }
    })
    this.setProps({
      editData: true,
      editPassword: false
    })
  }

  onChangePassword (): void {
    const names = ['old_password', 'new_password', 'new_password_again']
    Object.values(this.children).forEach(child => {
      if (names.includes(child.props.name as string)) {
        child.setProps({
          disabled: false
        })
      }
    })
    this.setProps({
      editData: false,
      editPassword: true
    })
  }

  onSaveData (): void {
    const names = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone', 'old_password', 'new_password', 'new_password_again']
    Object.values(this.children).forEach(child => {
      if (names.includes(child.props.name as string)) {
        child.setProps({
          disabled: true
        })
      }
    })
    this.setProps({
      editData: false,
      editPassword: false
    })
  }

  render (): string {
    return `
        <main class="page profilePage">
            <div class="profilePage__userInfo">
                {{{ backButton }}}
        
                {{{pImage}}}

                <form>
                    <h2 class="profilePage__title">${this.children.displayName.props.value as string}</h2>   

                    ${this.props.editPassword === false
                    ? `<div class="profilePage__fields">
                      {{{ email }}}
                      {{{ login }}}
                      {{{ firstName }}}
                      {{{ secondName }}}
                      {{{ displayName }}}
                      {{{ phone }}}
                    </div>`
: ''}

                    ${this.props.editPassword === true
                    ? `<div class="profilePage__fields">
                      {{{ oldPasword }}}
                      {{{ newPassword }}}
                      {{{ newPasswordAgain }}}
                    </div>`
: ''}

                    ${this.props.editPassword === true || this.props.editData === true
                    ? `<div class="profilePage__buttons">
                        <div class="pField profilePage__saveButtonField">
                            {{{buttonSave}}}
                        </div>
                    </div>`
                    : `<div class="profilePage__buttons">
                        <div class="pField profilePage__buttonField">
                            {{{ buttonChangeData }}}
                        </div>
                        <div class="pField profilePage__buttonField">
                            {{{ buttonChangePassword }}}
                        </div>
                        <div class="pField profilePage__buttonField">
                            {{{ buttonExit }}}
                        </div>
                    </div>`}
                </form>
                ${this.props.popup === true ? '{{{popup}}}' : ''}    
            </div>
        </main>
        `
  }
}
