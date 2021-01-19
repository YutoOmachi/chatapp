require('dotenv').config();
const mysql = require('mysql');

module.exports = {
    setUpDBAndTable: async function(){
        try{
            await initializeDB();
            await initializeTable();
            console.log("Database is set now all set!");
        }
        catch(err){
            throw err;
        }
    }
}


function initializeDB() {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER, 
            password: process.env.DB_PASS
        });

        let sql = "CREATE DATABASE IF NOT EXISTS " + process.env.DB_NAME;
        con.query(sql, (err, result, fields)=>{
            if(err) reject(err);
            console.log("Database is created!");
        })
        con.end(); 
        resolve();
    })
}


async function initializeTable(){
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER, 
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
        let sql = "CREATE TABLE IF NOT EXISTS chatlog"+
            "(id INT AUTO_INCREMENT PRIMARY KEY, username varchar(255) NOT NULL, text varchar(255) NOT NULL)";
        con.query(sql, (err, result)=>{
            if(err) reject(err);
        })
        con.end();
        resolve();
    })
}