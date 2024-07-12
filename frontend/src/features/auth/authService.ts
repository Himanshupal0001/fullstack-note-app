import axios from "axios";
import { IUserData } from "../../types/registerType";
const API_URL = '/api/users/';


const register = async (userData: IUserData) => {
    try {
        const response = await axios.post(API_URL + 'register', userData);
        console.log(response.data, typeof response.data);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

const login = async (userData: IUserData) => {
    try {
        const response = await axios.post(API_URL + 'login', userData);
        console.log(response.data, typeof response.data);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

const logout = (): void => {
    localStorage.removeItem('user');
}
const authService = { register, logout, login };

export default authService;
