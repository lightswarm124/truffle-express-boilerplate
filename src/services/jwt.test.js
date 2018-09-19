const jwt = require('jsonwebtoken');
const request = require('supertest');

let jwtTest = require('./JWTBlockchainPayload');

const cert = 'bitcoincash:qz8wl7reul0z8sxp9h7hyxduhq6cvfllksltczkkgp';

async function testJWTToken() {
  let signedData = await jwtTest(1);
  await console.log('\nJWT Token: ', signedData);
  let decodeMessage = await jwt.decode(signedData, { complete: true });
  await console.log('\nDecode JWT: ', decodeMessage);
  let validation = await jwt.verify(signedData, cert, { ignoreExpiration: true });
  await console.log('\nValidation: ', validation);
}

//setInterval(() => {
testJWTToken();
//}, 30000);
