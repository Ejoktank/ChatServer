const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var jsonParser = bodyParser.json();

//Подключение
var register = require('./App/Routes/register.js');
var login = require('./App/Routes/login.js');

// noinspection JSUnresolvedFunction
app.get("/", function(request, response){

    response.sendfile("./App/Pages/debug.html");
});

// noinspection JSUnresolvedFunction
app.get("/App/Styles/style.css", function (request, response) {
    response.sendfile("./App/Styles/style.css");
});

// noinspection JSUnresolvedFunction
app.post("/login", jsonParser, login.login);
// noinspection JSUnresolvedFunction
app.post("/register", jsonParser, register.register);

app.listen(1234);
console.log("listen on port: 1234");