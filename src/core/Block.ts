import EventBus from './EventBus'
import { nanoid } from 'nanoid'
import Handlebars from 'handlebars'



export default class Block<PropsType> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  }

  children
  props
  eventBus: () => EventBus
  private _element
  _id: string = nanoid(6)

  /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */

  constructor(propsWithChildren = {}) {

    const eventBus = new EventBus()

    const { props, children } = this._getChildrenAndProps(propsWithChildren)

    this.props = this._makePropsProxy({ ...props })

    this.children = children

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)

    eventBus.emit(Block.EVENTS.INIT)
  }

  private _makePropsProxy(props) {
    const self = this

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop, value) {
        const oldTarget = { ...target }
        target[prop] = value

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      }
    })
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
  }

  private _init(): void {
    this.init()

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  init(): void {

  }

  private _render(): void {
    const propsAndStubs = { ...this.props }

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    })

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs)
    const newElement = fragment.content.firstElementChild

    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)

      stub?.replaceWith(child.getContent())
    })

    if (this._element) {
      this._element.replaceWith(newElement)
    }

    this._element = newElement

    this._addEvents()
  }

  render(): string {
    return ''
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName)
  }

  private _addEvents(): void {
    const { events = {} } = this.props

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName])
    })
  }

  private _componentDidMount(): void {
    this.componentDidMount()
    
    console.log('CDM')

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount()
    })
  }

  componentDidMount(oldProps = {}): void { }

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  _componentDidUpdate(oldProps = {}, newProps = {}): void {
    console.log('CDU')
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this._render()
  }

  componentDidUpdate(oldProps, newProps): boolean {
    return true
  }

  _getChildrenAndProps(propsAndChildren) {
    const children = {}
    const props = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { children, props }
  }

  setProps = (nextProps: PropsType): void => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  get element(): HTMLElement | null {
    return this._element
  }


  getContent(): HTMLElement {
    return this.element
  }



  show(): void {
    this.getContent().style.display = 'block'
  }

  hide(): void {
    this.getContent().style.display = 'none'
  }
}
