import axios from 'axios';

const server = axios.create({
    baseURL: 'https://ecdsa-node.web.app',
});

export default server;
