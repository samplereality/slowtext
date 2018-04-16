<<<<<<< HEAD
var fs = require('fs');
var express = require('express')
  , app = express()
  , server = require('http').createServer(app).listen(80)
  , io = require('socket.io').listen(server);

// map generic HTTP requests to our /public/ subfolder

io.set('transports', ['xhr-polling']);

app.configure(function(){
	app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
});
=======
var express = require('express')
  , app = express()
  , server = require('http').createServer(app).listen(5000)
  , io = require('socket.io').listen(server);

//HTTP static file serving
app.use(express.static(__dirname + '/public'));
>>>>>>> origin/master

// init our data when we turn on the server
var c = 0

var diss = fs.readFileSync('diss.txt','utf8');

setInterval( function() {
 // emit this data to ALL clients 
 io.sockets.emit('news', { word: diss.slice(0,c) });
  c++;
}, 1000*60*10);

io.sockets.on('connection', function (socket) {
 socket.emit('news', { word: diss.slice(0,c) });
});	