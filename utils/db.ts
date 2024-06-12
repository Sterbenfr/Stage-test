import mysql from 'mysql2'

const connection = mysql
    .createConnection({
        host: '172.22.240.1',
        user: 'root',
        password: 'welcome1',
        database: 'test_stage',
        port: 3306,
    })
    .promise()

export default connection
