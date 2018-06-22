//Логика регистрации

//Зависимости
const MongoClient = require("mongodb").MongoClient;

//Функция
exports.register = function (request, response) {
    if (!request.body) return response.sendStatus(400);

    let newUser = {
        Login: request.body["Login"],
        PasswordHash: request.body["PasswordHash"],
        FirstName: request.body["FirstName"],
        LastName: request.body["LastName"],
        UserName: request.body["UserName"]
    };

    MongoClient.connect("mongodb://localhost:27017/", function (err, client) {
        if (err) throw err;
        let db = client.db("ezWebChat");
        db.collection("Users").insertOne(newUser, function (err, res) {
            let registerResponse;
            if (err) {
                registerResponse = {
                    IsRegistered: false,
                    ErrorReason: "Already exists"
                };
            } else {
                registerResponse = {
                    IsRegistered: true,
                    ErrorReason: null
                };
            }
            response.send(JSON.stringify(registerResponse));
            db.close();
        });

    });

};

