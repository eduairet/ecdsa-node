import axios from 'axios';

const server = axios.create({
    baseURL: 'https://ecdsa-node.web.app',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
    },
});

export default server;
