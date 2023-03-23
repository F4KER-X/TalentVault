const asyncHandler = require('express-async-handler')
const Application = require('../models/Application')
const Job = require('../models/Job')


// @desc Get application for job.
// @route GET /application/job/id
// @access Private
const getApplicationForJob = asyncHandler(async (req, res) => {
    const { _id, role } = req.user
    if (role === 'recruiter') {
        const applications = await Application.find({ jobId: req.params['id'] }).lean().exec()
        if (applications.length !== 0) {
            return res.status(200).json(applications)
        } else {
            return res.status(200).json({ message: 'No current applications' })
        }
    } else {
        return res.status(401).json({ message: 'Not a recruiter' })
    }
})

// @desc Get application for a user.
// @route GET /application/:id
// @access Private
const getApplicationForUser = asyncHandler(async (req, res) => {
    const { _id, role } = req.user

    if (role === 'applicant') {

        let applications = await Application.find({ applicantId: _id }).lean().exec()

        await Promise.all(applications.map(async (application) => {
            const job = await Job.findById({ _id: application.jobId }).lean().exec()
            application.jobTitle = job.jobTitle
            application.companyName = job.companyName
            application.jobStatus = job.status
        }))



        if (applications.length !== 0) {
            return res.status(200).json(applications)
        } else {
            return res.status(200).json({ message: 'No current applications' })
        }

    } else {
        return res.status(401).json({ message: 'Not an applicant' })
    }
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

    //
    //job id -> recruterid
    //applicantid = user id

    const { jobId } = req.body
    if (!jobId) return res.status(400).json({ message: 'Job id is required' })

    const job = await Job.findById({ _id: jobId }).exec()

    if (!job) return res.status(404).json({ message: 'Job not found' })

    const applicationObject = {
        jobId,
        recruiterId: job.recruiterId,
        applicantId: _id
    }
    //create application
    const application = await Application.create(applicationObject)


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