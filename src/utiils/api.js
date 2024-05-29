// api.js
import { getToken } from '../service/auth';
import { API_URL } from '../config/config';

const fetchWithAuth = async (url, options = {}) => {
    const token = getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` })
    };

    const response = await fetch(`${API_URL}/${url}`, {
        ...options,
        headers
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
};

export default fetchWithAuth;
