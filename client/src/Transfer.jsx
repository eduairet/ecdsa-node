import { useState } from 'react';
import * as secp from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { utf8ToBytes } from 'ethereum-cryptography/utils';
import server from './server';
import Address from './Address';

function Transfer({ address, setBalance, signature, publicKey }) {
    const [sendAmount, setSendAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [recipientBalance, setRecipientBalance] = useState(0);

    const setValue = setter => e => setter(e.target.value);

    async function transfer(e) {
        e.preventDefault();
        setSuccess(false);
        // Verify that the transaction is valid
        try {
            // Create a hash for the amount to send
            const bytes = utf8ToBytes(sendAmount);
            const msgHash = keccak256(bytes);
            // Verify it
            const isValid = secp.verify(signature, msgHash, publicKey);
            // If it's valid the transaction is processed
            if (isValid) {
                // Sends the money to the recipient
                // and updates the balance
                const sent = await server.post(`send`, {
                    sender: address,
                    amount: parseInt(sendAmount),
                    recipient,
                });
                const senderBalance = sent.data.balance;
                setBalance(senderBalance);
                // Checks if the recipient exists
                // * If you send money to a non-existent
                // address you loose your money
                const received = await server.get(`balance/${recipient}`);
                const recipientBalance = received.data.balance;
                if (received.balance !== null) {
                    setRecipientBalance(recipientBalance);
                } else {
                    setRecipientBalance(0);
                    throw new Error(
                        "You sent money to an address that doesn't exist!"
                    );
                }
            } else {
                throw new Error('Invalid transaction!');
            }
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div className='container wallet'>
            <h1>Send Transaction</h1>
            <form className='transfer' onSubmit={transfer}>
                <label>
                    Send Amount
                    <input
                        placeholder='1, 2, 3...'
                        value={sendAmount}
                        onChange={setValue(setSendAmount)}
                        required={true}
                    ></input>
                </label>

                <label>
                    Recipient
                    <input
                        placeholder='Type an address, for example: 0x2'
                        value={recipient}
                        onChange={setValue(setRecipient)}
                        required={true}
                    ></input>
                </label>

                <input
                    type='submit'
                    className='button'
                    value='Transfer'
                    disabled={!address && !sendAmount && !recipient}
                />
            </form>
            <Address
                address={recipient}
                balance={recipientBalance}
                title='Recipient'
            />
        </div>
    );
}

export default Transfer;
