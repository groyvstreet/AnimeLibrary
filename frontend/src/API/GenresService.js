import axios from "axios";

export default class GenresService {
    static async getAll() {
        const response = await axios.get('http://127.0.0.1:8000/api/genres/')
        return response.data
    }
}
