import { Block } from '../../core/index.ts'
import { UserResponse } from '../../types/types.ts'
import { MapStateToProps, connect } from '../../utils/connect.ts'


class UsersList extends Block {
  constructor(props: Record<string, unknown>) {
    super({
      ...props
    })
  }

  render(): string {
    const list: string = this.props.activeChatUsers?.map((item: UserResponse) => `<li>${item.display_name ? item.display_name : item.login}</li>`).join('')

    if(!list) return `<div></div>`

    return `
        <div class="usersList__container {{className}}">
          <h4>Список пользователей</h4>
          <ul class="usersList">
            ${list}
          </ul>
        </div>
        `
  }
}

const mapStateToProps: MapStateToProps = ({activeChatUsers}) => ({activeChatUsers})

export default connect(mapStateToProps)(UsersList)
