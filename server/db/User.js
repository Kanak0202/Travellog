const  mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    country:String,
    state:String,
    city:String,
    password:String
});

module.exports = mongoose.model("users", userSchema);