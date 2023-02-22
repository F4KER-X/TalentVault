const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')


router.route('/signup')
    .post(authController.registerUser)

router.route('/login')
    .post(authController.loginUser)

router.route('/logout')
    .get(authController.logoutUser)

router.route('/loggedinStatus')
    .get(authController.loggedinStatus)

module.exports = router