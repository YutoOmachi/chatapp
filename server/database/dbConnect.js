const mysql = require('mysql');

module.exports = ()=>{
    return (mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER, 
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
    }));
}