import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import  { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, bytesToHex as toHex } from "ethereum-cryptography/utils";

function Transfer() {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

    const [mySnderPubKey, setMysenderPubKey] = useState("")
    const [mySnderPrivateKey, setMysenderPrivateKey] = useState("")
    const[messageHash, setMessageHash]=useState("")
  const setValue = (setter) => (evt) => setter(evt.target.value);

    async function getTransactionSignature() {
       let signature = ''
       try {
           let messageHash = toHex(keccak256(utf8ToBytes("abc")))          
           setMessageHash(messageHash)
           const signature1 = await secp.sign(messageHash, mySnderPrivateKey);
           signature = await toHex(signature1)

       } catch (e) {
           alert(e)
       }
        //hash message
        
       return signature
    }
  async function transfer(evt) {
    evt.preventDefault();

      try {
          const signature = await getTransactionSignature()
          console.log('transfer signature: ', signature)
      const {
        data: { balance },
      } =
          await server.post(`send`, {
          sender: mySnderPubKey, //address,
          amount: parseInt(sendAmount),          
              recipient: recipient,
              signature: signature,
              messageHash: messageHash
      });
          // setBalance(balance);
          await alert('Your new balance: ' + balance)
    } catch (ex) {
          alert(ex.response.data.message);         
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
          <h1>Send Transaction</h1>

          <label>
              Sender Address:
              <input
                  placeholder="Type an address..."
                  value={mySnderPubKey}
                  onChange={setValue(setMysenderPubKey)}
              ></input>
          </label>
          <label>
              Sender Private Key
              <input
                  placeholder="Type a private key... "
                  value={mySnderPrivateKey}
                  onChange={setValue(setMysenderPrivateKey)}
              ></input>
          </label>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;


//function Transfer({ address, setBalance }) {
//    const [sendAmount, setSendAmount] = useState("");
//    const [recipient, setRecipient] = useState("");

//    const setValue = (setter) => (evt) => setter(evt.target.value);

//    async function transfer(evt) {
//        evt.preventDefault();

//        try {
//            const {
//                data: { balance },
//            } = await server.post(`send`, {
//                sender: address,
//                amount: parseInt(sendAmount),
//                recipient,
//            });
//            setBalance(balance);
//        } catch (ex) {
//            alert(ex.response.data.message);
//        }
//    }

//    return (
//        <form className="container transfer" onSubmit={transfer}>
//            <h1>Send Transaction</h1>

//            <label>
//                Send Amount
//                <input
//                    placeholder="1, 2, 3..."
//                    value={sendAmount}
//                    onChange={setValue(setSendAmount)}
//                ></input>
//            </label>

//            <label>
//                Recipient
//                <input
//                    placeholder="Type an address, for example: 0x2"
//                    value={recipient}
//                    onChange={setValue(setRecipient)}
//                ></input>
//            </label>

//            <input type="submit" className="button" value="Transfer" />
//        </form>
//    );
//}

//export default Transfer;

