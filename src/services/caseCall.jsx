import axios from "axios";

//Get all cases
export const getAllCases = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        if(!token) {return }
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
        if(!id || !token) {return }
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
        if(!id || !token ||!caseData) {return }
        const response = await axios.put(`http://localhost:3000/api/cases/${id}`, caseData, config);
        return response;
    } catch (error) {
        return error.response;
    }
}

//delete case by id
export const deleteCaseCall = async (id, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        if(!id || !token) {return }
        const response = await axios.delete(`http://localhost:3000/api/cases/${id}`, config);
        return response;
    } catch (error) {
        return error.response;
    }
}

//create case
export const createCaseCall = async (caseData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        if(!caseData || !token) {return }
        const response = await axios.post("http://localhost:3000/api/cases", caseData, config);
        return response;
    } catch (error) {
        return error.response;
    }
}

//Get Case By tech ID
export const getCaseByUserId = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        if(!token) {return }
        const response = await axios.get(`http://localhost:3000/api/cases/technician/`, config);
        
        return response;
    } catch (error) {
        return error.response;
    }
}