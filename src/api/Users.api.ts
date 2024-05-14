import HTTPTransport from "../core/HTTPTransport";

const usersApi = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');

export default class UsersApi {
    async changeUserData(data) {
        return await usersApi.put('/profile', {
            withCredentials: true,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
         })
    }

    async searchUsersByLogin(data) {
        return await usersApi.post('/search', {
            withCredentials: true,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
         })
    }
}