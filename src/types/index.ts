export type EventsType = {
  [event: string]: EventListenerOrEventListenerObject
}

export interface CommonBlockProps {
  events: EventsType
}

export interface PagesList {
  login: []
  registration: []
  chatlist: []
  editpassword: []
  edit: []
  edit_popup: []
  profile: []
  404: []
  500: []
  nav: []
}
