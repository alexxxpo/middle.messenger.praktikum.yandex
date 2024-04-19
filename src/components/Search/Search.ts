import Block from '../../core/Block'

export default class Search extends Block {
  constructor (props) {
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
