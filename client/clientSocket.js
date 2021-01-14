var socket = io();

var form  = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e){
   e.preventDefault();
   if(input.value){
      socket.emit('chat message', input.value);
      input.value = '';
   }
});

socket.on('user connected', function(messages){
    for(let i=0; i<messages.length(); i++){
        var item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
    }
});

// When new message is created
socket.on('chat message', function(msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});