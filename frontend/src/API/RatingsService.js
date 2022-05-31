import axios from "axios";

export default class RatingsService {
    static async get(animeId, userId) {
        const response = await axios.get(`http://127.0.0.1:8000/api/ratings/?anime=${animeId}&user=${userId}`)
        return response.data
    }

    static async post(data, token) {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: "Token " + token
        }
        const response = await axios.post('http://127.0.0.1:8000/api/ratings/', data)
        return response.data
    }
}
