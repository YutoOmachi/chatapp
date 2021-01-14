const socket = io();

const form  = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', function(e){
   e.preventDefault();
   if(input.value){
      socket.emit('newMessage', input.value);
      input.value = '';
   }
});


//When there is a new connection, display messages
socket.on('userConnected', function(msgs){
    console.log("here I am starting")
    for(let i=0; i<messages.length(); i++){
        var item = document.createElement('li');
        item.textContent = msgs[i];
        messages.appendChild(item);
    }
});

// When new message is created
socket.on('newMessage', function(msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});