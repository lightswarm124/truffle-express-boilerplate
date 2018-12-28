import express from 'express';
import axios from 'axios';

import wrap from '../../middlewares/wrap';

const router = express.Router();

router.get('/', wrap(async (req, res) => {
    res.status(200).json({
        data: "Sample Route"
    });
}));

export default router;
