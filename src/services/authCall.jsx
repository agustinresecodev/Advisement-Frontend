import axios from "axios";

// Base URL
const baseURL = "http://localhost:3000/api/";

//Register
export const registerNewUserCall = async (credentials) => {
    try {
        const response = await axios.post(`${baseURL}auth/register`, credentials);
        return response;
    } catch (error) {
        return error.response;
    }
}


//Login
export const loginUserCall = async (credentials) => {
    try {
        const response = await axios.post(`${baseURL}auth/login`, credentials);
        return response;
    } catch (error) {
        return error.response;
    }
}

