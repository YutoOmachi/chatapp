const Message = require('./Message.js');
const dbHandler = require('./dbHandler');

module.exports = function(io){
    const messages = dbHandler.loadMessages();

    io.sockets.on('connection', function(socket) {

        socket.on('join', ()=>{
            socket.emit('loadMessage', messages);
        });
    
        //When char message event is sent
        socket.on('newMessage', (name, msg)=>{
            let message = new Message(name, msg);
            messages.push(message);
            console.log(messages);
            dbHandler.saveMessage(name, msg)
            io.emit('newMessage', name, msg);
        })
    
        //Whenever someone disconnects this piece of code executed
        socket.on('disconnect', function () {
        });
    
        socket.on('error', function (err) {
            console.log(err);
        });
     });
}