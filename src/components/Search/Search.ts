import Block from '../../core/Block'

interface SearchProps {
  events?: Record<string, () => void>
}

export default class Search extends Block<SearchProps> {
  constructor (props: SearchProps) {
    super({
      ...props
    })
  }

  render (): string {
    return `
        <div class="search">
            <input type="text" class="search__input" placeholder="Поиск">
        </div>
        `
  }
}
