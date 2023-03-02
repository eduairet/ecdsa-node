const secp = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');
const { toHex } = require('ethereum-cryptography/utils');

// Generate Private and Public keys
const privKey = secp.utils.randomPrivateKey();
const pubKey = secp.getPublicKey(privKey);
// Take the last 20 bytes of the public key without the first byte
const address = keccak256(pubKey.slice(1)).slice(-20, this.length);
// Add the first byte format of the address
const stringAddress = `0x${toHex(address)}`;

console.log('Private key:', toHex(privKey));
console.log('Public key: ', toHex(pubKey));
console.log('Address:    ', stringAddress);
