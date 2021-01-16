const express= require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

const Message = require('./Message.js');

require('dotenv').config()

const messages = [];
const hostname = 'localhost';;
const port = process.env.PORT || 3000;

app.use(express.static("client"));

app.get('/', (req,res) => {
    let reqPath = path.join(__dirname, '../client/index.html')
    res.sendFile(reqPath);
})


//Whenever someone connects this gets executed
io.sockets.on('connection', function(socket) {
    console.log('A user connected');

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
       console.log('A user disconnected');
    });

    socket.on('error', function (err) {
        console.log(err);
    });
 });

 

server.listen(port, ()=>{
    console.log('Server running at http://'+ hostname + ':' + port + '/');
})