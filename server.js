var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.get('/',(req,res) => {
res.sendFile(__dirname + "/nickname.html");
});

app.get('/chat',(req,res) => {
res.sendFile(__dirname + "/index.html");
});
var nickName;
io.on('connection',(socket) => {
console.log("user connected");


socket.on('nick name',(nick) => {
 nickName = nick;
 console.log(nickName);
});
io.emit('start connection', nickName +' ' + 'joined the chat');

socket.on('chat message',(msg) => {
 io.emit('chat message','@' + nickName + " " + msg);
});

socket.on('disconnect',() => {
 console.log("user disconnected");
});

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
   