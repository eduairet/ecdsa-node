import Wallet from './Wallet';
import Transfer from './Transfer';
import './App.scss';
import { useState } from 'react';

function App() {
    const [balance, setBalance] = useState(0);
    const [address, setAddress] = useState('');
    const [amountHash, setAmountHash] = useState('');
    const [signature, setSignature] = useState('');
    const [recoveryBit, setRecoveryBit] = useState('');
    const [publicKey, setPublicKey] = useState([]);

    return (
        <div className='app'>
            <Wallet
                balance={balance}
                setBalance={setBalance}
                address={address}
                setAddress={setAddress}
                amountHash={amountHash}
                setAmountHash={setAmountHash}
                signature={signature}
                setSignature={setSignature}
                recoveryBit={recoveryBit}
                setRecoveryBit={setRecoveryBit}
                setPublicKey={setPublicKey}
            />
            <Transfer
                setBalance={setBalance}
                address={address}
                signature={signature}
                publicKey={publicKey}
            />
        </div>
    );
}

export default App;
