import { BackButton, Button, PField, PImage, Popup } from '../../components'
import { type PFieldProps } from '../../components/PField/PField'
import { type PopupProps } from '../../components/Popup/Popup'
import Block from '../../core/Block'
import { editPassword } from '../../utils/chatlistdata'

export interface ProfileProps {
  popupProps?: PopupProps
  fieldsProps?: PFieldProps[]
  editPassword?: boolean
  editData?: boolean
}

export interface ProfileType extends ProfileProps {

}

export default class Profile extends Block<ProfileType> {
  constructor(props: ProfileProps) {

    super({
      ...props,
      editPassword: false,
      editData: false
    })
  }

  init(): void {
    //profile
    const email = new PField({ label: 'Почта', type: 'text', value: 'pochta@yandex.ru', disabled: true, name: 'email' })
    const login = new PField({ label: 'Логин', type: 'text', value: 'ivanivanov', disabled: true, name: 'login' })
    const firstName = new PField({ label: 'Имя', type: 'text', value: 'Иван', disabled: true, name: 'first_name' })
    const secondName = new PField({ label: 'Фамилия', type: 'text', value: 'Иванов', disabled: true, name: 'second_name' })
    const displayName = new PField({ label: 'Имя в чате', type: 'text', value: 'Иван', disabled: true, name: 'display_name' })
    const phone = new PField({ label: 'Телефон', type: 'text', value: '+7(909)9673030', disabled: true, name: 'phone' })

    //change password
    const oldPasword = new PField({ label: 'Старый пароль', type: 'password', value: 'sdafadfa', name: 'old_password' })
    const newPassword = new PField({ label: 'Новый пароль', type: 'password', value: 'ivanivanov', name: 'new_password' })
    const newPasswordAgain = new PField({ label: 'Повторите новый пароль', type: 'password', value: 'ivanivanov', name: 'new_password' })

    //buttons profile
    const buttonChangePassword = new Button({
      type: 'link',
      label: 'Изменить пароль',
      className: 'profilePage__Button',
      events: {
        click: e => this.setProps({ editPassword: true, editData: false })
      }
    })

    const buttonChangeData = new Button({
      type: 'link',
      label: 'Изменить данные',
      className: 'profilePage__Button',
      events: {
        click: e => this.setProps({ editData: true, editPassword: false})
      }
    })

    const buttonExit = new Button({
      type: 'link',
      label: 'Выйти',
      className: 'profilePage__Button profilePage__exitButton'
    })

    //button save
    const buttonSave = new Button({
      type: 'primary',
      label: 'Сохранить',
      events: {
        click: e => this.setProps({ editData: false, editPassword: false })
      }
    })

    //common
    const backButton = new BackButton({})
    const pImage = new PImage({
      className: 'profilePage__PImage'
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
      pImage
    }
  }

  render(): string {
    return `
        <main class="page profilePage">
            <div class="profilePage__userInfo">
                {{{ backButton }}}
        
                {{{pImage}}}
                <h2>${this.children.displayName.props.value}</h2>
                ${this.props.editPassword === false ?
                `
                <div class="profilePage__fields">
                  {{{ email }}}
                  {{{ login }}}
                  {{{ firstName }}}
                  {{{ secondName }}}
                  {{{ displayName }}}
                  {{{ phone }}}
                </div>              
                `
        : ''}
                ${this.props.editPassword === true ?
        `
                </div><div class="profilePage__fields">
                  {{{ oldPasword }}}
                  {{{ newPassword }}}
                  {{{ newPasswordAgain }}}
                </div>
                `
        : ''}
                ${this.props.editPassword === true || this.props.editData === true ?
                    `
                    <div class="profilePage__buttons">
                        <div class="pField profilePage__saveButtonField">
                            {{{buttonSave}}}
                        </div>
                    </div>
                    ` 
                    :
                    `
                    <div class="profilePage__buttons">
                        <div class="pField profilePage__buttonField">
                            {{{ buttonChangeData }}}
                        </div>
                        <div class="pField profilePage__buttonField">
                            {{{ buttonChangePassword }}}
                        </div>
                        <div class="pField profilePage__buttonField">
                            {{{ buttonExit }}}
                        </div>
                    </div>
                    `
                }
            </div>
        </main>
        `
  }
}
