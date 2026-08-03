const http = require('http');

http.createServer(function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/plain'});
    console.log(req.url);
    res.end('hello world');
}).listen(3000);

console.log('server is running at http://localhost:3000');

