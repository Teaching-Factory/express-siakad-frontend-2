import axios from 'axios';
import { API_URL } from './../config/config';
import { getToken } from './../service/auth';
import Swal from 'sweetalert2';

export const get = async (url, props = {}) => {
    try {
        const token = getToken();

        if (!token) {
            throw new Error('No token found');
        }
        // console.log(token);

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

        const headers = {
            Authorization: token
        };

        if (body instanceof FormData) {
            headers['Content-Type'] = 'multipart/form-data';
        } else {
            headers['Content-Type'] = 'application/json';
        }

        const res = await axios.post(`${API_URL}/${url}`, body, {
            headers: headers
        });

        if (res.status < 200 || res.status >= 300) {
            throw new Error(`Failed to add data to server with status ${res.status}`);
        }

        return { status: res.status, data: res.data };
    } catch (err) {
        throw err;
    }
};

export const putData = async (url, body, props = {}) => {
    try {
        const token = getToken(); // Pastikan Anda mendapatkan token dari suatu sumber yang sesuai

        if (!token) {
            throw new Error('No token found');
        }

        const headers = {
            Authorization: token
        };

        if (body instanceof FormData) {
            headers['Content-Type'] = 'multipart/form-data';
        } else {
            headers['Content-Type'] = 'application/json';
        }

        const res = await axios.put(`${API_URL}/${url}`, body, {
            headers: headers
        });

        if (res.status < 200 || res.status >= 300) {
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
                'Authorization': `${token}`
            },
            mode: 'cors'
        });

        return { status: res.status, data: data };
    } catch (err) {
        throw err;
    }
};


export const delData = async (url) => {
    try {
        const token = getToken();
        const res = await fetch(`${API_URL}/${url}`,{
            method: 'DELETE',            
            headers: {
                'Accept': 'aplication/json',
                'Authorization': `${token}`
            }
        });
        
        if (!res.ok) {
            throw new Error('Network response was not oke');
        }

        const responseData = await res.json();
        Swal.close();
        return { status: res.status, data: responseData };
    } catch (error) {
        throw error
    }
}
export const post = async (url, body, config = {}) => {
    try {
        const res = await fetch(`${API_URL}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...config.headers
            },
            body: JSON.stringify(body),
            mode: 'cors'
        });

        if (!res.ok) {
            throw new Error('Network response was not oke');
        }

        const responseData = await res.json();
        Swal.close();
        return { status: res.status, data: responseData };
    } catch (error) {
        throw error;
    }
};


export const getData = async (url, config = {}) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('No token found');
        }

        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            timer: 1000,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const res = await fetch(`${API_URL}/${url}`, {
            method: 'get',
            headers: {
                "accept" : "aplication/json",
                "Authorization": `${token}`,
                ...config?.headers
            },
            mode: 'cors'
        });
        Swal.close()
        var data = await res.json()
        return { status: res.status, data: data}
    } catch (err) {
        throw err
    }   
}

export const createData = async (url, body) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('No token found');
        }
        
        const res = await fetch(`${API_URL}/${url}`, {
            method: 'POST',
            headers: {
                "Content-Type": "aplication/json",
                "Authorization": `${token}`,
            },
            body: body,
            mode: 'cors'
        });
        const resData = await res.json()
        Swal.close()
        return { status: res.status, data: resData}
    } catch (err) {
        throw err
    }   
}