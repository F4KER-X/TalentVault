const asyncHandler = require('express-async-handler')
const Applicant = require('../models/Applicant')
const Application = require('../models/Application')
const Job = require('../models/Job')
const Recruiter = require('../models/Recruiter')
const User = require('../models/User')


// @desc Get application for job.
// @route GET /application/job/id
// @access Private
const getApplicationForJob = asyncHandler(async (req, res) => {
    const applications = await Application.find({ jobId: req.params['id'] }).lean().exec()

    const updatedApplications = await Promise.all(
        applications.map(async (application) => {
            const applicant = await Applicant.findOne({ userId: application.applicantId }).lean().exec()

            const user = await User.findById(application.applicantId).lean().exec()
            return {
                firstName: applicant.firstName,
                lastName: applicant.lastName,
                phoneNumber: applicant.phoneNumber,
                email: user.email,
                applicationStatus: application.status,
                resume: applicant.resume.URL,
                applicantId: application.applicantId,
                jobId: application.jobId,
                applicationId: application._id
            };
        })
    );
    console.log(updatedApplications);
    return res.status(200).json(updatedApplications)
})

// @desc Get application for a user.
// @route GET /application/:id
// @access Private
const getApplicationForUser = asyncHandler(async (req, res) => {
    const { _id } = req.user

    const applications = await Application.find({ applicantId: _id }).lean().exec()

    const updatedApplications = await Promise.all(
        applications.map(async (application) => {
            const recruiter = await Recruiter.findOne({ userId: application.recruiterId }).lean().exec()
            const job = await Job.findById(application.jobId).lean().exec()
            const user = await User.findById(application.recruiterId).lean().exec()
            return {
                jobTitle: job.jobTitle,
                companyName: recruiter.companyName,
                firstName: recruiter.firstName,
                lastName: recruiter.lastName,
                email: user.email,
                jobStatus: job.status,
                applicationStatus: application.status,
                jobId: job._id
            };
        })

    );
    console.log(updatedApplications);
    return res.status(200).json(updatedApplications)


})


// @desc update application status.
// @route PATCH /application/:id
// @access Private
const updateApplicatin = asyncHandler(async (req, res) => {
    const { _id, role } = req.user
    if (role === 'recruiter') {
        const application = await Application.findById(req.params['id']).exec()

        if (!application) {
            return res.status(404).json({ message: 'Application does not exist' })
        }

        if (!_id.equals(application.recruiterId)) {
            return res.status(401).json({ message: 'Not authorized to edit this application' })
        }

        const { status } = req.body
        if (status) application.status = status


        const updatedApplication = await application.save()

        if (updatedApplication) {
            res.status(200).json({ message: 'Application updated' })
        } else {
            res.status(400).json({ message: 'Application update was not successful' })
        }



    } else {
        res.status(401).json({ message: 'Only recruiters can update an application' })
    }
})


const createNewApplication = asyncHandler(async (req, res) => {

    const { _id, role } = req.user

    if (role !== 'applicant') {
        return res.status(401).json({ message: 'Not authorized' })
    }

    const { jobId } = req.body
    if (!jobId) return res.status(400).json({ message: 'Job id is required' })

    const foundApplication = await Application.findOne({ jobId, applicantId: _id })

    if (foundApplication) {
        return res.status(400).json({ message: 'User already have an application' })
    }
    const job = await Job.findById({ _id: jobId }).exec()

    if (!job) return res.status(404).json({ message: 'Job not found' })

    const applicationObject = {
        jobId,
        recruiterId: job.recruiterId,
        applicantId: _id
    }

    let application;
    if (job.status === 'Open') {
        //create application
        application = await Application.create(applicationObject)
    }


    if (!application) {
        return res.status(400).json({ message: 'Error creating a new application, please contact us' })
    }
    job.numberOfApplication += 1
    job.save()

    res.status(200).json({
        message: 'Application created',
    })
})


module.exports = { getApplicationForJob, getApplicationForUser, updateApplicatin, createNewApplication };