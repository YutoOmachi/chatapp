require('dotenv').config();
const mysql = require('mysql');
const Message = require('./Message.js');

module.exports = {
    setUpDBAndTable: async function(){
        return new Promise(async(resolve, reject) => {
            try{
                await initializeDB();
                await initializeTable();
                resolve("Database is set now all set!");
            }
            catch(err){
                reject(err);
            }  
        })

    },

    saveMessage: function(username, text){
        const con = connectToDB();
        let sql = "INSERT INTO chatlog (username, text) VALUES (? , ?)";
        con.query(sql,[username, text], (err, result) => {
            if(err) throw err
        })
    },

    loadMessages: function(){
        const con = connectToDB();
        let messages = [];
        let sql = "SELECT * FROM chatlog";
        con.query(sql, (err, result) => {
            if(err) throw err
            for(let i=0; i<result.length; i++){
                let resultObj = Object.assign({}, result[i]);
                messages.push(new Message(resultObj.username, resultObj.text));
            }
        })
        return messages;
    }
}

function connectToDB(){
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER, 
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });
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
        })
        con.end(); 
        resolve();
    })
}


function initializeTable(){
    return new Promise((resolve, reject) => {
        const con = connectToDB();
        let sql = "CREATE TABLE IF NOT EXISTS chatlog"+
            "(id INT AUTO_INCREMENT PRIMARY KEY, username varchar(255) NOT NULL, text varchar(255) NOT NULL)";
        con.query(sql, (err, result)=>{
            if(err) reject(err);
        })
        con.end();
        resolve();
    })
}

