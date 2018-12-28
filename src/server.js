require('dotenv').config();
import express from 'express';
import morgan  from 'morgan';
import helmet  from 'helmet';
import axios from 'axios';
import bodyParser  from 'body-parser';

import middlewares  from './middlewares/middlewares';
import wrap  from './middlewares/wrap';

const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());

app.get('/', wrap(async (req, res) => {
    res.status(200).json({
        data: "Hello"
    });
}));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});

module.exports = app;
