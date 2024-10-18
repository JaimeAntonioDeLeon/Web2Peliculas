const express =  require("express");
const router = express.Router();
const cors = require("cors");
const {getLists, getListSpecific, postCreateList} = require('../controllers/listController.js');
router.use(cors({
    origin: "*"
}));
router.get('/', getLists);
router.post('/post', getListSpecific);
router.post('/', postCreateList);


module.exports = router;