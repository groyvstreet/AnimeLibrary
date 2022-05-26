import axios from "axios";

export default class AnimesService {
    static async get(genres, status, user = '') {
        const response = await axios.get(`http://127.0.0.1:8000/api/animes/?genre=${genres}&status=${status}&user=${user}`)
        return response.data
    }

    static async getById(id) {
        const response = await axios.get(`http://127.0.0.1:8000/api/animes/${id}/`)
        return response.data
    }
}
