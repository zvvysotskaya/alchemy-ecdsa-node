import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";


function App() {

    return (
        <>
            <div className="app">
                <Wallet />
                <Transfer />
            </div>
            <br />
            <h3>Users</h3>
            <p>User1</p>
            <p>address: 049110d7ebfb51ffdc9ae844e644c6b8f4f2806120c08952edc5a680493a710c58a65e9a42ed2aa07f2b54f092e6af16d3867e93f63a8633556aebca16bf43cdcb</p>
            <p>private key: 0159c0fdf975f6d8b7ebf5ddf68bdafb71f38ed30104c8b089ad130483da0d8a </p>
            <br />
            <p>User2</p>
            <p>address: 04437a12bff3f66a3eb5f498a129353043c1514e0fb7104ba7faad685a6effb31b4b006e237da062d845e5a26ba7f56ca9b459e482ac9df15a5b6cc4380331ef10</p>
            <p>private key: 055ec18151fbe73eade731572646a3a2a7d0156be203069452829db4ad846155</p>
            <p>User3</p>
            <p>address:  0413f1c0eb50b7e9cf348c03c611e207a82bcd5690587eae4b402debf0333d1d6ace09ad50d92a7a4dc0a9b400ace9cda674b233c1425aa072a736be3d820763e8</p>
            <p>private key: 14fb4b10749b7876cc9ab0b5c19e852ee92809f14e1645882b60ac0c5b46d9eb </p>
            <br />
        </>
    );
}

export default App;

//function App() {
//    const [balance, setBalance] = useState(0);
//    const [address, setAddress] = useState("");

//    return (
//        <div className="app">
//            <Wallet
//                balance={balance}
//                setBalance={setBalance}
//                address={address}
//                setAddress={setAddress}
//            />
//            <Transfer setBalance={setBalance} address={address} />
//        </div>
//    );
//}

//export default App;
