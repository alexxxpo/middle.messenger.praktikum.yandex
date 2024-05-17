import { ChatUserResponse, ChatsResponse, UserResponse } from '../types/types.ts';
import EventBus from './EventBus';

export enum StoreEvents {
  Updated = 'Updated'
}

export type HttpErrorType = {
  reason: string;
  status?: number;
}

export interface IState {
  isLoading?: boolean;
  loginError?: HttpErrorType | null;
  chats?: ChatsResponse[];
  currentUser?: UserResponse | null;
  usersSearch?: UserResponse[];
  activeChat?: ChatsResponse | null;
  activeChatUsers?: ChatUserResponse[];
  token?: string;
}

export interface INextState {
  [x: string]: any;
  isLoading?: boolean;
  chats?: ChatsResponse[];
  currentUser?: UserResponse | null;
  usersSearch?: UserResponse[];
  activeChat?: ChatsResponse | null;
  activeChatUsers?: ChatUserResponse[];
  token?: string;
  loginError?: HttpErrorType | null;
  createUserError?: HttpErrorType | null;
  getUserError?: HttpErrorType | null;
  logoutError?: HttpErrorType | null;
  getChatsError?: HttpErrorType | null;
  changeUserDataError?: HttpErrorType | null;
  deleteChatError?: HttpErrorType | null;
  changeAvatarError?: HttpErrorType | null;
  getActiveChatUsersError?: HttpErrorType | null;
  changePasswordError?: HttpErrorType | null;
}

const defaultState: IState = {
  isLoading: true,
  loginError: null,
  chats: [],
  currentUser: null,
  usersSearch: [],
  activeChat: null,
  activeChatUsers: [],
}


class Store extends EventBus {
  private state: IState = defaultState;

  private static __instance: Store

  constructor(defaultState: IState) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public set(nextState: INextState) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}

export default new Store(defaultState)
