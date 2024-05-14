import { Block } from '../../core/index.ts'
import { connect } from '../../utils/connect.ts'


class UsersSearchList extends Block<Record<string, string>> {
  constructor(props) {
    super({
      ...props
    })
  }

  init() {

    this.setProps({
      events: {
        click: [
          this.props.listClick
        ]
      }
    })
  }

  render(): string {
    const list = this.props.usersSearch.map(item => `<li>${item.login}</li>`).join('')

    if(this.props.isLoading) return `
    <div class="usersSearchList__container">
      <ul class="usersSearchList">
        Поиск...
      </ul>
    </div>
    `

    if(!list) return `<div></div>`

    return `
        <div class="usersSearchList__container">
          <ul class="usersSearchList">
            ${list}
          </ul>
        </div>
        `
  }
}

const mapStateToProps = ({usersSearch, isLoading}) => ({usersSearch, isLoading})

export default connect(mapStateToProps)(UsersSearchList)
