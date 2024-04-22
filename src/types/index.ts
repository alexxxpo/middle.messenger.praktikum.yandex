export type EventsPropsType = Record<string, () => void>

export type EventsType = {
  [event: string]: EventListenerOrEventListenerObject
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
