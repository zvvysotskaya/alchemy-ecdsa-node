const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");


app.use(cors());
app.use(express.json());

//public1: 049110d7ebfb51ffdc9ae844e644c6b8f4f2806120c08952edc5a680493a710c58a65e9a42ed2aa07f2b54f092e6af16d3867e93f63a8633556aebca16bf43cdcb
//private1: 0159c0fdf975f6d8b7ebf5ddf68bdafb71f38ed30104c8b089ad130483da0d8a

//public2: 04437a12bff3f66a3eb5f498a129353043c1514e0fb7104ba7faad685a6effb31b4b006e237da062d845e5a26ba7f56ca9b459e482ac9df15a5b6cc4380331ef10
//private2: 055ec18151fbe73eade731572646a3a2a7d0156be203069452829db4ad846155

//public3: 0413f1c0eb50b7e9cf348c03c611e207a82bcd5690587eae4b402debf0333d1d6ace09ad50d92a7a4dc0a9b400ace9cda674b233c1425aa072a736be3d820763e8
//private3:  14fb4b10749b7876cc9ab0b5c19e852ee92809f14e1645882b60ac0c5b46d9eb

const balances = {
    "049110d7ebfb51ffdc9ae844e644c6b8f4f2806120c08952edc5a680493a710c58a65e9a42ed2aa07f2b54f092e6af16d3867e93f63a8633556aebca16bf43cdcb": 100,
    "04437a12bff3f66a3eb5f498a129353043c1514e0fb7104ba7faad685a6effb31b4b006e237da062d845e5a26ba7f56ca9b459e482ac9df15a5b6cc4380331ef10": 50,
    "0413f1c0eb50b7e9cf348c03c611e207a82bcd5690587eae4b402debf0333d1d6ace09ad50d92a7a4dc0a9b400ace9cda674b233c1425aa072a736be3d820763e8": 75,
};

app.get("/balance/:address", (req, res) => {
    const { address } = req.params;
    const balance = balances[address] || 0;
    res.send({ balance });
});

app.post("/send", (req, res) => {

    const { sender, recipient, amount, signature, messageHash } = req.body;

    const isSigned = secp.verify(signature, messageHash, sender);
    console.log('signed? ', isSigned)
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (isSigned) {
        if (balances[sender] < amount) {
            res.status(400).send({ message: "Not enough funds!" });
        } else {
            balances[sender] -= amount;
            balances[recipient] += amount;
            res.send({ balance: balances[sender] });
        }
    } else {
        res.status(400).send({ message: "You are not the owner of the wallet!" });
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








//const balances = {
//    "0x1": 100,
//    "0x2": 50,
//    "0x3": 75,
//};

//app.get("/balance/:address", (req, res) => {
//    const { address } = req.params;
//    const balance = balances[address] || 0;
//    res.send({ balance });
//});

//app.post("/send", (req, res) => {
//    const { sender, recipient, amount } = req.body;

//    setInitialBalance(sender);
//    setInitialBalance(recipient);

//    if (balances[sender] < amount) {
//        res.status(400).send({ message: "Not enough funds!" });
//    } else {
//        balances[sender] -= amount;
//        balances[recipient] += amount;
//        res.send({ balance: balances[sender] });
//    }
//});

//app.listen(port, () => {
//    console.log(`Listening on port ${port}!`);
//});

//function setInitialBalance(address) {
//    if (!balances[address]) {
//        balances[address] = 0;
//    }
//}
