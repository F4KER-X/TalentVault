const express = require('express')
const router = express.Router()
const applicationController = require('../controllers/applicantionController')
const protect = require("../middleware/authVerification");

router.use(protect)

router.route('/')
    .post(applicationController.createNewApplication)
    .get(applicationController.getApplicationForUser)

router.route('/job/:id')
    .get(applicationController.getApplicationForJob)


router.route("/:id")
    .get(applicationController.getApplicationForUser)
    .patch(applicationController.updateApplicatin)


module.exports = router