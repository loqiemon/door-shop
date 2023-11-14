import $api from './axiosConfig';

export default class AuthService {
    static async login (username, password) {
        return $api.post('auth/login', {email: username, password})
    }

    static async register (username, password) {
        return $api.post('auth/register', {username, password})
    }

    static async logout () {
        return $api.post('auth/logout')
    }
}