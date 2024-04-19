import Block from '../../core/Block'
import { Button } from '../../components'

interface BackButtonProps {
  className?: string;
}

interface BackButtonType extends BackButtonProps {
  button: Button;
}

export default class BackButton extends Block<BackButtonType> {
  constructor (props: BackButtonProps) {
    super({
      ...props,
      button: new Button({
        type: 'round',
        label: '<-'
      })
    })
  }

  render (): string {
    return `
        <div class="backButton {{className}}">
            {{{ button }}} 
        </div>
        `
  }
}
