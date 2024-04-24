import './style.css'
import Handlebars from 'handlebars'
import * as Components from './components'
import * as Pages from './pages'
import { chatList, profileFields } from './utils/chatlistdata'

const pages: Record<string, unknown> = {
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
  const [source, context] = pages[page]
  const container = document.getElementById('app')

  if (source instanceof Object) {
  // @ts-expect-error

    const page = new source(context)
    container.innerHTML = ''
    container.append(page.getContent())
    page.dispatchComponentDidMount()
    return
  }

  if (container !== null) container.innerHTML = Handlebars.compile(source)(context)
}

document.addEventListener('DOMContentLoaded', () => { navigate('nav') })

document.addEventListener('click', e => {
  // @ts-expect-error
  const page = e.target.getAttribute('page')
  if (page) {
    navigate(page)

    e.preventDefault()
    e.stopImmediatePropagation()
  }
})
