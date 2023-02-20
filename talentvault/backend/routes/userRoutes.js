const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const protect = require("../middleware/authVerification");

router.use(protect);

router
  .route("/")
  .patch(usersController.updateUserInfo)
  .delete(usersController.deleteUser)
  .get(usersController.getUserInfo);

<<<<<<< HEAD
// router.route("/updatePassword").post(usersController.updatePassword);
=======
router.route('/updatePassword')
  .post(usersController.updatePassword)

>>>>>>> be85c17a7cd117fa9d3c1424f8f12f54e4cf35ba
module.exports = router;
