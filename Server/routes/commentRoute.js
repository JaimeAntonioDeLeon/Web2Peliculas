const express =  require("express");
const router = express.Router();
const cors = require("cors");
const {getComments, getCommentsPost, postCreateComment} = require('../controllers/commentController.js');
router.use(cors({
    origin: "*"
}));
router.get('/', getComments);
router.post('/post', getCommentsPost);
router.post('/', postCreateComment);


module.exports = router;