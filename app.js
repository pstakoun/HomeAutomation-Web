var express = require('express');
var app = express();
var http = require('http');
var host;
var port;

var sendResponse = function(response, result) {
    response.send(result);
}

var sendImage = function(response, result) {
    response.sendFile(result);
}

var sendRequest = function(str, response, f) {
    var options = {
        host: host,
        path: '/'+str,
        port: port
    };
    var callback = function(res) {
        var result = '';

        res.on('data', function(s) {
            result += s;
        });

        res.on('end', f(response, result));
    };
    http.request(options, callback).on('error', function (e) { response.send('ERROR: Connection error!'); }).end();
};

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendFile('index.html');
});

app.post('/set-host/:host', function(req, res) {
    host = req.params.host;
    res.send('');
});

app.post('/set-port/:port', function(req, res) {
    port = parseInt(req.params.port);
    res.send('');
});

app.post('/start', function(req, res) {
    sendRequest('start', res, sendResponse);
});

app.post('/stop', function(req, res) {
    sendRequest('stop', res, sendResponse);
});

app.post('/count-captures', function(req, res) {
    sendRequest('count-captures', res, sendResponse);
});

app.get('/capture/:n', function(req, res) {
    sendRequest('capture/'+req.params.n, res, sendImage);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server running on port ' + port);
});
