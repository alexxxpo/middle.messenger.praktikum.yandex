import { Block } from '../../core/index.ts'
import { MapStateToProps, connect } from '../../utils/connect.ts'


class ChatList extends Block {
  constructor(props: Record<string, unknown>) {
    super({
      ...props
    })
  }

  render(): string {
    return `
        {{#if isLoading}}
            <span>Загрузка списка чатов</span>
        {{else}}
            {{#if showEmpty}}
                <span>Нет чатов</span>
            {{else}}
                <div class="chatList">
                    <ul>
                        {{{chats}}}
                    </ul>
                </div>
            {{/if}}
        {{/if}}
    `
  }
}

const mapStateToProps: MapStateToProps = ({ isLoading }) => ({ isLoading })

export default connect(mapStateToProps)(ChatList)
