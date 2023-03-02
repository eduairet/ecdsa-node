import axios from 'axios';

const server = axios.create({
    baseURL: 'https://ecdsa-node-297s.vercel.app',
});

export default server;
