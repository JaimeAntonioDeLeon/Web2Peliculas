const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    post_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
})

const Image = mongoose.model('images', imageSchema);

module.exports = Image;