type CBT = (...args: unknown[]) => void

type ListenersType = Record<string, CBT[]>

export default class EventBus {
  listeners: ListenersType

  constructor () {
    this.listeners = {}
  }

  on (event: string, callback: () => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off (event: string, callback: () => void): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }
    this.listeners[event] = this.listeners[event].filter(listener => listener !== callback)
  }

  emit (event: string, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      return
    }
    this.listeners[event].forEach(function (listener) {
      listener(...args)
    })
  }
}
