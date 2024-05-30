// usersApi.js
import axios from 'axios';

const BASE_URL = 'https://665821525c361705264700c9.mockapi.io/api/Users'; // api từ back-end - đang dùng mock-api

const loginUser = async (userName, password) => {
    try {
        const response = await axios.get(`${BASE_URL}/users`, { //users là endpoint
            params: {
                userName,
                password
            }
        });
        const users = response.data;
        return users.find(user => user.userName === userName && user.password === password);
    } catch (error) {
        throw new Error('Login failed');
    }
};

export default {
    loginUser,
};
