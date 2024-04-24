import './style.css'
import Handlebars from 'handlebars'
import * as Components from './components'
import * as Pages from './pages'
import { chatList, profileFields } from './utils/chatlistdata'
import type Block from './core/Block'

const pages: Record<string, unknown > = {
  login: [Pages.Login],
  registration: [Pages.Registration],
  chatlist: [Pages.ChatListPage, chatList],
  profile: [Pages.Profile, { fieldsProps: profileFields }],
  404: [Pages.ErrorPage, { errNo: 404, message: 'Не туда попали' }],
  500: [Pages.ErrorPage, { errNo: 500, message: 'Мы уже фиксим' }],
  nav: [Pages.NavPage]
}
Object.entries(Components).forEach(([name, comp]) => { Handlebars.registerPartial(name, comp) })

function navigate (page: string): void {
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
  const page = e.target?.getAttribute('page') as string
  if (page !== null) {
    navigate(page)

    e.preventDefault()
    e.stopImmediatePropagation()
  }
})
