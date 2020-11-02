require('dotenv').config();
import express from 'express';
import api from './api/index';
import cookieParser from 'cookie-parser';
import jwtMiddleware from './lib/jwtMiddleware';
import path from 'path';
const app = express();
const router = express.Router();
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(jwtMiddleware);
router.use('/api', api);
app.use(router);
app.use(
    '/thumbnail',
    express.static(path.join(__dirname + '/upload/thumbnail')),
);
app.listen(PORT || 4000, () => {
    console.log('listening');
});
