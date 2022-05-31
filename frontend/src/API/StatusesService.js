import axios from "axios";

export default class StatusesService {
    static async getAll() {
        const response = await axios.get('http://127.0.0.1:8000/api/statuses/')
        return response.data
    }

    static async getById(id) {
        const response = await axios.get(`http://127.0.0.1:8000/api/statuses/${id}`)
        return response.data
    }
}
