import { conditions, validate } from "../validations/index.ts"

export function serializeForm(formNode: HTMLFormElement): void {
  if (formNode === null) return
  const elements = Array.from(formNode.elements) as HTMLInputElement[]
  const data = Array.from(elements)
    .filter((item) => item.name !== '')
    .map((element) => {
      const { name, value } = element
      let valid = false
      switch (name) {
        case 'login':
          valid = validate(value, ...conditions.login)
          break;
        case 'password':
          valid = validate(value, ...conditions.password)
          break;
        case 'email':
          valid = validate(value, ...conditions.email)
          break;
        case 'first_name':
          valid = validate(value, ...conditions.names)
          break;
        case 'second_name':
          valid = validate(value, ...conditions.names)
          break;          
        case 'display_name':
          valid = validate(value, ...conditions.names)
          break;
        case 'phone':
          valid = validate(value, ...conditions.phone)
          element.blur()
          break;
      }
      return { name, value, valid }
    })
  console.log(data)
}

export function logFields(e: Event): void {
  e.preventDefault()
  const target = e.target as HTMLButtonElement
  const form = target.form
  if (form !== null) serializeForm(form)
}
