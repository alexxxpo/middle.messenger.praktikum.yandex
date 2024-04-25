import { BackButton, Button, ChatList, ChatListItem, ErrorComp, Input, PField, PImage, Popup, Search, ErrorLine } from "../components/index.ts"

export type EventsType = Record<string, EventListenerOrEventListenerObject[]>

export interface CommonBlockProps {
  events: EventsType
}

export type ComponentsTypes = Button | Input | ErrorLine | Popup | BackButton | ChatList | ChatListItem | ErrorComp | PField | PImage | Search

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
