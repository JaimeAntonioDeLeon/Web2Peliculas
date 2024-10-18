const express =  require("express");
const router = express.Router();
const cors = require("cors");
const {getMovie, getMovieSpecific, getMovieSearch} = require('../controllers/movieController.js');
router.use(cors({
    origin: "*"
}));
router.get('/', getMovie);
router.post('/post', getMovieSpecific);
router.post('/search', getMovieSearch);
// router.post('/', postCreateComment);


module.exports = router;