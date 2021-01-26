const Message = require('../classes/Message.js');

module.exports = async function(io){
    try{
        let messages = await require("../database/dbLoadMessage")();    
        io.sockets.on('connection', function(socket) {
            socket.on('join', ()=>{
                socket.emit('loadMessage', messages);
            });
        
            //When char message event is sent
            socket.on('newMessage', (name, msg)=>{
                let message = new Message(name, msg);
                messages.push(message);
                require("../database/dbInsert").insertChatlog(name, msg);
                io.emit('newMessage', name, msg);
            })
        
            //Whenever someone disconnects this piece of code executed
            socket.on('disconnect', function () {
            });
        
            socket.on('error', function (err) {
                console.error(err);
            });
        });
    }
    catch(err){
        console.error(err);
    }

}