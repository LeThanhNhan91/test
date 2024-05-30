// registerApi.js
import axios from 'axios';

const BASE_URL = 'https://665821525c361705264700c9.mockapi.io/api/Users';

const registerUser = async (userName, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/users`, { userName, password });
        return response.data;
    } catch (error) {
        throw new Error('Registration failed');
    }
};

const addUserDetails = async (details) => {
    try {
        const response = await axios.post(`${BASE_URL}/userDetails`, details); // Assuming you have a userDetails endpoint
        return response.data;
    } catch (error) {
        throw new Error('Adding user details failed');
    }
};

export default {
    registerUser,
    addUserDetails,
};
