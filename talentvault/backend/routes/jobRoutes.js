const express = require('express')
const router = express.Router()
const jobsController = require('../controllers/jobsController')
const protect = require("../middleware/authVerification");

router.use(protect)

router.route("/")
  //get all jobs
  .get(jobsController.getAllJobs)
  //create job
  .post(jobsController.createNewJob);

router.route("/:id")
  //get a job
  .get(jobsController.getOneJob)
  //update a job
  .patch(jobsController.updateJob)
  //delete a job
  .delete(jobsController.deleteJob);

module.exports = router;
