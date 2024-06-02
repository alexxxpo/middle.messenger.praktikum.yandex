import { expect } from 'chai'
import Router from './Router'
import Block from './Block'
import { type EventsType } from '../types/types'

interface Props {
  text?: string
  events?: EventsType
}

const Routes = {
  pageOne: '/',
  pageTwo: '/page',
  errorPage: '*'
}

describe('Router', () => {
  let router: typeof Router
  let PageClass: typeof Block<Record<string, unknown>>
  let ErrorPageClass: typeof Block<Record<string, unknown>>

  before(() => {
    class Page extends Block {
      constructor (props: Props) {
        super({
          ...props
        })
      }

      render (): string {
        return `<div>
                    <span id="test-text">{{text}}</span>
                    <button>{{text-button}}</button>
                </div>`
      }
    }

    class ErrorPage extends Block {
      constructor (props: Props) {
        super({
          ...props
        })
      }

      render (): string {
        return `<div>
					  <span id="test-text">{{text}}</span>
					  <button>{{text-button}}</button>
				  </div>`
      }
    }

    PageClass = Page
    ErrorPageClass = ErrorPage

    router = Router
    router.use('/', PageClass).use('/page', PageClass).use('*', ErrorPageClass)
  })

  it(`Должен вернуть роут с адресом ${Routes.pageOne}`, () => {
    const route = router.getRoute(Routes.pageOne)
    expect(route?.match(Routes.pageOne)).to.be.eq(true)
  })

  it(`Должен вернуть роут с адресом ${Routes.pageTwo}`, () => {
    const route = router.getRoute(Routes.pageTwo)
    expect(route?.match(Routes.pageTwo)).to.be.eq(true)
  })

  it(`Должен вернуть роут с адресом ${Routes.errorPage}`, () => {
    const route = router.getRoute('/wrong_path')
    expect(route?.match(Routes.errorPage)).to.be.eq(true)
  })

  it('Должен перейти на первую страницу', () => {
    router.start()
    expect(router.history.length).to.eq(1)
  })

  it('Переход на новую страницу должен менять состояние сущности history', () => {
    router.go(Routes.pageTwo)
    expect(router.history.length).to.eq(2)
  })
})
