var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendFile('index.html');
});

app.get('/wake', function(req, res) {
    // TODO wake system
});

var port = process.env.PORT || 3000;
http.listen(port, function() {
    console.log('Server running on port ' + port);
});
