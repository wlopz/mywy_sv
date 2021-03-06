// ./models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: String,
    email: String,
    firstName: String,
    lastName: String,
    passwordHash: String,
    passwordSalt: String
});

module.exports = mongoose.model('User', UserSchema);