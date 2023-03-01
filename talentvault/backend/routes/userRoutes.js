const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const protect = require("../middleware/authVerification");
const upload = require('../Utils/multer')


router.use(protect);

router
  .route("/")
  .patch(usersController.updateUserInfo)
  .delete(usersController.deleteUser)
  .get(usersController.getUserInfo);

router.route('/updatePassword')
  .patch(usersController.updatePassword)

router.route('/role')
  .get(usersController.getUserRole)

router.route('/upload/profile')
  .patch(upload.single('image'), usersController.uploadPhoto);

router.route('/upload/file')
  .patch(upload.single('file'), usersController.uploadFile)


module.exports = router;
