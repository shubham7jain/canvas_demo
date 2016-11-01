var express = require("express")
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.set("port", process.env.PORT || 3000);

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

http.listen(app.get("port"), function() {
	console.log("Listening on port " + app.get("port"));
});