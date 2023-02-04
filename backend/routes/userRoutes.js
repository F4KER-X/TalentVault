const express = require('express')
const router = express.Router()


router.route('/')
    //get all users
    .get()

    //create new user
    .post()


router.route('/:id')
    //get specific user
    .get()
    //update user
    .patch()
    //delete user
    .delete()




module.exports = router