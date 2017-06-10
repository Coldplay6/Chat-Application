var express = require("express");
var _ = require("underscore");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var chatHistory = [];

app.get('/',(req,res) => {
res.sendFile(__dirname + "/index.html");
});

io.on('connection',(socket) => {
console.log("user connected");

var nickName = 'new user';
socket.on('nick name',(nick) => {
 nickName = nick;
 console.log(nickName);
});

console.log(nickName);
socket.broadcast.emit('start connection', nickName +' ' + 'joined the chat');

socket.emit('chat history', chatHistory);

socket.on('chat message',(msg) => {
 io.emit('chat message', nickName + ":" + " " + msg);
 if (_.size(chatHistory) > 10) {  
  chatHistory.splice(0,1);
} else {
  chatHistory.push(nickName + ":" + " " + msg);
}
console.log(chatHistory);
});

socket.on('disconnect',() => {
 io.emit('end connection', nickName +' ' + 'left the chat');
});

});

http.listen(3000,0, () => {
  console.log('listening on *:3000');
});
   