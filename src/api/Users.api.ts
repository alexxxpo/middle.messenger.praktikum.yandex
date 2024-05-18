import HTTPTransport from "../core/HTTPTransport";
import { ChangePasswordRequest, FindUserRequest, UserUpdateRequest } from "../types/types";

const usersApi = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');

export default class UsersApi {
	async changeUserData(data: UserUpdateRequest) {
		return await usersApi.put('/profile', {
			withCredentials: true,
			data: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})
	}

	async searchUsersByLogin(data: FindUserRequest) {
		return await usersApi.post('/search', {
			withCredentials: true,
			data: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})
	}

	async changeAvatar(data: HTMLFormElement) {
		return await usersApi.put('/profile/avatar', {
			withCredentials: true,
			data: new FormData(data)
		})
	}

	async changePassword(data: ChangePasswordRequest) {
		return await usersApi.put('/password', {
			withCredentials: true,
			data: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})
	}
}
