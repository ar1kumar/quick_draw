var express =require('express');
  var express = require('express'),
    app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

// listen for new web clients:
server.listen(8080);

     //------------------- Default Shit--------------------------------------//
app.configure(function(){
    app.use(express.methodOverride());
    //app.use(express.bodyParser());
    app.use(app.router);
	app.use(express.json());
    app.use(express.urlencoded());
});

app.configure('development', function(){
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.use(express.errorHandler());
});

//------------------- Default Shit ends--------------------------------------//

var request = require('request');
var spark = require('sparkcloud')('eabf911dc1619fcba51d56d543b8bba6e318b4f8')
var core = spark.device('53ff6e065075535142251687')
 var up = false;


//Socket functions starts//
io.sockets.on('connection', function (socket) {
	socket.on('add', function(data) {
		io.sockets.emit('fire', data);
	});
	
	socket.on('begin', function(){
		io.sockets.emit('started');
	});
	
	socket.on('remove', function() {
		io.sockets.emit('remove_particle');
	});
	
	socket.on('add_name', function(data){
		io.sockets.emit('add_name1', data);
		console.log(data);
	});
});