import axios from "axios";

// BASE URL
const baseURL = "http://localhost:3000/api/";

//GET ALL CLIENTS
export const getAllClientsCall = async () => {
    try {
        const response = await axios.get(`${baseURL}clients`);
        return response;
    } catch (error) {
        return error.response;
    }
}

//GET CLIENT BY ID
export const getClientById = async (id) => {
    try {
        const response = await axios.get(`${baseURL}clients/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const editClientCall = async (id, data) => {
    try {
        const response = await axios.put(`${baseURL}clients/${id}`, data);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const deleteClientCall = async (id) => {
    try {
        const response = await axios.delete(`${baseURL}clients/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
}