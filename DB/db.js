const url = "mongodb://localhost:27017";
const mongoClient = require("mongodb").MongoClient;
const dbName = "EzChatServer";

function RegisterUser(login, passwordHash) {
    let resultState = false;
    let errorReason = "Server error";
    let errorType = 2;

    mongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {

        const db = client.db(dbName);
        console.log("asdasd");
        const UsersColl = db.collection("users");
        console.log("asdasd");
        let user = {
            Login: login,
            PasswordHash: passwordHash,
            IsBlocked: false
        };

        UsersColl.insertOne(user, function (err, result) {
            if (err) {
                console.log("I AM HERE2");
                errorReason = "Already exists";
                errorType = 1;
                return err;
            }
            console.log("I AM HERE");
            resultState = true;
            errorReason = "";
            errorType = 0;
            return result;
        });
        client.close();
    });
    return {
        IsRegistered: resultState,
        ErrorReason: errorReason,
        ErrorType: errorType
    }
}


let a = RegisterUser("dasdasd", "sdfghjklhg");
console.log(a);
let b = RegisterUser("dasdghjhgh", "sdfghjklhg");
console.log(b);

