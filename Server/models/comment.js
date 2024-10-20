const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
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

const Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;