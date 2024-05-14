import { Block } from '../../core/index.ts'
import { connect } from '../../utils/connect.ts';
import { Button, Input, UsersSearchList } from '../index.ts'

interface PopupType {
  buttonChange?: Button;
}

export interface PopupProps {
  title?: string
  name: string
  errorLoad?: boolean
  notSelected?: boolean
  clickButton?: EventListenerOrEventListenerObject
  changeInput?: EventListenerOrEventListenerObject
}

class Popup extends Block<PopupType> {
  constructor(props: PopupProps) {
    super({
      ...props,
      buttonChange: new Button({
        type: 'primary',
        label: 'Добавить',
        events: { 
          click: [props.clickButton] || [] 
        }
      }),
      input: new Input({
        name: props.name,
        type: 'text',
        events: {
          change: [props.changeInput] || []
        }
      }),
      usersSearchList: new UsersSearchList({
        listClick: props.listClick
      })
    })
  }


  render(): string {
    return `
        <div class="popup">
            <form class="popup__form">
                <h3 class="popup__form_title">{{title}}</h3>
                <div class="popup__form_inner">
                    {{{input}}}
                </div>
                <div class="popup__form_button">
                    {{{ buttonChange }}}
                </div>
                <p class="popup__form_errorMessage">{{errorMessage}}</p>
                {{{usersSearchList}}}
            </form>
        </div>
        `
  }
}

const mapStateToProps = ({isLoading}) => ({isLoading})

export default connect(mapStateToProps)(Popup)
