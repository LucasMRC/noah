const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// User Schema

let userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Set Up Passport Local Mongoose

userSchema.plugin(passportLocalMongoose);

// Module Exports

module.exports = mongoose.model('User', userSchema);
