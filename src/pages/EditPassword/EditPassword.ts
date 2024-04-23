import { BackButton, Button, PField, PImage, type Popup } from '../../components'
import { type PFieldProps } from '../../components/PField/PField'
import { type PopupProps } from '../../components/Popup/Popup'
import Block from '../../core/Block'
import { type ProfileProps } from '../Profile/Profile'

interface EditPasswordType {
  [key: string]: boolean | string | string[] | PField | Popup | PopupProps | PFieldProps | PFieldProps[] | PopupProps | Button
  pFieldsKeys: string[]
}

export default class EditPassword extends Block<EditPasswordType> {
  constructor (props: ProfileProps) {
    const pFields = props.fieldsProps?.reduce((acc: Record<string, PFieldProps>, data) => {
      if (data.name !== 'display_name') {
        const pField = new PField(data)
        acc[pField._id] = pField
      }
      return acc
    }, {}) ?? {}

    super({
      ...props,
      pFieldsKeys: Object.keys(pFields),
      ...pFields,
    })
  }

  init(): void {
    const oldPasword = new PField({ label: 'Старый пароль', type: 'password', value: 'sdafadfa', name: 'old_password' })
    const newPassword = new PField({ label: 'Новый пароль', type: 'password', value: 'ivanivanov', name: 'new_password' })
    const newPasswordAgain = new PField({ label: 'Повторите новый пароль', type: 'password', value: 'ivanivanov', name: 'new_password' })
    const displayName = new PField({ label: 'Имя в чате', type: 'text', value: 'Иван', disabled: true, name: 'display_name' })
  

    const pImage = new PImage({
      className: 'profilePage__PImage'
    })
  } 

  render (): string {
    return `
        <main class="page editProfilePage">
            <div class="profilePage__userInfo">
                {{{ backButton }}}
        
                {{{ pImage }}}
                <h2 class="profilePage__title">{{ displayName }}</h2>
                ${this.props.pFieldsKeys.map((key: string) => `{{{ ${key} }}}`).join(' ')}
            </div>
            <div class="editProfilePage__buttons">
                <div class="pField editProfilePage__buttonField">
                    {{{ saveButton }}}
                </div>
            </div>
        </main>
        `
  }
}
