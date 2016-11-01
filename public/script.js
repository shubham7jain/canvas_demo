var socket = io();
socket.on('path', function(msg) {
	console.log(msg);
	for(var i = 0; i < msg.length; i++) {
		recieveDraw(msg[i]);
	}
})
socket.on('connection', function(msg) {
	for(var i = 0; i < msg.length; i++) {
		recieveDraw(msg[i]);
	}
})

var canvas, ctx = null;
var prevX, prevY, currX, currY = 0;

var drawPath = false;

function init() {
	canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    fitCanvas();

    color = randomColor();

    canvas.addEventListener("mousemove", findPath);
    canvas.addEventListener("mousedown", findPath);
    canvas.addEventListener("mouseup", findPath);
}

function fitCanvas() {

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function draw() {
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(currX, currY);
	ctx.strokeStyle = "red";
	ctx.lineWidth = 3;
	ctx.stroke();
	ctx.closePath();


	socket.emit("path", {px: prevX, py: prevY, cx: currX, cy: currY, color: color});
}


function recieveDraw(path) {
	console.log("Shubham");
	ctx.beginPath();
	ctx.moveTo(path.px, path.py);
	ctx.lineTo(path.cx, path.cy);
	ctx.strokeStyle = path.color;
	ctx.lineWidth = 3;
	ctx.stroke();
	ctx.closePath();
}


function findPath() {
	if(event.type === "mousedown") {
		drawPath = true;
		prevX = event.clientX;
		prevY = event.clientY;
		currX = event.clientX;
		currY = event.clientY;
	} 
	else if(event.type === "mousemove") {
		if(drawPath) {
			prevX = currX;
			prevY = currY;
			currX = event.clientX;
			currY = event.clientY;
			draw();
		}
	}
	else if(event.type === "mouseup") {
		drawPath = false;
	}
}

function randomColor() {
	return '#'+Math.floor(Math.random()*16777215).toString(16);
}


init();