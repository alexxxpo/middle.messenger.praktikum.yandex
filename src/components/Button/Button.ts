import Block from '../../core/Block'
import { type EventsPropsType } from '../../types'

interface ButtonPropsType {
  events?: EventsPropsType
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
    return `
          <a 
              class="button {{className}}" 
              data-type={{type}}
          >
              {{label}}
          </a>
      `
  }
}
