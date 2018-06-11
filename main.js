var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;


var app = express();
var jsonParser = bodyParser.json();

var lastId = 0;

//Файл маршрутизации. Здесь либо очень простая логика
//Либо только маршруты. Вся логика лежит в ./Resource/Routes/****.js;

//Подключение
var register = require('./Resource/Routes/register.js');
var login = require('./Resource/Routes/login.js');

app.get("/", function(request, response){
  
  response.sendfile("./Resource/Pages/debug.html");
});

app.get("/Resource/Styles/style.css", function(request, response){
    response.sendfile("./Resource/Styles/style.css");
});


app.post("/login", jsonParser, login.login);
app.post("/register", jsonParser, register.register)

app.listen(1234);
console.log("listen on port: 1234");