require('dotenv').config();

module.exports = (username, text)=> {
    const con = require("./dbConnect")();
    let sql = "INSERT INTO chatlog (username, text) VALUES (? , ?)";
    con.query(sql,[username, text], (err, result) => {
        if(err) throw err
    })
}