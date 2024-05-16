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

export type Constructable<T = any> = new (...args: any[]) => T;

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

export type CreateChat = {
	title: string;
}

export type CreateChatResponse = {
	chatId: number;
}

export type ChatsResponse = {
	id: number;
	title: string;
	avatar: string;
	unread_count: number;
	last_message: {
		user: UserResponse;
		time: string;
		content: string;
	}
}

export type ChatUserResponse = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	avatar: string;
	role: string;
  }

export type UsersRequest = {
	users: number[];
	chatId: number;
}

export type Login = {
	login: string;
	password: string;
}

export type CreateUser = {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
}

export type CreateUserResponse = {
	id: number;
}

export type FindUserRequest = {
	login: string
}

export type UserUpdateRequest = {
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
}

export type ChangePasswordRequest = {
	oldPassword: string;
	newPassword: string;
  }
  