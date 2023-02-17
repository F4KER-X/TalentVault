const Job = require("../models/Job");
const asyncHandler = require('express-async-handler')

// @desc Get all jobs
// @route GET /jobs
// @access Private
const getAllJobs = asyncHandler(async (req, res) => {
  const jobsData = await Jobs.find().lean().exec();
  if (!postings) {
    return res.status(404).json({ message: "No jobs found" });
  }
  res.status(200).json(jobsData)
})

// @desc POST new job
// @route POST /jobs
// @access Private
const createNewJob = asyncHandler(async (req, res) => {

  const {
    recruiterId,
    jobTitle,
    companyName,
    maxSalary,
    minSalary,
    jobDescription,
    jobType,
    jobRequirements,
    jobLocation,
  } = req.body

  const jobObject = {
    recruiterId,
    jobTitle,
    companyName,
    maxSalary,
    minSalary,
    jobDescription,
    jobType,
    jobRequirements,
    jobLocation
  }

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
  const job = await Job.findById(req.params["id"]);
  if (!job) {
    return res.status(404).json({ message: "Job does not exist" });
  }
  res.json(job);
})

// @desc PATCH job
// @route PTACH /jobs/:id
// @access Private
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params["id"]).exec();
  if (!job) {
    return res.status(404).json({ message: "Job does not exist" });
  }

  const {
    jobTitle,
    maxSalary,
    minSalary,
    jobDescription,
    jobType,
    jobRequirements,
    jobLocation
  } = req.body;

  if (jobTitle) job.jobTitle = jobTitle

  if (maxSalary) job.maxSalary = maxSalary

  if (minSalary) job.minSalary = minSalary

  if (jobDescription) job.jobDescription = jobDescription

  if (jobType) job.jobType = jobType

  if (jobRequirements) job.jobRequirements = jobRequirements

  if (jobLocation) {
    if (jobLocation.city) {
      job.jobLocation.city = jobLocation.city
    }
    if (jobLocation.province) {
      job.jobLocation.province = jobLocation.province
    }
  }

  const upatedJob = await job.save()

  if (updateJob) {
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

  const job = await Job.findByIdAndDelete(req.params["id"]).lean().exec();
  if (!job) {
    return res.status(400).json({ message: "Job posting does not exist" });
  }

  res.status(200).json({
    message: `${job._id} with job company ${job.companyName} for ${job.jobTitle} has been deleted`,
  });
})

module.exports = {
  getAllJobs,
  createNewJob,
  getOneJob,
  updateJob,
  deleteJob,
};
