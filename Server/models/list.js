const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    created_at:{
        type:Date
    },
    movies:[{ type: Schema.Types.ObjectId, ref: 'movies' }]
})

const List = mongoose.model('lists', listSchema);

module.exports = List;