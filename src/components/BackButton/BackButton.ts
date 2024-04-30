import { Block } from '../../core/index.ts'
import { Button } from '../../components/index.ts'

interface BackButtonProps {
  className?: string
}

interface BackButtonType extends BackButtonProps {
  button: Button
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
