module.exports =  {
    insertChatlog: (username, text)=> {
        const con = require("./dbConnect")();
        let sql = "INSERT INTO chatlog (username, text) VALUES (? , ?)";
        con.query(sql,[username, text], (err, result) => {
            if(err) throw err
        })
    },

    insertUser: (username, email, password)=>{
        const con = require("./dbConnect")();
        let sql = "INSERT INTO users (username, email, password, date_added) VALUES (?, ?, ?, NOW())";
        con.query(sql,[username, email, password], (err, result) => {
            if(err) throw err
        })
    }
}