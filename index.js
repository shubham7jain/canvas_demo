var express = require("express")
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

paths = [];

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit("connection", paths);

  socket.on('path', function(msg){
    paths.push(msg);
    socket.broadcast.emit('path', msg);
  });
});

app.use(express.static('public'));

app.get("/", function(req, res) {
	res.render("index.html");
})

app.get("/foo", function(req, res) {
	res.send("This is the foo route");
})

http.listen(3000, function() {
	console.log("Listening on port 3000");
})