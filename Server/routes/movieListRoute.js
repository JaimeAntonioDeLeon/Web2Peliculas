const express =  require("express");
const router = express.Router();
const cors = require("cors");
const {getMoviesList, deleteMovieList, postMovieList, getMovieLists, getAllMoviesList} = require('../controllers/movieListController.js');
router.use(cors({
    origin: "*"
}));
router.get('/', getMoviesList);
router.post('/post', postMovieList);
router.post('/delete', deleteMovieList);
router.post('/movie', getMovieLists);
router.get('/all', getMoviesList);


module.exports = router;