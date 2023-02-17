const express = require("express");
const router = express.Router();
const postingController = require("../controllers/postingController");

router.route("/createPost").post(postingController.createNewPosting);

router.route("/getPosts").post(postingController.getAllPostings);

module.exports = router;
