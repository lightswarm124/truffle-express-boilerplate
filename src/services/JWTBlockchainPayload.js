const axios = require('axios');
const jwt = require('jsonwebtoken');

const wrap = require('../../middlewares/wrap');

const pubkey = 'bitcoincash:qz8wl7reul0z8sxp9h7hyxduhq6cvfllksltczkkgp';
const pubkey1 = 'bitcoincash:qqnu8fh9w0jyp2rmtnuv9nxz8a0gzy7t2q5rugw4kh';

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

  return await jwt.sign(payload, pubkey, { algorithm: 'HS256', noTimestamp: true });
};
