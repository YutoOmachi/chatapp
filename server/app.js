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
app.use(express.urlencoded({
    extended: true
}));

// app.get('/', (req,res) => {
//     let reqPath = path.join(__dirname, '../client/index.html')
//     res.sendFile(reqPath);
// })

app.get('/login', (req,res)=>{
    let reqPath = path.join(__dirname, '../client/login.html')
    res.sendFile(reqPath);
})

app.post('/', (req, res) => {
    let reqPath = path.join(__dirname, '../client/index.ejs');
    res.render(reqPath, req.body);
})

//Whenever someone connects this gets executed
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

 

server.listen(port, ()=>{
    console.log('Server running at http://'+ hostname + ':' + port + '/');
})