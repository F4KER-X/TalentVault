const asyncHandler = require('express-async-handler')
const Application = require('../models/Application')
const Job = require('../models/Job')
const transporter = require('../middleware/nodemailer')
const Recruiter = require('../models/Recruiter')
const Applicant = require('../models/Applicant')
const User = require('../models/User')


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

        const applications = await Application.find({ applicantId: _id }).lean().exec()

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


        const user = await User.findById(application.applicantId).lean().exec()
        const job = await Job.findById(application.jobId).lean().exec()
        const applicant = await Applicant.findOne({ userId: application.applicantId }).lean().exec()



        const updatedApplication = await application.save()

        if (updatedApplication) {

            const mailOptions = {
                from: `${process.env.EMAIL}`,
                to: `${user.email}`,
                subject: `${job.jobTitle} Application Updated - ${applicant.firstName} ${applicant.lastName}`,
                text: `Dear ${applicant.firstName},\n\nWe wanted to inform you that there has been an update to your application for the ${job.jobTitle} position at ${job.companyName}. The recruiter has made some changes to your application, and we wanted to bring them to your attention.\n\nPlease log in to our platform to view the updated details of your application. If you have any questions or concerns, please do not hesitate to reach out to us or the recruiter directly.\n\nThank you for your continued interest in this position, and we wish you the best of luck in your job search.\n\nBest regards,\n\nTalentVault Team`
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });


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
    const user = await User.findById(_id).lean().exec();
    const recruiter = await Recruiter.findOne({ userId: job.recruiterId }).lean().exec()
    const applicant = await Applicant.findOne({ userId: _id }).lean().exec()


    if (!application || !recruiter || !applicant) {
        return res.status(400).json({ message: 'Error creating a new application, please contact us' })
    }
    job.numberOfApplication += 1
    job.save()

    const mailOptions = {
        from: `${process.env.EMAIL}`,
        to: `${user.email}`,
        subject: `${job?.jobTitle} Application Received - ${applicant?.firstName} ${applicant?.lastName}`,
        text: `Dear ${recruiter?.firstName},\n\nWe wanted to inform you that ${applicant?.firstName} ${applicant?.lastName} has applied for the ${job?.jobTitle} position at ${job?.companyName} through our platform. We believe that they would be a great fit for the position and wanted to bring their application to your attention.\n\nPlease log in to our platform to view ${applicant.firstName}'s application and resume. Please let us know if there is any additional information that you require from us to support their application.\n\nWe appreciate your time and consideration and look forward to hearing from you soon.\n\nBest regards,\n\nTalentVault Team.`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.status(200).json({
        message: 'Application created',
    })
})


module.exports = { getApplicationForJob, getApplicationForUser, updateApplicatin, createNewApplication };