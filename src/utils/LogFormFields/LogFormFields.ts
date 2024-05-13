import { conditions, validate } from "../validations/index.ts"

export function serializeForm(formNode: HTMLFormElement): Record<string, string | boolean>[] {
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
          break;
        case 'message':
          valid = validate(value, /(.+)/)
          break;
      }
      return { name, value, valid }
    })
  return data
}

export function logFields(e: Event): void {
  e.preventDefault()
  const target = e.target as HTMLButtonElement
  const form = target.form
  if (form !== null) serializeForm(form)
}

export function getModel(e) {
  e.preventDefault()
  console.log(e)

  const target = e.target as HTMLButtonElement
  const form = target.form
  let raw: Record<string, string | boolean>[]
  if (form !== null) raw = serializeForm(form)
  const fields = raw.reduce((acc, item) => {
    acc[item.name] = item.value
    return acc
  }, {})
  console.log(fields)
  return JSON.stringify(fields)
}
