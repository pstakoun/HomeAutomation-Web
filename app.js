var express = require('express');
var app = express();
var http = require('http');

var sendRequest = function(str, response) {
    var options = {
        host: 'localhost',
        path: '/'+str,
        port: '5000'
    };
    var callback = function(res) {
        var result = '';

        res.on('data', function(s) {
            result += s;
        });

        res.on('end', function() {
            response.send(result);
        });
    };
    http.request(options, callback).end();
};

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendFile('index.html');
});

app.post('/start', function(req, res) {
    sendRequest('start', res);
});

app.post('/stop', function(req, res) {
    sendRequest('stop', res);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server running on port ' + port);
});
