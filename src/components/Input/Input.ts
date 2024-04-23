import Block from '../../core/Block'
import { type EventsType } from '../../types'

interface InputProps {
  events: EventsType
}

class Input extends Block {
  constructor (props: InputProps) {
    super({ ...props })
  }

  render (): string {
    return `
            <input
                class="input__element"
                placeholder=""
            />
        `
  }
}

export default Input
