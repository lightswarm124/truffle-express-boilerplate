const express = require('express');
const axios = require('axios');

const wrap = require('../../middlewares/wrap');

const BITBOX = require('bitbox-cli/lib/bitbox-cli').default;
const router = express.Router();

const BITBOX = new BITBOX();


module.exports = router;
