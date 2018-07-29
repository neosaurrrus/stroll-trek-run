console.log("Users model - Start")

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
})

UserSchema.plugin(passportLocalMongoose);

console.log("Users model - End")
module.exports = mongoose.model("User", UserSchema)

