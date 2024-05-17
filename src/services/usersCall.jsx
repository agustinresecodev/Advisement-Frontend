import axios from "axios";
import { useSelector } from "react-redux";
import { getUserData } from "../components/Slicers/userSlicer";

// Base URL
const baseURL = "http://localhost:3000/api/";



//get self user
export const getSelfUser = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(`${baseURL}users/profile`, config);
        return response;
    } catch (error) {
        return error.response;
    }
}

//edit self profile
export const editSelfProfile = async (userData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.put(`${baseURL}users/profile`, userData, config);
        return response;
    } catch (error) {
        return error.response;
    }
}