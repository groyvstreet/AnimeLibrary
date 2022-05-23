import axios from "axios";

export default class UsersService {
    static async getAuth() {
        const response = await axios.get('http://127.0.0.1:8000/api/user/')
        return response.data
    }
}
