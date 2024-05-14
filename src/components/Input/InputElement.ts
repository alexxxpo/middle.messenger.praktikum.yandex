import { Block } from '../../core/index.ts'
import { type EventsType } from '../../types'
import ErrorLine from './ErrorLine.ts'
import Input from './Input.ts'

interface InputElementProps {
  errorText?: string
  events?: EventsType
  label?: string
  name?: string
  type?: string
  value?: string
}

interface InputElementType extends InputElementProps {
  Input: Input
  ErrorLine: ErrorLine
}

class InputElement extends Block<InputElementType> {
  constructor(props: InputElementProps) {
    super({
      ...props,
      Input: new Input({
        events: {
          blur: props.events?.blur || [(() => { })],
        },
        type: props.type,
        name: props.name ?? ''
      }),
      ErrorLine: new ErrorLine({
        errorText: props.errorText ?? ''
      })
    })
  }

  componentDidUpdate(oldProps: InputElementProps, newProps: InputElementProps): boolean {
    if (oldProps === newProps) {
      return false
    }

    if (oldProps.value !== newProps.value) {
      this.children.Input.setProps({value: newProps.value})
    }

    this.children.ErrorLine.setProps({ ...newProps })
    return true
  }

  render(): string {
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
