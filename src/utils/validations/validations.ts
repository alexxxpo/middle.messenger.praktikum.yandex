import { type Input } from '../../components'
import type Block from '../../core/Block'

export function InputValidation (this: Block<Record<string, unknown>>, event: Event, input: Input, errorText: string = 'Некорректное значение', ...conditions: RegExp[]): void {
  const el = event.target as HTMLInputElement
  const inputValue = el.value
  let error = false
  conditions.forEach(condition => {
    if (!condition.test(inputValue)) {
      error = true
    }
  })
  error ? input.setProps({ error: true, errorText }) : input.setProps({ error: false, errorText: '' })
  this.setProps({ [input.props.name as string]: inputValue })
}

export const conditions = {
  login: [/[a-zA-Z]{3,}/],
  password: [/[A-Z]/, /[a-z]/, /[0-9]/, /[^.$]{8,40}/],
  email: [/^[\w-]+@[a-zA-Z]+\.[a-zA-Z]+$/],
  phone: [/^\+?\d{10,15}$/],
  names: [/^[A-ZА-Я][A-Za-zА-Яа-я-]+$/]
}
