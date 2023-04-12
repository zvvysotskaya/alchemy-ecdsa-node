const { keccak256 } = require("ethereum-cryptography/keccak");
const { createPrivateKeySync, ecdsaSign } = require("ethereum-cryptography/secp256k1");
const secp = require("ethereum-cryptography/secp256k1");
const { hexToBytes, toHex, utf8ToBytes } = require("ethereum-cryptography/utils")
//utils.randomPrivateKey() - gennerate randome private key that required by eleptic curve cryptography
const private = secp.utils.randomPrivateKey() 
console.log('private key: ' + toHex(private))
const publicKey = secp.getPublicKey(private);

console.log('public key: ',toHex(publicKey))