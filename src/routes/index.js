import express from 'express';
import axios from 'axios';

import wrap from '../middlewares/wrap';
import sampleRoute from './api/sampleRoute';

const router = express.Router();

router.get('/', wrap(async (req, res) => {
    res.status(200).json({
        data: "Truffle Express Boilerplate"
    });
}));

router.use('/sample', sampleRoute);

export default router;
