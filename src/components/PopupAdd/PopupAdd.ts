import { Block } from '../../core/index.ts'
import { MapStateToProps, connect } from '../../utils/connect.ts';
import { Button, Input, UsersSearchList } from '../index.ts'

interface PopupType {
  buttonChange?: Button;
}

export interface PopupProps {
  title?: string
  buttonLabel?: string
  name: string
  errorLoad?: boolean
  notSelected?: boolean
  clickButton?: EventListenerOrEventListenerObject
  changeInput?: EventListenerOrEventListenerObject
  listClick?: EventListenerOrEventListenerObject
}

class Popup extends Block<PopupType> {
  constructor(props: PopupProps) {
    const clickEvetListener = props.clickButton || (() => {})
    const changeEvetListener = props.changeInput || (() => {})
    super({
      ...props,
      buttonChange: new Button({
        type: 'primary',
        label: props.buttonLabel || 'Добавить',
        events: { 
          click: [clickEvetListener]
        }
      }),
      input: new Input({
        name: props.name,
        type: 'text',
        events: {
          change: [changeEvetListener] || []
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

const mapStateToProps: MapStateToProps = ({isLoading}) => ({isLoading})

export default connect(mapStateToProps)(Popup)
