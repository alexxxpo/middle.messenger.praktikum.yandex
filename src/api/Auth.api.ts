import HTTPTransport from "../core/HTTPTransport";

const authApi = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

export default class AuthApi {
    async create(data) {
        return authApi.post('/signup', {
            data, mode: 'cors',
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    async login(data) {
        return authApi.post('/signin', { 
            data, 
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
         });
    }

    async me() {
        return authApi.get('/user', {
            mode: 'cors',
            withCredentials: true,
        });
    }

    async logout() {
        return authApi.post('/logout')
    }
}