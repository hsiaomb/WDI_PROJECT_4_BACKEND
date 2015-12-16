var express        = require('express');
var cors           = require('cors');
var path           = require('path');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var cookieParser   = require("cookie-parser");
var methodOverride = require("method-override");
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');
var fs = require('fs');
var app            = express();

var config         = require('./config/config');
var User           = require('./models/user');
var secret         = require('./config/config').secret;

mongoose.connect(config.database);

require('./config/passport')(passport);

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());
//
// app.use('/api', expressJWT({ secret: secret })
//   .unless({
//     path: [
//       { url: '/api/login', methods: ['POST'] },
//       { url: '/api/register', methods: ['POST'] },
//       { url: '/api/channels', methods: ['POST', 'GET'] },
//       { url: '/api/channels/:id', methods: ['GET', 'PUT', 'PATCH', 'DELETE'] },
//     ]
//   }));
//
// app.use(function (err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {
//     return res.status(401).json({message: 'Unauthorized request.'});
//   }
//   next();
// });

var routes = require('./config/routes');
app.use("/api", routes);

var server = app.listen(3000);
var io = require('socket.io')(server);

io.on('connection', function(socket){
  socket.on('message', function(id, msg){
    io.to(id).emit('message', msg);
  });
  socket.on('vidId', function(id, vid){
    io.to(id).emit('vidId', vid);
  });
  socket.on('playerState', function(id, state){
    io.to(id).emit('playerState', state);
  });
  socket.on('currentTime', function(id, time){
    console.log(time);
    io.to(id).emit('currentTime', time);
  });
  socket.on('nextVideo', function(id, video){
    io.to(id).emit('nextVideo', video);
  });
  socket.on('playlistUpdate', function(id){
    io.to(id).emit('playlistUpdate');
  });
  // socket.on('newUser', function(id){
  //   io.to(socket.id).emit('newUser');
  // });
  socket.on('addToPlaylist', function(id){
    io.to(id).emit('addToPlaylist');
  });
  socket.on('joinedRoom', function(id, time) {
    socket.join(id);
    // io.to(socket.id).emit('newUserCurrentTime', time);
    console.log('joined ' + id);
    });
  socket.on('leaveRoom', function(id) {
    socket.leave(id);
    console.log('left ' + id);
    });
});
