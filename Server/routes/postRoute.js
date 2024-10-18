const express =  require("express");
const router = express.Router();
const cors = require("cors");
const {getPosts, getPostSelected, postPost, postUpdate, deletePost} = require('../controllers/postController');
const {getUsers, getUsersLogin, postRegisterUser} = require('../controllers/userController.js');
router.use(cors({
    origin: "*"
}));
router.get('/', getPosts);
// router.get('/', getUsers);
router.post('/post', getPostSelected);
router.post('/', postPost);
router.post('/update', postUpdate);
router.post('/delete', deletePost);


module.exports = router;