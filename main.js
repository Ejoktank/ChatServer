var express = require("express");

var app = express();

app.get("/", function(request, response){
     
    response.send("<h2>Привет Express!</h2>");

  });

app.listen(1234);
console.log("listen on port: 1234");