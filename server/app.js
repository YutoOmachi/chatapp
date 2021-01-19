const express= require('express');
const app = express();
const path = require('path');
require('dotenv').config()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('./socket')(io);

const hostname = 'localhost';
const port = process.env.PORT || 3000;

app.use(express.static("client"));
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req,res) => {
    res.redirect("/login");
})

app.get('/login', (req,res)=>{
    let reqPath = path.join(__dirname, '../client/login.html')
    res.sendFile(reqPath);
})

app.post('/', (req, res) => {
    let reqPath = path.join(__dirname, '../client/index.ejs');
    let username = req.body.username;
    if(username == "") res.redirect("/login");
    else res.render(reqPath, {username: username});

})

server.listen(port, ()=>{
    console.log('Server running at http://'+ hostname + ':' + port + '/');
})