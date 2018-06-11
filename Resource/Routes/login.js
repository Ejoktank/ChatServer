//Логика авторизации

//Зависимости
const fs = require('fs');
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;

exports.login = function(request, response) {
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
  }