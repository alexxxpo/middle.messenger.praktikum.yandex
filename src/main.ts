import './style.scss'
import Handlebars from 'handlebars'
import * as Components from './components/index.ts'
import * as Pages from './pages/index.ts'
import { chatList, profileFields } from './utils/chatlistdata.ts'
import type { Block } from './core/index.ts'

type Constructable<T = any> = new (...args: any[]) => T;

const pages: Record<string, [Constructable, Record<string, unknown | undefined>]> = {
  login: [Pages.Login, {}],
  registration: [Pages.Registration, {}],
  chatlist: [Pages.ChatListPage, chatList],
  profile: [Pages.Profile, { fieldsProps: profileFields }],
  404: [Pages.ErrorPage, { errNo: 404, message: 'Не туда попали' }],
  500: [Pages.ErrorPage, { errNo: 500, message: 'Мы уже фиксим' }],
  nav: [Pages.NavPage, {}]
}
Object.entries(Components).forEach(([name, comp]) => { Handlebars.registerPartial(name, comp.toString()) })

function navigate(page: string): void {
  const [Source, context] = pages[page]
  const container = document.getElementById('app')

  if (Source instanceof Object) {
    const page = new Source(context) as Block<Record<string, unknown>>
    if (container !== null) {
      container.innerHTML = ''
      container.append(page.getContent() as Node)
      page.dispatchComponentDidMount()
    }
    return
  }

  if (container !== null) container.innerHTML = Handlebars.compile(Source)(context)
}

document.addEventListener('DOMContentLoaded', () => { navigate('nav') })

document.addEventListener('click', e => {
  const target = e.target as HTMLElement
  const page = target?.getAttribute('page') as string
  if (page !== null) {
    navigate(page)

    e.preventDefault()
    e.stopImmediatePropagation()
  }
})
