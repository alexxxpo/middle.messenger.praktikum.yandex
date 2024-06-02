import Router from '../../core/Router.ts'
import { Block } from '../../core/index.ts'
import { Routes } from '../../main.ts'
import { Button } from '../Button/index.ts'

export interface ErrorPropsType {
  errNo?: string
  message?: string
}

interface ErrorCompType extends ErrorPropsType {
  button: Button
}

export default class ErrorComp extends Block<ErrorCompType> {
  constructor (props: ErrorPropsType) {
    super({
      ...props,
      button: new Button({
        type: 'link',
        label: 'Назад к чатам',
        events: {
          click: [
            () => { Router.go(Routes.Login) }
          ]
        }
      })
    })
  }

  render (): string {
    return `
        <div class="errorComp">
            <h1 class="errorComp__errNo">{{errNo}}</h1>
            <h2 class="errorComp__message">{{message}}</h2>
            <div class="errorComp__returnButton">{{{ button }}}</div>
        </div>
        `
  }
}
