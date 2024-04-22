import { BackButton, Button, PField, PImage, Popup } from '../../components'
import { type PFieldProps } from '../../components/PField/PField'
import { type PopupProps } from '../../components/Popup/Popup'
import Block from '../../core/Block'

export interface ProfileProps {
  popupProps?: PopupProps
  fieldsProps?: PFieldProps[]
  editPassword?: boolean
}

export interface ProfileType extends ProfileProps {
  displayName: string
  pFieldsKeys: string[]
  pImage: PImage
  buttonSave: Button
  buttonChangePassword: Button
  buttonChangeData: Button
  buttonExit: Button
  buttonBack: Button
  popupWindow: Popup
}

export default class Profile extends Block<ProfileType> {
  constructor (props: ProfileProps) {
    const pFields = props.fieldsProps?.reduce((acc: Record<string, PFieldProps>, data) => {
      const pField = new PField(data)
      acc[pField._id] = pField
      return acc
    }, {}) ?? {}

    super({

      ...props,

      pFieldsKeys: Object.keys(pFields),
      ...pFields,

      displayName: props.fieldsProps?.filter(f => f.name === 'display_name')[0].value ?? '',

      pImage: new PImage({
        className: 'editProfilePage__PImage'
      }),

      buttonSave: new Button({
        type: 'primary',
        label: 'Сохранить'
      }),

      buttonChangePassword: new Button({
        type: 'link',
        label: 'Изменить пароль',
        className: 'profilePage__Button'
      }),

      buttonChangeData: new Button({
        type: 'link',
        label: 'Изменить данные',
        className: 'profilePage__Button'
      }),

      buttonExit: new Button({
        type: 'link',
        label: 'Выйти',
        className: 'profilePage__Button profilePage__exitButton'
      }),

      buttonBack: new BackButton({}),

      popupWindow: new Popup({}),

      editPassword: false
    })
  }

  render (): string {
    return `
        <main class="page profilePage">
            <div class="profilePage__userInfo">
                {{{ buttonBack }}}
        
                {{{pImage}}}
                <h2>{{displayName}}</h2>
                ${this.props.pFieldsKeys.map((key: string) => `{{{ ${key} }}}`).join(' ')}
            </div>
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
        </main>
        `
  }
}
