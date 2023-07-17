const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    person: {
        type:mongoose.Schema.Types.ObjectId, ref:'users'
    },
    comment:String,
    commentedOn: Date,
    commentedIn: {
        type: mongoose.Schema.Types.ObjectId, ref:'Destinations'
    },
    likes:Number,
    replies:Array,
});

module.exports = mongoose.model('comments', commentSchema);