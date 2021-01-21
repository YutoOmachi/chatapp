const Message = require('../classes/Message.js');

module.exports = ()=>{
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

}

