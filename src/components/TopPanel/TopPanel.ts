import { Block } from '../../core'
import { type ChatsResponse } from '../../types/types'
import { type MapStateToProps, connect } from '../../utils/connect'
import { ChatControl } from '../ChatControl'
import img from '../../assets/images/Union.png'

interface TopPanelProps {
  activeChat: ChatsResponse
}

class TopPanel extends Block {
  constructor (props: TopPanelProps) {
    super({ ...props })
  }

  init () {
    const chatControl = new ChatControl({})
    this.children = {
      ...this.children,
      chatControl
    }
  }

  render (): string {
    return `
            <div class="topPanel {{className}}">
                <div class="topPanel__info">

                    <div class="topPanel__avatar_container">
                        <img 
                            class="topPanel__avatar" 
                            src=" ${this.props.activeChat?.avatar ? 'https://ya-praktikum.tech/api/v2/resources/' + this.props.activeChat?.avatar : img} " 
                        />
                    </div>

                    <h2 class="topPanel__title">${this.props.activeChat?.title || ''}</h2>
                </div>
                {{{chatControl}}}

                {{{buttonShow}}}

                {{{сhatsControlButtons}}}
            </div>
        `
  }
}

const mapStateToProps: MapStateToProps = ({ isLoading, activeChat }) => ({ isLoading, activeChat })

export default connect(mapStateToProps)(TopPanel)
