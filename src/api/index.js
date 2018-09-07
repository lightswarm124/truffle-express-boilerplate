const express = require('express');

const emojis = require('./emojis');
const height = require('./bitcoin/bitcoin');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏' 
  });
});

router.use('/emojis', emojis);
router.use('/height', height);

module.exports = router;
