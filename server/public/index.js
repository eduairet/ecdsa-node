const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;

app.use(cors({ origin: true }));
app.use(express.json());

const balances = {
    // 09d3c798acc21147b3c32605aeb3baf82b8c68a3211b05058563a223e88cd114
    '0x75a65075f3d8e12453e509f7c9bc06e3bfe36dc1': 100,
    // 2ff811ed2a17663f80f2d0a7b5c1a1829bccadd359a0068457acaf33ef195940
    '0x6553a62a32921cc08147e32a43689db436916f2f': 50,
    // ea9b79245c9cb31962b56cbeebfc4a1d1a527e0acafd90ae87576823bc570804
    '0xd55ffe330860e3ea0ba2918bcd7bf65e628fcad9': 75,
};

app.get('/balance/:address', (req, res) => {
    const { address } = req.params;
    const balance = balances[address] || null;
    res.send({ balance });
});

app.post('/send', (req, res) => {
    const { sender, recipient, amount } = req.body;

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
        res.status(400).send({ message: 'Not enough funds!' });
    } else {
        balances[sender] -= amount;
        balances[recipient] += amount;
        res.send({ balance: balances[sender] });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}
