require('dotenv').config();
const jwt = require('jsonwebtoken');
const request = require('supertest');
const axios = require('axios');

let jwtTest = require('./JWTBlockchainPayload');

async function testAuthentication() {
  let validation;
  let blockHeight = await axios.get('https://rest.bitcoin.com/v1/blockchain/getBlockCount')
    .then(result => {
      return result.data;
    })
    .catch(err => {
      return err;
    });

  let merkleRoot = await axios.get(`https://rest.bitcoin.com/v1/block/details/${blockHeight}`)
    .then(result => {
      return result.data.merkleroot;
    })
    .catch(err => {
      return err;
    });

  let signedData = await jwtTest();
  let decodeMessage = await jwt.decode(signedData, { complete: true });
  await console.log(decodeMessage);
  let JWTbkh = await decodeMessage.payload.bkh;
  let JWTebn = await decodeMessage.payload.ebn;
  let JWTmkr = await decodeMessage.payload.mkr;

  if (JWTbkh === blockHeight && JWTmkr === merkleRoot && JWTebn > blockHeight) {
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

testAuthentication();
