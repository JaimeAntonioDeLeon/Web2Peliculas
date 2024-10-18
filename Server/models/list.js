const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    post_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    created_at:{
        type:Date
    }
})

const List = mongoose.model('lists', listSchema);

module.exports = List;