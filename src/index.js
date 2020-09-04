require('dotenv').config();
import express from 'express';
import mysql from 'mysql';

const app = express();
const { PORT, HOST, DATABASE_NAME, USER, PASSWORD } = process.env;
const connection = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE_NAME,
});

app.get('/', (req, res) => {
    res.send('hello world');
});
try {
    connection.connect();
    connection.query('select * from user', (error, rows, fields) => {
        console.log('user : ', rows);
    });
    connection.end();
} catch (error) {
    console.log(error);
}

app.listen(PORT && 3000, () => {
    console.log('listening');
});
