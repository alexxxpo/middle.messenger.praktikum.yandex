import { BackButton, Button, PField, PImage, Popup } from '../../components'
import Block from '../../core/Block'


type EditProfileType = {
  fields: []
}

function clickButton(data = []) {
  console.log(data.reduce((acc, el) => {      
      acc[el.name] = el.value;
      return acc;      
  }, {}))
}

export default class EditProfile extends Block<EditProfileType> {
  
  constructor (props: EditProfileType) {
    
    const pFields = props.fields.reduce((acc, data) => {
      const pField = new PField(data)
      acc[pField._id] = pField
      return acc
    }, {})

    

    super({
      ...props,

      pFieldsKeys: Object.keys(pFields),
      ...pFields,

      displayName: props.fields.filter(f => f.name === "display_name")[0].value,

      pImage: new PImage({
        className: "editProfilePage__PImage",
      }),

      buttonSave: new Button({
        type: 'primary',
        label: 'Сохранить',
        events: {          
            click: () => clickButton(this.props.fields), 
        }      
      }),

      buttonBack: new BackButton({}),

      popupWindow: new Popup({}),

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
            ${this.props.popup ? '{{{ popupWindow }}}' : ''}
        </main>
        `
  }
}
