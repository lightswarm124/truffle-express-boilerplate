import express from 'express';
import axios from 'axios';

import getWeb3 from '../../utils/getWeb3';
import getContract from '../../utils/getContract';
import wrap from '../../middlewares/wrap';

import FixedSupplyERC20 from '../../../build/contracts/FixedSupplyERC20.json';

const router = express.Router();

router.get('/', wrap(async (req, res) => {
    const web3 = await getWeb3();
    const coinbase = await web3.eth.getCoinbase();
    const weiBalance = await web3.eth.getBalance(coinbase);
    const coinbaseBalance = await web3.utils.fromWei(weiBalance, 'ether')
    const contract = await getContract(web3, FixedSupplyERC20);
    const networkId = await web3.eth.net.getId();
    const deployedAddress = FixedSupplyERC20.networks[networkId].address; 

    await res.status(200).json({
        address: coinbase,
        balance: coinbaseBalance,
        networkId: networkId,
        deployedAddress: deployedAddress
    });
}));

export default router;
