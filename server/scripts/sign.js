const secp = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');
const { utf8ToBytes, toHex } = require('ethereum-cryptography/utils');
const prompt = require('prompt-sync')({ sigint: true });

// First get private key and amount from the user
const privKey = prompt('What is your Private Key? ');
console.log('Private Key: ', privKey);
const amount = prompt('Type the ammount of your transfer: ');
const amountHash = hashMessage(amount);
console.log('Amount hash: ', toHex(amountHash));

// Sign the message and check the console
signMessage(amountHash, privKey);

// Utils
function hashMessage(message) {
    const bytes = utf8ToBytes(message),
        hash = keccak256(bytes);
    return hash;
}
async function signMessage(messageHash, privKey) {
    const promise = await secp.sign(messageHash, privKey, {
        recovered: true,
    });
    const key = secp.recoverPublicKey(messageHash, promise[0], promise[1]);
    const address = `0x${toHex(
        keccak256(key.slice(1)).slice(-20, this.length)
    )}`;
    console.log('Signature hash: ', toHex(promise[0]));
    console.log('Recovery bit: ', promise[1]);
    console.log('Public Key: ', toHex(key));
    console.log('Address: ', address);
    return { hash: promise[0], bit: promise[1], key };
}
