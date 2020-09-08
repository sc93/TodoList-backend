require('dotenv').config();
import express from 'express';
import api from './api/index';
import cookieParser from 'cookie-parser';
import jwtMiddleware from './lib/jwtMiddleware';
const app = express();
const router = express.Router();
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(jwtMiddleware);
router.use('/api', api);
app.use(router);
/*
test code
try {
    connection.connect();
    connection.query('select * from user', (error, rows, fields) => {
        console.log('user : ', rows);
    });
    connection.end();
} catch (error) {
    console.log(error);
}
*/
app.listen(PORT || 4000, () => {
    console.log('listening');
});
