import { Block } from '../../core/index.ts'
import { type UserResponse } from '../../types/types.ts'
import { type MapStateToProps, connect } from '../../utils/connect.ts'

class UsersSearchList extends Block {
  constructor (props: Record<string, unknown>) {
    super({
      ...props
    })
  }

  init () {
    this.setProps({
      events: {
        click: [
          this.props.listClick
        ]
      }
    })
  }

  render (): string {
    const list: string = this.props.usersSearch.length ? this.props.usersSearch.map((item: UserResponse) => `<li>${item.login}</li>`).join('') : '<li>Пользователи не найдены</li>'

    if (this.props.isLoading) {
      return `
    <div class="usersSearchList__container">
      <ul class="usersSearchList">
        Поиск...
      </ul>
    </div>
    `
    }

    if (!list) return '<div></div>'

    return `
        <div class="usersSearchList__container">
          <ul class="usersSearchList">
            ${list}
          </ul>
        </div>
        `
  }
}

const mapStateToProps: MapStateToProps = ({ usersSearch, isLoading }) => ({ usersSearch, isLoading })

export default connect(mapStateToProps)(UsersSearchList)
