const express= require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('./server/socket/serverSocket')(io);

const hostname = 'localhost';
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
require("./server/routes/index")(app);

server.listen(port, ()=>{
    console.log('Server running at http://'+ hostname + ':' + port + '/');
})