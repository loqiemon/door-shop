import $api from './axiosConfig';

export default class AuthService {
    static async login (username, password) {
        return $api.post('/login', {username, password})
    }

    static async register (username, password) {
        return $api.post('/register', {username, password})
    }

    static async logout () {
        return $api.post('/logout')
    }
}