import mysql from 'mysql2'

const pool = mysql
    .createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'Azerty1!',
        database: 'test_db',
        port: 3306,
    })
    .promise()

export default pool
