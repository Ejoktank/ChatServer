var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var jsonParser = bodyParser.json();

app.get("/", function(request, response){
     
  response.send("<h1>Корень</h1>");
});
app.post("/register", jsonParser, function(request, response) {
   if(!request.body) return response.sendStatus(400);
   console.log(request.body);

   var res = {
    IsRegistred: true,
    ErrorReason: null
  };

  response.send(JSON.stringify(res));
});

app.listen(1234);
console.log("listen on port: 1234");