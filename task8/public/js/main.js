console.log('app start');
var socket = io();

var form = document.getElementById('form'),
    msg = document.getElementById('m'),
    messages = document.getElementById('messages');

form.addEventListener('submit', function(evt){
    evt.preventDefault();
    socket.emit('chat message', msg.value);
    msg.value = '';
});
socket.on('chat message', function(msg){
    var li = document.createElement('li');
    li.innerHTML = msg;
    messages.appendChild(li);
});


