const socket = io();

const form  = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function(e){
   e.preventDefault();
   if(input.value){
      socket.emit('newMessage', input.value);
      input.value = '';
   }
});

socket.on('connect', function(data) {
   socket.emit('join');
});

// When new message is created
socket.on('newMessage', function(msg) {
   var item = document.createElement('li');
   item.textContent = msg;
   messages.appendChild(item);
   window.scrollTo(0, document.body.scrollHeight);
});