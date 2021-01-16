const socket = io();

const form  = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

let myId = "";

form.addEventListener('submit', function(e){
   e.preventDefault();
   if(input.value){
      socket.emit('newMessage', myId, input.value);
      input.value = '';
   }
});

//On connect to server
socket.on('connect', function(data) {
  myId = socket.id;
  socket.emit('join');
});

//Loading messages
socket.on('loadMessage', function(msgObjects){
  for(let i=0; i<msgObjects.length; i++){
    let item = document.createElement('li');
    item.textContent = "<"+msgObjects[i].userId+">\n"+ msgObjects[i].text;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  }
})

// When new message is created
socket.on('newMessage', function(id, msg) {
   var item = document.createElement('li');
   if(id==myId){
    item.textContent = msg;
    item.classList.add("myMessage");
   }
   else{
     item.textContent = "<"+id+">\n"+msg;
   }
   messages.appendChild(item);
   window.scrollTo(0, document.body.scrollHeight);
});