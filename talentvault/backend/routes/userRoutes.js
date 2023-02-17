const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const protect = require('../middleware/authVerification')

router.use(protect)
router.route('/')
    //get all users
    //.get(usersController.getAllUsers)
    .patch(usersController.updateUserInfo)
    .delete(usersController.deleteUser)
    .get(usersController.getUserInfo)

//create new user
//     .post()


// router.route('/:id')
//     //get specific user
//     .get()
//     //update user
//     .patch()
//     //delete user
//     .delete()




module.exports = router