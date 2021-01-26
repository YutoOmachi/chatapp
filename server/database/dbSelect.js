const Message = require('../classes/Message.js');

module.exports = {
    selectChatlog: () => {
        return new Promise((resolve, reject) => {
            try{
                const con = require("./dbConnect")();
                let messages = [];
                let sql = "SELECT * FROM chatlog";
                con.query(sql, (err, result) => {
                    if(err) reject(err)
                    for(let i=0; i<result.length; i++){
                        let resultObj = Object.assign({}, result[i]);
                        messages.push(new Message(resultObj.username, resultObj.text));
                    }
                })
                resolve(messages);       
            }
            catch(err){
                reject(err);
            }
        })
    },

    selectUserByEmail: (email)=> {
        return new Promise((resolve, reject) => {
            try{
                const con = require("./dbConnect")();
                let messages = [];
                let sql = "SELECT * FROM users WHERE email = ?";
                con.query(sql,[email], (err, result) => {
                    if(err) reject(err)
                    if(result){
                        let resultObj = Object.assign({}, result[0]);
                        resolve(resultObj);
                    }
                    reject(null);
                })
            }
            catch(err){
                reject(err);
            }
        })
    },

    selectUserById: (id)=> {
        return new Promise((resolve, reject) => {
            try{
                const con = require("./dbConnect")();
                let sql = "SELECT * FROM users WHERE id = ?";
                con.query(sql,[id], (err, result) => {
                    if(err) reject(err)
                    if(result){
                        let resultObj = Object.assign({}, result[0]);
                        resolve(resultObj);
                    }
                    reject(null);
                })
            }
            catch (err){
                reject(err);
            }
        })
    }
}

