const socket = io();

const form  = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

const myId = document.getElementById('username').innerText;

form.addEventListener('submit', function(e){
   e.preventDefault();
   if(input.value){
      socket.emit('newMessage', myId, input.value);
      input.value = '';
   }
});

//On connect to server
socket.on('connect', function(data) {
  socket.emit('join');
});

//Loading messages
socket.on('loadMessage', function(msgObjects){
  messages.innerHTML='';
  for(let i=0; i<msgObjects.length; i++){
    let item = document.createElement('li');
    const name = "<span class='userId'>" +msgObjects[i].userId+"</span>"
    item.innerHTML = name+"<br>"+msgObjects[i].text;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  }
})

// When new message is created
socket.on('newMessage', function(id, msg) {
  var item = document.createElement('li');
  if(id==myId){
    item.innerHTML = msg;
    item.classList.add("myMessage");
  }
  else{
    const name = "<span class='userId'>"+id+"</span>"
    item.innerHTML = name+"</br>"+msg;
  }
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});