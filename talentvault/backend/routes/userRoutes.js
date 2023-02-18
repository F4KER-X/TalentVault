const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const protect = require("../middleware/authVerification");

router.use(protect);

router.route('/')
  .patch(usersController.updateUserInfo)
  .delete(usersController.deleteUser)
  .get(usersController.getUserInfo);

module.exports = router;
