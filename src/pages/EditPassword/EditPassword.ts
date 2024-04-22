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

      pImage: new PImage({
        className: 'profilePage__PImage'
      }),

      backButton: new BackButton({}),

      displayName: props.fieldsProps?.filter(f => f.name === 'display_name')[0].value ?? '',

      saveButton: new Button({ label: 'Сохранить', type: 'primary' })

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
