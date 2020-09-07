import mysql from 'mysql';

import config from '../../db_config.json';
// const config = require('../../db_config')
const pool = mysql.createPool(config);

export default pool;
