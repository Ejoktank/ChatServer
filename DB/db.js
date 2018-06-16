const url = "mongodb://localhost:27017/";
const mongoClient = require("mongodb").MongoClient;

/**
 * @return {boolean}
 */
function RegisterUser(login, passwordHash) {
    let resultState = false;
    mongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {

        const db = client.db("EzChatServer");
        const UsersColl = db.collection("users");
        let user = {login: login, passwordHash: passwordHash};
        UsersColl.insertOne(user, (err, result) => {
            console.log("sad");
            if (err) {
                return console.log(err);
            }
            resultState = true;
            console.log("wow");

        });
        client.close();
    });
    return resultState;
}

if (RegisterUser("dasd", "dasd")) console.log("sucess");
if (RegisterUser("dasd", "dasdsad")) {
    console.log("sucess");
}