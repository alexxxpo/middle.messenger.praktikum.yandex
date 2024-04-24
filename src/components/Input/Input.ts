import Block from '../../core/Block'
import { type EventsType } from '../../types'

interface InputProps {
  events: EventsType
  type?: string
  name: string
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
                type="{{type}}"
                name="{{name}}"
            />
        `
  }
}

export default Input
