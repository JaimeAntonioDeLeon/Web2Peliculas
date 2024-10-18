const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    movie_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    created_at:{
        type:Date
    }
})

const Post = mongoose.model('posts', postSchema);

module.exports = Post;