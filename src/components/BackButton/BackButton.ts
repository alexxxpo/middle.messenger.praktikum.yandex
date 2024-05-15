import { Block } from '../../core/index.ts'
import { Button } from '../../components/index.ts'
import { EventsType } from '../../types/types.ts';

type BackButtonProps = {
  className?: string;
  events?: EventsType;
}

export default class BackButton extends Block<BackButtonProps> {
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
