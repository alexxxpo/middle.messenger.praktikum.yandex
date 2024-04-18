import Block from '../../core/Block';
import { type EventsPropsType } from '../../types'

interface ButtonPropsType {
  events?: EventsPropsType;
  label?: string;
  type?: string;
  class?: string;
}

export default class Button extends Block {
  constructor(props: ButtonPropsType) {
    super({
      ...props,
      events: {
        click: props.events?.onClick
      }
    })
  }

  render(): string {
    return `
          <a 
              class="button {{class}}" 
              data-type={{type}}
          >
              {{label}}
          </a>
      `;
  }
}
