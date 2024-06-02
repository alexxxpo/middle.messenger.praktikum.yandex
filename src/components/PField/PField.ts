import { Block } from '../../core/index.ts'
import { type EventsType } from '../../types/types.ts'
import ErrorLine from '../Input/ErrorLine.ts'
import PFieldInput from './PFieldInput.ts'

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
  errorText?: string
}

export default class PField extends Block<PFieldProps> {
  constructor (props: PFieldProps) {
    super({
      ...props,
      Input: new PFieldInput({
        events: props.events ?? {},
        name: props.name,
        className: 'pField__input',
        value: props.value,
        disabled: props.disabled,
        type: props.type
      }),
      errorLine: new ErrorLine({
        errorText: props.errorText ?? ''
      })
    })
  }

  init () {
    this.children.Input.setProps({
      events: {
        ...this.props.events,
        change: [
          (e: Event) => {
            const target = e.target as HTMLInputElement
            this.setProps({
              value: target.value
            })
          }
        ]
      }
    })
  }

  componentDidUpdate (oldProps: Record<string, string | number | boolean | string[]>, newProps: Record<string, string | number | boolean | string[]>): boolean {
    if (oldProps.disabled !== newProps.disabled) {
      this.children.Input.setProps({
        disabled: this.props.disabled
      })
    }
    if (oldProps.error !== newProps.error) {
      this.children.Input.setProps({
        error: this.props.error
      })
    }

    if (newProps.error === true) {
      this.children.errorLine.setProps({
        errorText: this.props.errorText
      })
    }

    if (newProps.value !== oldProps.value) {
      this.children.Input.setProps({ value: newProps.value })
    }
    return true
  }

  render (): string {
    return `
        <div class="pField__container ${this.props.error ? 'input__error' : ''}">
            <div class="pField ">
                <span class="pField__label">{{label}}</span>
                <label class="pField__label">
                    {{{Input}}}
                </label>
            </div>
            {{{errorLine}}}
        </div>
        `
  }
}
