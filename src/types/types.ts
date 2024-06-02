import { type WSTransport } from '../core/WSTransport'

export type EventsType = Record<string, EventListenerOrEventListenerObject[]>

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

export type Constructable<T = any> = new (...args: any[]) => T

export interface UserResponse {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export interface CreateChat extends Record<string, string> {
  title: string
}

export interface CreateChatResponse {
  chatId: number
}

export interface ChatsResponse {
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

export interface ChatUserResponse {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: string
  role: string
}

export interface UsersRequest {
  users: number[]
  chatId: number
}

export interface Login extends Record<string, string> {
  login: string
  password: string
}

export interface CreateUser extends Record<string, string> {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface CreateUserResponse {
  id: number
}

export interface FindUserRequest extends Record<string, string> {
  login: string
}

export interface UserUpdateRequest extends Record<string, string> {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export interface ChangePasswordRequest extends Record<string, string> {
  oldPassword: string
  newPassword: string
}

export interface Token {
  token?: string
}

export interface ChatMessageType {
  content?: string
  type: 'message' | 'get old' | 'ping'
}

export interface SocketType {
  chatId: number
  socket: WSTransport
}

export interface Message {
  id: number
  user_id: number
  chat_id: number
  type: string
  time: string
  content: string
  is_read: boolean
  file?: any
}
