import axios from 'axios';
import { API_URL } from './../config/config';
import { getToken } from './../service/auth';

export const get = async (url, props = {}) => {
    try {
        const token = getToken();

        if (!token) {
            throw new Error('No token found');
        }
        console.log(token);

        const response = await axios.get(`${API_URL}/${url}`, {
            headers: {
                Authorization: token
            },
            mode: 'cors'
        });

        if (response.status !== 200) {
            throw new Error(`Gagal mendapatkan data dari server dengan status ${response.status}`);
        }

        const data = response.data;
        console.log('Data yang diperoleh:', data);
        return { status: response.status, data };
    } catch (err) {
        if (err.response) {
            console.error(`Request failed with status ${err.response.status}:`, err.response.data);
            throw new Error(`Request failed with status ${err.response.status}: ${err.response.data}`);
        } else if (err.request) {
            console.error('No response received:', err.request);
            throw new Error('No response received from server.');
        } else {
            console.error('Error setting up request:', err.message);
            throw new Error(`Error setting up request: ${err.message}`);
        }
    }
};
export const postData = async (url, body, props = {}) => {
    try {
        const token = getToken(); // Pastikan Anda mendapatkan token dari suatu sumber yang sesuai

        if (!token) {
            throw new Error('No token found');
        }

        const res = await axios.post(`${API_URL}/${url}`, body, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        });

        if (res.status !== 201) {
            throw new Error(`Failed to add data to server with status ${res.status}`);
        }

        return { status: res.status, data: res.data };
    } catch (err) {
        throw err;
    }
};

export const del = async (url, props = {}) => {
    try {
        const token = getToken();

        if (!token) {
            throw new Error('No token found');
        }
        const res = await axios.delete(`${API_URL}/${url}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            mode: 'cors'
        });

        return { status: res.status, data: data };
    } catch (err) {
        throw err;
    }
};
