require('dotenv').config();
import express from 'express';
import mysql from 'mysql';
import api from './api/index';

const app = express();
const router = express.Router();

const { PORT, HOST, DATABASE_NAME, USER, PASSWORD } = process.env;
const connection = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE_NAME,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
