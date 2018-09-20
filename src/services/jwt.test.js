const jwt = require('jsonwebtoken');
const request = require('supertest');
const axios = require('axios');

let jwtTest = require('./JWTBlockchainPayload');

const pubkey = 'bitcoincash:qz8wl7reul0z8sxp9h7hyxduhq6cvfllksltczkkgp';
const pubkey1 = 'bitcoincash:qqnu8fh9w0jyp2rmtnuv9nxz8a0gzy7t2q5rugw4kh';
let validation = '';

/*
async function testJWTToken() {
  let signedData = await jwtTest();
  await console.log('\nJWT Token: ', signedData);
  let decodeMessage = await jwt.decode(signedData, { complete: true });
  await console.log('\nDecode JWT: ', decodeMessage);
  let validation = await jwt.verify(signedData, server, { ignoreExpiration: true });
  await console.log('\nValidation: ', validation);
}
*/

//setInterval(() => {
//testJWTToken();
testAuthentication();
//}, 30000);

async function testAuthentication() {
  let blockHeight = await axios.get('https://rest.bitcoin.com/v1/blockchain/getBlockCount')
    .then(result => {
      return result.data;
    })
    .catch(err => {
      return err;
    });

  let signedData = await jwtTest();
  let decodeMessage = await jwt.decode(signedData, { complete: true });
  await console.log(decodeMessage);
  let JWTbkh = await decodeMessage.payload.bkh;
  let JWTebn = await decodeMessage.payload.ebn;

  if (JWTbkh === blockHeight && JWTebn > blockHeight) {
    try {
      let validation = jwt.verify(signedData, pubkey, { ignoreExpiration: true });
      console.log('Signature Authentication Successful');
    } catch (err) {
      console.log('Incorrect Signature Authentication');
    }
  } else {
    console.log('Invalid Token Provided');
  }
}
