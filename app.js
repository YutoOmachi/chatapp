const express= require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Messge = require('./Message.js');

require('dotenv').config()

const messages = [];


app.use(express.static(__dirname));

const hostname = '127.0.0.1';;
const port = process.env.PORT || 3000;

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/views/index.html');
})


//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('A user connected');
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });


server.listen(port, ()=>{
    console.log('Server running at http://'+ hostname + ':' + port + '/');
})