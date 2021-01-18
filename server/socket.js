const Message = require('./Message.js');

module.exports = function(io){
    const messages = [];

    io.sockets.on('connection', function(socket) {

        socket.on('join', ()=>{
            socket.emit('loadMessage', messages);
        });
    
        //When char message event is sent
        socket.on('newMessage', (id, msg)=>{
            let message = new Message(id, msg);
            messages.push(message);
            io.emit('newMessage', id, msg);
        })
    
        //Whenever someone disconnects this piece of code executed
        socket.on('disconnect', function () {
        });
    
        socket.on('error', function (err) {
            console.log(err);
        });
     });
}