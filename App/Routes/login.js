const mongoClient = require("mongodb");
const mongoUrl = "mongodb://localhost:27017/";
exports.login = function (request, response) {
    if (!request.body) return response.sendStatus(400);

    mongoClient.connect(mongoUrl, {useNewUrlParser: true}, function (err, client) {
        if (err) throw err;
        let db = client.db("ezWebChat");
        let AuthInfo = {
            Login: request.body["Login"],
            PasswordHash: request.body["PasswordHash"]
        };
        db.collection("Users").findOne({AuthInfo}, function (err, result) {
            if (err) throw err;
            console.log(result);
            let authResponse;

            if (result != null) {
                authResponse = {
                    IsAuthorized: true,
                    ErrorReason: null,
                    ErrorType: null,
                    UserId: result["_id"],
                    SessionToken: null
                }
            } else {
                authResponse = {
                    IsAuthorized: false,
                    ErrorReason: "Wrong login/password",
                    ErrorType: 1,
                    UserId: null,
                    SessionToken: null
                }
            }
            response.send(JSON.stringify(authResponse));

        });
    })
};
