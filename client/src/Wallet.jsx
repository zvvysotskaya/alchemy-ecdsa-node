import { useState } from "react";
import server from "./server";
//{ balance, setBalance }
function Wallet() {
    const[balance, setBalance]=useState(0)
    const [address, setAddress] = useState('')

    async function onChange(evt) {
        const address = evt.target.value;
        setAddress(address);
        if (address) {
            const {
                data: { balance },
            } = await server.get(`balance/${address}`);
            setBalance(balance);
        } else {
            setBalance(0);
        }
    }

    return (
        <div className="container wallet">
            <h1>Your Wallet</h1>

            <label>
                Wallet Address
                <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
            </label>

            <div className="balance">Balance: {balance}</div>
        </div>
    );
}

export default Wallet;

//function Wallet({ address, setAddress, balance, setBalance }) {
//    async function onChange(evt) {
//        const address = evt.target.value;
//        setAddress(address);
//        if (address) {
//            const {
//                data: { balance },
//            } = await server.get(`balance/${address}`);
//            setBalance(balance);
//        } else {
//            setBalance(0);
//        }
//    }

//    return (
//        <div className="container wallet">
//            <h1>Your Wallet</h1>

//            <label>
//                Wallet Address
//                <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
//            </label>

//            <div className="balance">Balance: {balance}</div>
//        </div>
//    );
//}

//export default Wallet;

