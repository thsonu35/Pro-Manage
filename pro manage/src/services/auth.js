import axios from 'axios';

export const register = async (data) => {
    try {
        const response = await axios.post("http://localhost:3000/auth/register", data);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response) {
            return error.response.data;
        } else {
            return { status: 'error', message: 'An error occurred while registering' };
        }
    }
};

export const login = async (data) => {
    try {
        const response = await axios.post("http://localhost:3000/auth/login", data);
        return response;
    } catch (error) {
        console.log(error);
        if (error.response) {
            return error.response.data;
        } else {
            return { status: 'error', message: 'An error occurred while logging in' };
        }
    }
};
