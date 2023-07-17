const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    repliedBy:{
        type:mongoose.Schema.Types.ObjectId, ref:'users'
    },
    repliedTo:{
        type:mongoose.Schema.Types.ObjectId, ref:'comments'
    },
    repliedOn:Date,
});

module.exports = mongoose.model('Reply', replySchema);