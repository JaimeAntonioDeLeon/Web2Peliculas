const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    trailer: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    poster: {
        // type: mongoose.Types.ObjectId,
        type: String,
        required: true
    },
    released_at:{
        type:Date
    }
})

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;