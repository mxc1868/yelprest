var mongoose = require("mongoose");
var passportPlugin = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,

});

UserSchema.plugin(passportPlugin);

module.exports = mongoose.model("User", UserSchema);