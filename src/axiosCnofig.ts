
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:4000', // Your base URL here
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
