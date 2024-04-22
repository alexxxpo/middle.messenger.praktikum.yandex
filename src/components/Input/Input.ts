import Block from '../../core/Block'
import { type EventsPropsType } from '../../types'

interface InputPropsType {
  events?: EventsPropsType
  label?: string
  error?: boolean
  errorText?: string
  name: string
  type?: string
  required?: boolean
  className?: string
}

export default class Input extends Block<InputPropsType> {
  constructor (props: InputPropsType) {
    super({
      ...props
    })
  }

  render (): string {
    return `
            <div class="input">
                <label class="input__label {{className}}">
                    <input class="input__text" ${this.props.error ?? false ? 'error' : ''} name={{name}} type={{type}} ${this.props.required ?? false ? 'required' : ''}>
                    <span class="input__placeholder">{{label}}</span>
                    <span class="input__error">{{errorText}}</span>
                </label>
            </div>
            `
  }
}
