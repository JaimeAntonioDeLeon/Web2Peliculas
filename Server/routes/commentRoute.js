const express =  require("express");
const router = express.Router();
const cors = require("cors");
const {getComments, getCommentsPost, postCreateComment, commentUpdate, deleteComment, getComment} = require('../controllers/commentController.js');
router.use(cors({
    origin: "*"
}));
router.get('/', getComments);
router.post('/post', getCommentsPost);
router.post('/', postCreateComment);
router.post('/update', commentUpdate);
router.post('/delete', deleteComment);
router.post('/get', getComment);


module.exports = router;