import { Block } from '../../core/index.ts'
import { type EventsType } from '../../types/index.ts'

interface ButtonPropsType {
  events?: EventsType
  label?: string
  type?: string
  className?: string
}

export default class Button extends Block<ButtonPropsType> {
  constructor (props: ButtonPropsType) {
    super({
      ...props
    })
  }

  render (): string {
    if (this.props.type === 'primary' || this.props.type === 'round') {
      return `
        <button 
        class="button {{className}}" 
        data-type={{type}}
        type="submit"
        >
        {{label}}
        </button>
      `
    }
    return `
        <a 
        class="button {{className}}" 
        data-type={{type}}
        type="submit"
        >
        {{label}}
        </a>
      `
  }
}
