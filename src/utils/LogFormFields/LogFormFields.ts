export function serializeForm(formNode: HTMLFormElement) {
    if(formNode === null) return
    const elements = formNode.elements as Iterable<HTMLInputElement>
    const data = Array.from(elements)
        .filter((item) => !!item.name)
        .map((element) => {
            const { name, value } = element
            return { name, value }
        })
    console.log(data)
}

export function logFields (e: Event): void {
    e.preventDefault()
    const target = e.target as HTMLButtonElement
    const form = target.form as HTMLFormElement
    serializeForm(form)
  }