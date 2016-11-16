var a = require('express')();
var b = require('http').Server(a);
var c = require('socket.io')(b);
var d = require('path');

a.get('/', function(r, b) {
    var e = require('express');
    a.use(e.static(d.join(__dirname)));
    b.sendFile(d.join(__dirname, '../chat', 'index.html'));
});


 c.on('connection', function(s) {
    s.on('chatMessage', function(f, m) {
         c.emit('chatMessage', f, m);
    });
    s.on('notifyUser', function(u) {
         c.emit('notifyUser', u);
    });
});


var s = require('express')();
var h = require('http').Server(s);
s.get('/open', function(a, o){
    o.send('Port: ' + a.query.port);
    b.listen(a.query.port);
});

s.get('/close', function(a, o) {
    b.close();
});

h.listen(10, function() {
    console.log('listening on *:10');
});

