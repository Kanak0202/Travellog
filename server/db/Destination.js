const mongoose = require("mongoose");
const User = require("./User").schema;

const destinationSchema = new mongoose.Schema({
    name:String,
    state:String,
    city:String,
    location:String,
    img:{
        data: Buffer,
        ContentType: String
    },
    attractions:String,
    description:String,
    days:String,
    budget:String,
    userId:String,
    username:String, 
    dateCreated: String,
    dateUpdated: String,
    review: String,
});

module.exports = mongoose.model("Destinations", destinationSchema);