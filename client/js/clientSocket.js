const socket = io();

const form  = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

const myName = document.getElementById('username').innerText;

form.addEventListener('submit', function(e){
   e.preventDefault();
   if(input.value){
      socket.emit('newMessage', myName, input.value);
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
    const name = msgObjects[i].username
    if(name!="Anonymous" && name==myName){
      item.innerHTML = msgObjects[i].text;
      item.classList.add("myMessage");
    }
    else{
      const username = "<span class='username'>"+name+"</span>"
      item.innerHTML = username+"<br>"+msgObjects[i].text;
    }
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  }
})

// When new message is created
socket.on('newMessage', function(name, msg) {
  var item = document.createElement('li');
  if(name==myName){
    item.innerHTML = msg;
    item.classList.add("myMessage");
  }
  else{
    const username = "<span class='username'>"+name+"</span>"
    item.innerHTML = username+"</br>"+msg;
  }
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});