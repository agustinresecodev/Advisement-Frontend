import axios from "axios";

//Get all cases
export const getAllCases = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get("http://localhost:3000/api/cases", config);
        return response;
    } catch (error) {
        return error.response;
    }
}

//Get case by id

export const getCaseById = async (id,token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`http://localhost:3000/api/cases/${id}`, config);
        return response;
    } catch (error) {
        return error.response;
    }
}

//edit case by id
export const editCaseCall = async (id, caseData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.put(`http://localhost:3000/api/cases/${id}`, caseData, config);
        return response;
    } catch (error) {
        return error.response;
    }
}