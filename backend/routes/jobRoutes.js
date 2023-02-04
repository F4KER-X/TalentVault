const express = require('express')
const router = express.Router()


router.route('/')
    //get all jobs
    .get()
    //create job
    .post()

router.route('/:id')
    //get a job
    .get()
    //update a job
    .patch()
    //delete a job
    .delete()


module.exports = router