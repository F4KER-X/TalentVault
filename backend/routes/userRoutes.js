const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')


router.route('/')
    //get all users
    .get(usersController.getAllUsers)

    //create new user
    .post(usersController.createNewUser)


router.route('/:id')
    //get specific user
    .get(usersController.getOneUser)
    //update user
    .patch(usersController.updateUser)
    //delete user
    .delete(usersController.deleteUser)




module.exports = router