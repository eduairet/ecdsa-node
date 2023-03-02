import axios from 'axios';

const server = axios.create({
    baseURL: 'https://ecdsa-node.web.app:3042',
});

export default server;
