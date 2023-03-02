export default function Address({ address, balance, title }) {
    return (
        <>
            <hr />
            <h2>{title}</h2>
            <div className='balance'>Address: {address || '0x0...'}</div>
            <div className='balance'>Balance: {balance}</div>
        </>
    );
}
