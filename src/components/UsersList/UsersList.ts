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
    console.log(this.props);
    
    const list: string = this.props.activeChatUsers?.map((item: UserResponse) => `<li>${item.display_name ? item.display_name : item.login}</li>`).join('')

    if(this.props.isLoading) return `
    <div class="usersList__container {{className}}">
      <ul class="usersList">
        Загрузка пользователей...
      </ul>
    </div>
    `

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

const mapStateToProps: MapStateToProps = ({activeChatUsers, isLoading}) => ({activeChatUsers, isLoading})

export default connect(mapStateToProps)(UsersList)
