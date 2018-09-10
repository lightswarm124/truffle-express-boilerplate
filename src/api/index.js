const express = require('express');

const emojis = require('./emojis');
const blockData = require('./blockchain/bchblockchain');
const addressData = require('./blockchain/addresses');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/blockdata', blockData);
router.use('/addressdata', addressData);

module.exports = router;
