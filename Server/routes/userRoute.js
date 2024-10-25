const express =  require("express");
const router = express.Router();
const cors = require("cors");
const User = require('../models/user');
const {getUsers, getUsersLogin, postRegisterUser, userImageUpdate} = require('../controllers/userController.js');
router.use(cors({
    origin: "*"
}));
router.get('/', getUsers);
//router.get('/:id', getUsersLogin);
router.post('/login', getUsersLogin);
router.post('/', postRegisterUser);
router.post('/updateImage', userImageUpdate);


module.exports = router;