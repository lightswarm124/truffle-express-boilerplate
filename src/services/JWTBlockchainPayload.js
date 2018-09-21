require('dotenv').config();
const axios = require('axios');
const jwt = require('jsonwebtoken');

module.exports = async (expirationBlock) => {
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

  return await jwt.sign(payload, process.env.SECRET1, { algorithm: 'HS256', noTimestamp: true });
};
