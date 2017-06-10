var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.get('/',(req,res) => {
res.sendFile(__dirname + "/index.html");
});

io.on('connection',(socket) => {
console.log("user connected");
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
   