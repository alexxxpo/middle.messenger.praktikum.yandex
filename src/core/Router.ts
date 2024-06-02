import { type Constructable } from '../types/types'
import type Block from './Block'
import Route from './Route'

class Router {
  routes: Route[] = []
  history: History = window.history
  private _currentRoute: Route | null = null
  private readonly _rootQuery: string = ''
  private static __instance: Router

  constructor (rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    Router.__instance = this
  }

  use (pathname: string, block: Constructable<Block<Record<string, unknown>>>) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })

    this.routes.push(route)

    return this
  }

  start = () => {
    const listener = (event: PopStateEvent) => {
      const target = event.currentTarget as Window
      this._onRoute(target.location.pathname)
    }

    window.addEventListener('popstate', listener)

    this._onRoute(window.location.pathname)
  }

  private _onRoute (pathname: string) {
    const route = this.getRoute(pathname)
    if (!route) {
      return
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()
  }

  go (pathname: string) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back () {
    this.history.back()
  }

  forward () {
    this.history.forward()
  }

  getRoute (pathname: string) {
    const route = this.routes.find(route => route.match(pathname))
    if (!route) {
      return this.routes.find(route => route.match('*'))
    }
    return route
  }
}

export default new Router('#app')
