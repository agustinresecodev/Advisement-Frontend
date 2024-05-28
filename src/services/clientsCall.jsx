import axios from "axios";

// BASE URL
const baseURL = "http://localhost:3000/api/";

//GET ALL CLIENTS
export const getAllClientsCall = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`${baseURL}clients`, config);
        return response;
    } catch (error) {
        return error.response;
    }
}

//GET CLIENT BY ID
export const getClientById = async (id,token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`${baseURL}clients/${id}`, config);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const editClientCall = async (id, data,token) => {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.put(`${baseURL}clients/${id}`, data, config);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const deleteClientCall = async (id,token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.delete(`${baseURL}clients/${id}`, config);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const createClientCall = async (data,token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(`${baseURL}clients`, data, config);
        return response;
    } catch (error) {
        return error.response;
    }
}