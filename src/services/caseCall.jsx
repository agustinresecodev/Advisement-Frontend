import axios from "axios";

//Get all cases
export const getAllCases = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/cases");
        return response;
    } catch (error) {
        return error.response;
    }
}

//Get case by id

export const getCaseById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/cases/${id}`);
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