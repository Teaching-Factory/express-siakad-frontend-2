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
