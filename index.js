const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const settings = require('./utils/settings');
const watson = require('./utils/watson');

// Serve HTML file
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

// When a client connects
io.on('connection', function(socket) {
  console.log("\x1b[32m" + '- User connected 😁', "\x1b[0m");

  //Shoots an empty message at watson, so he'll reply with the initial message.
  watson.MessageWatson(socket);

  //When a chat message event happens
  socket.on('chat message', function (data) {
    //Forward it on to watson, who will fire a 'chat message' event back to
    // client (see utils/watson.js)
    console.log(data);
    watson.MessageWatson(socket, {context: data.context, message: data.msg})
  });

  //When a client disconnects
  socket.on('disconnect', function () {
    console.log("\x1b[31m" + '- User disconnected 👋', "\x1b[0m");
  });
});

http.listen(3000, function() {
  console.log("\x1b[33m" + '- Server powered up on port 3000 ⚡️', "\x1b[0m");
})