const mongoose = require('mongoose');

const movieListSchema = new mongoose.Schema({
    movie_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    list_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const MovieList = mongoose.model('movielist', movieListSchema);

module.exports = MovieList;