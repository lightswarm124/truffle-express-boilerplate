"use strict";
require('dotenv').config();

import axios from axios;
import jwt from jsonwebtoken;

class jwtPayload {
  constructor() {
    this.currentBlockHeight;
    this.txMerkleRoot;
    this.expiryBlockHeight;
  }
}
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

let payload = await {
  bkh: blockHeight,
  mkr: merkleRoot,
  ebn: blockHeight + 1
};

await jwt.sign(payload, process.env.SECRET1, { algorithm: 'HS256', noTimestamp: true });
