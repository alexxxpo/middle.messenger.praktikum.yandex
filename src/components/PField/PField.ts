import Block from '../../core/Block'
import { EventsType } from '../../types'
import PFieldInput from './PFieldInput'

export interface PFieldProps {
  label?: string
  disabled?: boolean
  type?: string
  value?: string
  name: string
  _id?: string
  error?: boolean
  events?: EventsType
  blur?: EventListenerOrEventListenerObject
}

interface PFieldType extends PFieldProps {
  Input: PFieldInput
}

export default class PField extends Block<PFieldType> {
  constructor (props: PFieldProps) {
    super({
      ...props,
      Input: new PFieldInput({
        events: {
          blur: props.events?.blur ?? [()=>{}]
        },
        name: props.name,
        className: "pField__input",
        value: props.value,
        disabled: props.disabled
      })
    })
  }

  componentDidUpdate(oldProps: { [x: string]: string | number | boolean | string[] }, newProps: { [x: string]: string | number | boolean | string[] }): boolean {
    if(oldProps.disabled !== newProps.disabled) {
      this.children.Input.setProps({
        disabled: this.props.disabled,
        error: this.props.error
      })
    }
    return true
  }

  render (): string {
    return `
        <div class="pField">
            <span class="pField__label">{{label}}</span>
            <label class="pField__label">
                {{{Input}}}
            </label>
        </div>
        `
  }
}
