import { Input } from "../../components"
import Block from "../../core/Block"

export const InputValidation = (element: Input, errorText: string, ...conditions: RegExp[]) => {
    return (e: Event): void => {
        console.log(element)
        console.log(this)
        const el = e.target as HTMLInputElement
        const inputValue = el.value
        conditions.forEach(condition => {
            if (condition.test(inputValue) === false) {
                element.setProps({ error: true, errorText })
                return
            }
        })
        element.setProps({ error: false, errorText: '' })
    }
}

export function validateLogin (this: Block,e: Event): void {
    const el = e.target as HTMLInputElement
    const inputValue = el.value
    console.log('l', inputValue)

    const regExp = /[a-zA-Z]{3,}/
    if (!regExp.test(inputValue)) {
      this.children.inputLogin.setProps({ error: true, errorText: 'Минимум 3 латинских буквы' })
      return
    } else {
      this.children.inputLogin.setProps({ error: false, errorText: '' })
    }
    this.setProps({ login: inputValue })
  }

  export function validatePassword (this: Block, e: Event): void {
    const el = e.target as HTMLInputElement
    const inputValue = el.value
    console.log(inputValue)

    const condition1 = /[A-Z]/.test(inputValue)
    const condition2 = /[a-z]/.test(inputValue)
    const condition3 = /[0-9]/.test(inputValue)
    const condition4 = /[^.$]{8,40}/.test(inputValue)

    if (!condition1 || !condition2 || !condition3 || !condition4) {
      this.children.inputPass.setProps({ error: true, errorText: 'Пароль некорректен' })
      return
    } else {
      this.children.inputPass.setProps({ error: false, errorText: '' })
    }

    this.setProps({ password: inputValue })
  }