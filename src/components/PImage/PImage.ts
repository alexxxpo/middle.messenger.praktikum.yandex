import { Block } from '../../core/index.ts'
import { type EventsType } from '../../types/types.ts'

interface PImageType {
  className?: string
  events?: EventsType
  avatar?: string
}

export default class PImage extends Block<PImageType> {
  constructor(props: PImageType) {
    super({
      ...props
    })
  }

  render(): string {
    return `
        <div class="pImage {{className}}">
            <img src="{{avatar}}" alt="avatar"/>
            <div class="pImage_hovered">Поменять<br>аватар</div>
        </div>
        `
  }
}
