require('dotenv').config();
const jwt = require('jsonwebtoken');
const request = require('supertest');
const axios = require('axios');

let jwtTest = require('./JWTBlockchainPayload');

let validation;

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
      let validation = jwt.verify(signedData, process.env.SECRET, { ignoreExpiration: true });
      console.log('Signature Authentication Successful');
    } catch (err) {
      console.log('Incorrect Signature Authentication');
    }
  } else {
    console.log('Invalid Token Provided');
  }
}
