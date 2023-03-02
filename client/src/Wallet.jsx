import * as secp from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { toHex } from 'ethereum-cryptography/utils';
import server from './server';
import Address from './Address';

function Wallet({
    address,
    setAddress,
    balance,
    setBalance,
    amountHash,
    setAmountHash,
    signature,
    setSignature,
    recoveryBit,
    setRecoveryBit,
    setPublicKey,
}) {
    // Input changes
    const setValue = setter => e => setter(e.target.value);
    // The data from the signature is used to get the address and balance
    // wen the users submit their values
    async function getBalanceAndAddress(e) {
        e.preventDefault();
        // Get the address from public key
        try {
            const pubKey = secp.recoverPublicKey(
                amountHash,
                signature,
                +recoveryBit
            );
            const arrAddress = keccak256(pubKey.slice(1)).slice(
                -20,
                pubKey.length
            );
            const address = `0x${toHex(arrAddress)}`;
            // If it's valid, and it's in the server
            // returns the address and balance
            if (arrAddress.length) {
                // Set the states
                const {
                    data: { balance },
                } = await server.get(`balance/${address}`);
                if (balance !== null) {
                    setPublicKey(pubKey);
                    setAddress(address);
                    setBalance(balance);
                } else {
                    setPublicKey('');
                    setAddress('');
                    setBalance(0);
                }
            }
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div className='container wallet'>
            <h1>Your Signature</h1>
            <form className='transfer' onSubmit={getBalanceAndAddress}>
                <label>
                    Amount hash
                    <input
                        placeholder='Type your amount hash'
                        value={amountHash}
                        onChange={setValue(setAmountHash)}
                        required={true}
                    ></input>
                </label>
                <label>
                    Signature hash
                    <input
                        placeholder='Type your signature hash'
                        value={signature}
                        onChange={setValue(setSignature)}
                        required={true}
                    ></input>
                </label>
                <label>
                    Recovery bit
                    <input
                        placeholder='1, 2, 3...'
                        value={recoveryBit}
                        onChange={setValue(setRecoveryBit)}
                        required={true}
                    ></input>
                </label>
                <input
                    type='submit'
                    className='button'
                    value='Check'
                    disabled={!amountHash && !signature && !recoveryBit}
                />
            </form>
            <Address address={address} balance={balance} title='Sender' />
        </div>
    );
}

export default Wallet;
