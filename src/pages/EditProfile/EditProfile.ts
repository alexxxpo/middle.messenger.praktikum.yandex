import { BackButton, Button, PField, PImage, Popup } from '../../components'
import { type PFieldProps } from '../../components/PField/PField'
import { type PopupProps } from '../../components/Popup/Popup'
import Block from '../../core/Block'
import { type ProfileProps } from '../Profile/Profile'

interface EditProfilesType {
  [key: string]: boolean | string | string[] | PField | Popup | PopupProps | PFieldProps | PFieldProps[] | PopupProps | Button
  pFieldsKeys: string[]
}

export default class EditProfile extends Block<EditProfilesType> {
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

      buttonBack: new BackButton({}),

      popupWindow: new Popup({ ...props.popupProps })

    })
  }

  render (): string {
    return `
        <main  class="page editProfilePage">
            <div class="editProfilePage__userInfo">
                
                {{{ buttonBack }}}
                
                {{{pImage}}}

                <h2>{{displayName}}</h2>
                    ${this.props.pFieldsKeys.map((key: string) => `{{{ ${key} }}}`).join(' ')}
            </div>
            <div class="editProfilePage__buttons">
                <div class="editProfilePage__buttonField">
                    {{{ buttonSave }}}
                </div>
            </div>
            ${this.props.popup === true ? '{{{ popupWindow }}}' : ''}
        </main>
        `
  }
}
