var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
const fs = require('fs');

var app = express();
var jsonParser = bodyParser.json();

var lastId = 0;


app.get("/", function(request, response){
  
  response.send("<h1>Корень</h1>");
});

app.post("/login", jsonParser, function(request, response) {
  if(!request.body) return response.sendStatus(400);

  MongoClient.connect("mongodb://localhost:27017/", function(err,db) {
    if(err) throw err;
    var dbo = db.db("ezWebChat")
    dbo.collection("UserLoginInfo").findOne({Login: request.body["Login"], PasswordHash : request.body["PasswordHash"]},
      function(err,result){
      if(err) throw err;
      console.log(result);
      var res;
      if(result != null) {
      res = {
        IsAuthorized : true,
        ErrorReason: null,
        ErrorType: null,
        UserId: result["UserId"],
        SessionToken: null
      }
      
    } else {
      res = {
        IsAuthorized : false,
        ErrorReason: "Wrong login/password",
        ErrorType: 1,
        UserId: null,
        SessionToken: null
    }
  }
    response.send(JSON.stringify(res)); 

    });
    db.close();
  })
});

app.post("/register", jsonParser, function(request, response) {
   if(!request.body) return response.sendStatus(400);

   lastId = parseInt(fs.readFileSync("lastId", "utf8"));
   lastId++;

   var UserObj = {
     Id : lastId,
     FirstName : request.body["FirstName"],
     LastName : request.body["LastName"],
     UserName : request.body["UserName"]
   }

   var UserLoginInfoObj = {
     UserId : lastId,
     Login : request.body["UserName"],
     PasswordHash : request.body["PassworHash"]
   }

   MongoClient.connect("mongodb://localhost:27017/", function(err,db) {
    if(err) throw err;
    var dbo = db.db("ezWebChat")
    dbo.collection("Users").insertOne(UserObj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    });
    dbo.collection("UserLoginInfo").insertOne(UserLoginInfoObj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    });
    dbo.collection("UserLoginInfo").findOne({UserId : 22},
      function(err,result){
      if(err) throw err;
      console.log(result);
    });
    db.close();
  })

  fs.writeFileSync("lastId", lastId);

   console.log(request.body["FirstName"]);

   var res = {
    IsRegistred: true,
    ErrorReason: null
  };

  response.send(JSON.stringify(res));
});

app.listen(1234);
console.log("listen on port: 1234");