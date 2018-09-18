const jwt = require('jsonwebtoken');
const request = require('supertest');

let jwtTest = require('./JWTBlockchainPayload');

const cert = 'bitcoincash:qz8wl7reul0z8sxp9h7hyxduhq6cvfllksltczkkgp';

async function testJWTToken() {
  let signedData = await jwtTest();
  await console.log(signedData);
  let validation = await jwt.verify(signedData, cert, { ignoreExpiration: true })
  await console.log(validation);
}

setInterval(() => {
  testJWTToken()
}, 30000);
