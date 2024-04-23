import Block from '../../core/Block'
import { type EventsType } from '../../types'
import ErrorLine from './ErrorLine'
import Input from './Input'

interface InputElementProps {
  errorText?: string
  events?: EventsType
  label?: string
  name?: string
  type?: string
}

interface InputElementType extends InputElementProps {
  Input: Input
  ErrorLine: ErrorLine
}

class InputElement extends Block<InputElementType> {
  constructor (props: InputElementProps) {
    super({
      ...props,
      Input: new Input({
        events: {
          blur: props.events?.blur ?? (() => {})
        },
        type: props.type
      }),
      ErrorLine: new ErrorLine({
        errorText: props.errorText ?? ''
      })
    })
  }

  componentDidUpdate (oldProps: InputElementProps, newProps: InputElementProps): boolean {
    if (oldProps === newProps) {
      return false
    }

    this.children.ErrorLine.setProps(newProps)
    return true
  }

  render (): string {
    return `
        <div class="input {{#if error}}input__error{{/if}}" >
            <label class="input__container">
                {{{ Input }}}
                <div class="input__label">{{label}}</div>
            </label>
            {{{ ErrorLine }}}
        </div>
    `
  }
}

export default InputElement
