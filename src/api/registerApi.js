// registerApi.js
import axios from 'axios';

const BASE_URL = 'https://665821525c361705264700c9.mockapi.io/api/Users';

const registerUser = async (userName, password, name, email, phone) => {
    try {
        // Save user details
        const userDetailsResponse = await axios.post(`${BASE_URL}/userDetails`, { name, email, phone, userName });
        
        // Save userName and password
        const userResponse = await axios.post(`${BASE_URL}/users`, { userName, password });
        
        return {
            userDetails: userDetailsResponse.data,
            user: userResponse.data
        };
    } catch (error) {
        throw new Error('Registration failed');
    }
};

export default {
    registerUser,
};

