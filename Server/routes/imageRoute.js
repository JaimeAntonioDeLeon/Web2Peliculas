const express =  require("express");
const router = express.Router();
const cors = require("cors");
const {getPosts, getPostSelected, postPost} = require('../controllers/postController');
const {getImages, getPostImages, postImage} = require('../controllers/imageController.js');
router.use(cors({
    origin: "*"
}));
router.get('/', getImages);
router.post('/post', getPostImages);
router.post('/', postImage);


module.exports = router;