import axios from "axios";

export default class UsersService {
    static async getAuth(token) {
        const response = await fetch('http://localhost:8000/api/users/me', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + token
            },
        })
        return response
    }

    static async login(username, password) {
        const response = await fetch('http://localhost:8000/api/token/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                username,
                password,
            })
        })
        return response
    }

    static async logout(token) {
        const response = await fetch('http://localhost:8000/api/token/logout', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + token
            },
        })
        return response
    }

    static async getById(id) {
        const response = await fetch('http://localhost:8000/api/users/' + id, {
            method: 'GET',
        })
        return response
    }

    static async update(data, token) {
        const response = await fetch('http://localhost:8000/api/users/me/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: "Token " + token
            },
            body: JSON.stringify({
                first_name: data.first_name,
                last_name: data.last_name
            })
        })
        return response
    }

    static async getAll() {
        const response = await axios.get('http://localhost:8000/api/users')
        return response.data
    }

    static async getAnimes(id, genres, status) {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}/animes`)
        return response.data
    }
}
