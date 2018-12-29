import express from 'express';
import axios from 'axios';
import Web3 from 'web3';

import wrap from '../../middlewares/wrap';

const router = express.Router();
const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

router.get('/', wrap(async (req, res) => {
    let coinbase = web3.eth.coinbase;
    let balance = web3.eth.getBalance(coinbase);

    res.status(200).json({
        balance: balance.toString(1)
    });
}));

export default router;
