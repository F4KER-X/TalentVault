const Job = require("../models/Job");
const asyncHandler = require('express-async-handler');
const Recruiter = require("../models/Recruiter");
const { application } = require("express");
const Application = require("../models/Application");

// @desc Get all jobs
// @route GET /jobs
// @access Private
const getAllJobs = asyncHandler(async (req, res) => {
  //search for all jobs
  const jobsData = await Job.find()
  if (jobsData.length === 0) {
    return res.status(404).json({ message: "No jobs found" });
  }
  //return the jobs
  res.status(200).json(jobsData)
})

// @desc POST new job
// @route POST /jobs
// @access Private
const createNewJob = asyncHandler(async (req, res) => {

  //get role and id from the cookie
  const { _id, role } = req.user

  //if not a recruiter then can't add a job
  if (role !== 'recruiter') {
    return res.status(401).json({ message: 'Not authorized to add a job' })
  }

  //find the recruiter to get the companyName
  const user = await Recruiter.findOne({ userId: _id }).lean().exec()

  //get infor from body
  const {
    jobTitle,
    maxSalary,
    minSalary,
    jobDescription,
    jobType,
    jobRequirements,
    jobLocation,
    workType
  } = req.body

  //validation
  if (!jobTitle || !maxSalary || !minSalary || !jobDescription || !jobType || !jobRequirements || !jobLocation || !workType) {
    return res.status(400).json({ message: 'Please make sure all fields are filled out' })
  }

  if (minSalary < 0 || maxSalary < 0) {
    return res.status(400).json({ message: 'Salaries can not be negative' })
  }

  if (minSalary >= maxSalary) {
    return res.status(400).json({ message: 'Make sure Max and Min salaries are correct' })
  }

  //create job object
  const jobObject = {
    recruiterId: _id,
    jobTitle,
    companyName: user.companyName,
    maxSalary,
    minSalary,
    jobDescription,
    jobType,
    jobRequirements,
    jobLocation,
    workType
  }

  //add job
  const job = await Job.create(jobObject);

  if (!job) {
    return res.status(400).json({ message: 'Error creating a new job, please contact us' })
  }

  res.status(200).json({
    message: `${job.jobTitle} for ${job.companyName} has been added`,
  })
})

// @desc GET one job
// @route GET /job/:id
// @access Private
const getOneJob = asyncHandler(async (req, res) => {

  try {
    const job = await Job.findById(req.params["id"]);
    if (!job) {
      return res.status(404).json({ message: "Job does not exist" });
    }
    res.json(job);
  } catch (error) {
    return res.status(400).json({ message: 'Not a valid URL' })
  }

}
)

// @desc PATCH job
// @route PTACH /jobs/:id
// @access Private
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params["id"]).exec();
  if (!job) {
    return res.status(404).json({ message: "Job does not exist" });
  }

  const { _id } = req.user
  if (!_id.equals(job.recruiterId)) return res.status(401).json({ message: 'Not authorized to edit this job' })

  const {
    jobTitle,
    maxSalary,
    minSalary,
    jobDescription,
    jobType,
    jobRequirements,
    jobLocation,
    status,
    workType
  } = req.body;

  if (jobTitle) job.jobTitle = jobTitle

  if (maxSalary) job.maxSalary = maxSalary

  if (minSalary) job.minSalary = minSalary

  if (jobDescription) job.jobDescription = jobDescription

  if (jobType) job.jobType = jobType

  if (jobRequirements) job.jobRequirements = jobRequirements

  if (status) job.status = status

  if (workType) job.workType = workType

  if (jobLocation) {
    if (jobLocation.city) {
      job.jobLocation.city = jobLocation.city
    }
    if (jobLocation.province) {
      job.jobLocation.province = jobLocation.province
    }
  }

  const updatedJob = await job.save()

  if (updatedJob) {
    res.status(200).json({ message: 'Job updated succussfully' })
  } else {
    res.status(400).json({ message: 'Job update was not successful' })
  }

})

// @desc DELETE job
// @route DELETE /jobs/:id
// @access Private
const deleteJob = asyncHandler(async (req, res) => {
  //have to check if the posting has any jobs application or created any open jobs once we implement the jobs model

  const job = await Job.findById(req.params["id"]).exec();
  if (!job) {
    return res.status(400).json({ message: "Job posting does not exist" });
  }
  const { _id } = req.user
  if (!_id.equals(job.recruiterId)) {
    return res.status(401).json({ message: 'Not authorized to delete this job' })
  }
  if (job.status === 'Open') {
    return res.status(400).json({ message: 'Job can not be deleted, make sure it is closed' })
  }



  if (job.status === 'Closed') {
    const deleteApplications = await Application.deleteMany({ jobId: req.params["id"] })
    if (deleteApplications) {
      job.delete()
      res.status(200).json({
        message: 'Job has been deleted!',
      });
    }

  }


})


// @desc get all jobs by user
// @route DELETE /jobs/user-jobs
// @access Private
const getJobsByUser = asyncHandler(async (req, res) => {

  const { _id, role } = req.user

  if (role === 'recruiter') {
    const jobs = await Job.find({ recruiterId: _id }).lean().exec()
    if (jobs.length !== 0) {
      return res.status(200).json(jobs)
    } else {
      return res.status(400).json({ message: 'No current jobs for this user' })
    }
  } else {
    return res.status(400).json({ message: 'Not a recruiter' })
  }
})

module.exports = {
  getAllJobs,
  createNewJob,
  getOneJob,
  updateJob,
  deleteJob,
  getJobsByUser
};
