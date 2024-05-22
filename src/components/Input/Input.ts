import { Block } from '../../core/index.ts'
import { type EventsType } from '../../types/types.ts'

interface InputProps {
  events: EventsType
  type?: string
  name: string
  value?: string
}

class Input extends Block<Record<string, unknown>> {
  constructor(props: InputProps) {
    super({ ...props })
  }

  render(): string {
    return `
            <input
                class="input__element"
                placeholder=""
                type="{{type}}"
                name="{{name}}"
                value="{{value}}"
            />
        `
  }
}

export default Input
