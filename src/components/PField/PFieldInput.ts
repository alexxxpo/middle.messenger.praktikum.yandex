import Block from '../../core/Block'
import { type EventsType } from '../../types'

interface InputProps {
  events: EventsType
  type?: string
  className?: string
  error?: boolean
  value?: string
  disabled?: boolean
  name: string
}

class PFieldInput extends Block<Record<string, unknown>> {
  constructor (props: InputProps) {
    super({ ...props })
  }

  render (): string {
    return `
            <input
                class="{{className}}"
                placeholder=""
                value="{{value}}"
                type="{{type}}" 
                name="{{name}}"
                ${this.props.disabled === true ? 'disabled' : ''} 
                ${this.props.error === true ? 'error' : ''} 
            />
        `
  }
}

export default PFieldInput
