const con = require("./dbConnect");
const mysql = require('mysql');

initializeDB = ()=>{
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER, 
            password: process.env.DB_PASS
        });
        let sql = "CREATE DATABASE IF NOT EXISTS " + process.env.DB_NAME;
        con.query(sql, (err, result, fields)=>{
            if(err) reject(err);
        })
        con.end(); 
        resolve();
    })
}


initializeTable = ()=>{
    return new Promise((resolve, reject) => {
        let sql = "CREATE TABLE IF NOT EXISTS chatlog"+
            "(id INT AUTO_INCREMENT PRIMARY KEY, username varchar(255) NOT NULL, text varchar(255) NOT NULL)";
        con.query(sql, (err, result)=>{
            if(err) reject(err);
        })
        con.end();
        resolve();
    })
}

(async function() {
    await initializeDB();
}());

(async function() {
    await initializeTable();
}());
