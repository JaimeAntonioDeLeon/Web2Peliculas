const express =  require("express");
const router = express.Router();
const cors = require("cors");
const {getImages, getPostImages, postImage, deleteImages} = require('../controllers/imageController.js');
router.use(cors({
    origin: "*"
}));
router.get('/', getImages);
router.post('/post', getPostImages);
router.post('/', postImage);
router.post('/delete', deleteImages);


module.exports = router;