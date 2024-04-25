import { Block } from '../../core/index.ts'
import { type EventsType } from '../../types/index.ts'

interface PImageType {
  className?: string
  events?: EventsType
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
            <div class="pImage_hovered">Поменять<br>аватар</div>
        </div>
        `
  }
}
