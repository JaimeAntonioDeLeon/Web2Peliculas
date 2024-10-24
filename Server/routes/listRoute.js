const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  getLists,
  getListSpecific,
  postCreateList,
  listUpdate,
  deleteList,
  getListsMovie,
  getListsUser,
  getListSearch,
  listAddMovie,
  listRemoveMovie,
  getListsUserMovieFilter,
} = require("../controllers/listController.js");
router.use(
  cors({
    origin: "*",
  })
);
router.get("/", getLists);
router.post("/get", getListSpecific);
router.post("/movie", getListsMovie);
router.post("/user", getListsUser);
router.post("/userUnique", getListsUserMovieFilter);
router.post("/", postCreateList);
router.post("/update", listUpdate);
router.post("/delete", deleteList);
router.post("/", postCreateList);
router.post("/search", getListSearch);
router.post("/addMovie", listAddMovie);
router.post("/removeMovie", listRemoveMovie);

module.exports = router;
