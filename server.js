var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.get('/',(req,res) => {
res.sendFile(__dirname + "/index.html");
});

io.on('connection',(socket) => {
console.log("user connected");
 io.emit('start connection', 'welcome to public chat');
socket.on('chat message',(msg) => {
 console.log(msg)
 io.emit('chat message', msg);
});
socket.on('disconnect',() => {
 console.log("user disconnected");
});
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
   