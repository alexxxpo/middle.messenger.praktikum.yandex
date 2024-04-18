import Block from '../../core/Block';
import {default as ButtonTemplate} from './Button.hbs?raw';
import { type EventsPropsType } from '../../types'

interface ButtonPropsType {
  events?: EventsPropsType
}

export default class Button extends Block {
  constructor (props: ButtonPropsType) {
    super({
      ...props,
      events: {
        click: props.events?.onClick
      }
    })
  }

  render(): string {
      return ButtonTemplate;
  }
}
