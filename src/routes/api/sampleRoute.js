import express from 'express';
import axios from 'axios';
import getWeb3 from '../../utils/getWeb3';

import wrap from '../../middlewares/wrap';

const router = express.Router();

router.get('/', wrap(async (req, res) => {
    const web3 = await getWeb3();
    const coinbase = await web3.eth.getCoinbase();
    const weiBalance = await web3.eth.getBalance(coinbase);
    const coinbaseBalance = await web3.utils.fromWei(weiBalance, 'ether')

    await res.status(200).json({
        balance: coinbaseBalance
    });
}));

export default router;
