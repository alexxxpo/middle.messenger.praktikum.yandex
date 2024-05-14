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

export type Constructable<T = any> = new (...args: any[]) => T;

export interface ILogin {
  login: string;
  password: string;
}

export type UserResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

export type ChatsResponse = {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: {
    user: UserResponse
    time: string
    content: string
  }
}
