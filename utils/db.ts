import mysql from 'mysql2'

const connection = mysql
    .createConnection({
        host: '172.29.240.1',
        user: 'root',
        password: 'Azerty1!',
        database: 'test_db',
        port: 3306,
    })
    .promise()

export default connection