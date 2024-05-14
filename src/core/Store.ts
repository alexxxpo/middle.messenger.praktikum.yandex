import { ChatsResponse, UserResponse } from '../types/types.ts';
import EventBus from './EventBus';

export enum StoreEvents {
  Updated = 'Updated'
}

type HttpErrorType = {
  reason: string
}

export interface IState {
  isLoading: boolean;
  loginError: HttpErrorType | null;
  chats: ChatsResponse[];
  currentUser: UserResponse | null;
  usersSearch: UserResponse[];
  activeChat: ChatsResponse | null;
}

export interface INextState {
  isLoading?: boolean;
  loginError?: HttpErrorType | null;
  chats?: ChatsResponse[];
  currentUser?: UserResponse | null;
  usersSearch?: UserResponse[];
  activeChat?: ChatsResponse | null;
}

const defaultState: IState = {
  isLoading: true,
  loginError: null,
  chats: [],
  currentUser: null,
  usersSearch: [],
  activeChat: null,
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
