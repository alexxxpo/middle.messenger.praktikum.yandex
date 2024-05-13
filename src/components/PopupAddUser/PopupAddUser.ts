import { Block } from '../../core/index.ts'
import { Button } from '../../components/index.ts'

interface PopupType {
  buttonChange?: Button;
}

export interface PopupProps {
  title?: string
  errorLoad?: boolean
  notSelected?: boolean
  clickButton?: EventListenerOrEventListenerObject
}

export default class Popup extends Block<PopupType> {
  constructor(props: PopupProps) {
    super({
      ...props,
      buttonChange: new Button({
        type: 'primary',
        label: 'Добавить',
        events: { click: [props.clickButton] }
      })
    })
  }

  render(): string {
    return `
        <div class="popup">
            <form class="popup__form">
                <h3 class="popup__form_title">{{title}}</h3>
                <div class="popup__form_inner">
                    <label><input type="text" name="title"></label>
                </div>
                <div class="popup__form_button">
                    {{{ buttonChange }}}
                </div>
                <p class="popup__form_errorMessage">{{errorMessage}}</p>
            </form>
        </div>
        `
  }
}
