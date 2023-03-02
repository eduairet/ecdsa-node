import axios from 'axios';

const server = axios.create({
    baseURL: import.meta.env.SERVER_URL,
});

export default server;
