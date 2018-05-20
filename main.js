var http = require('http');
var url = require('url');
var querystring = require('querystring');

function accept(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Cache-Control': 'no-cache',
  });
  res.write("<html><head> <meta charset=\"utf-8\"></head>")
  res.write("Ты лох!");

  res.end("</html>");
}

http.createServer(accept).listen(1234);