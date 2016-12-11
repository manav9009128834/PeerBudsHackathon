var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/showposts.html');
});

app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/allposts', function(req, res){
  var MongoClient = require('mongodb').MongoClient

  var URL = 'mongodb://localhost:27017/hackathon'

  MongoClient.connect(URL, function(err, db) {
    if (err) return  res.json({a:'no data'});

    var collection = db.collection('Posts');
      collection.find().limit(50).toArray(function(err, docs) {
        console.log(docs.length);
        res.json(docs);
        db.close()
      })
  })

});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    socket.emit('myevent',msg);
  });
  socket.on('myevent',function(msg){
    io.emit('chat message', 'server added2 :'+msg);
    console.log("from myevent :"+msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
