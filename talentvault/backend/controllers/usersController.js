const User = require('../models/User')
const Recruiter = require('../models/Recruiter')
const Applicant = require('../models/Applicant')

const asyncHandler = require('express-async-handler')


// @desc Get info of the user
// @route GET /user
// @access Private
const getUserInfo = asyncHandler(async (req, res) => {

    const user = req.user

    if (user.role === 'recruiter') {
        const recruiter = await Recruiter.findOne({ userId: user._id }).exec()
        if (!recruiter) {
            res.status(404)
            throw new Error('User not found')
        }
        res.status(200).json(recruiter)
    } else {
        const applicant = await Applicant.findOne({ userId: user._id }).exec()
        if (!applicant) {
            res.status(404)
            throw new Error('User not found')
        } else {
            res.status(200).json(applicant)
        }
    }

})


// @desc update user personal info
// @route PATCH /user
// @access Private
const updateUserInfo = asyncHandler(async (req, res) => {
    const user = req.user
    const data = req.body

    if (user.type === 'recruiter') {
        const recruiter = await Recruiter.findOne({ userId: user._id }).exec()
        if (recruiter) {
            if (data.companyName) {
                recruiter.companyName = data.companyName
            }
            if (data.profilePicUrl) {
                recruiter.profilePicUrl = data.profilePicUrl
            }
            if (data.phoneNumber) {
                recruiter.phoneNumber = data.phoneNumber
            }

            const updatedRecruiuter = await recruiter.save()

            //may not be necessary - check laster
            if (updatedRecruiuter && !updatedRecruiuter === recruiter) {
                res.status(200).json({ message: 'User updated!' })
            } else {
                res.status(500)
                throw new Error('No changes')
            }

        } else {
            res.status(400)
            throw new Error('User does not exist')
        }
    } else {
        const applicant = await Applicant.findOne({ userId: user._id }).exec()
        if (applicant) {
            if (data.firstName) {
                applicant.firstName = data.firstName
            }
            if (data.lastName) {
                applicant.lastName = data.lastName
            }
            if (data.phoneNumber) {
                applicant.phoneNumber = data.phoneNumber
            }
            if (data.resume) {
                applicant.resume = data.resume
            }
            if (data.profilePicUrl) {
                applicant.profilePicUrl = data.profilePicUrl
            }

            const updatedApplicant = await applicant.save()

            //may not be necessary - check laster
            if (updatedApplicant) {
                res.status(200).json({ message: 'User updated!' })
            } else {
                res.status(500)
                throw new Error('Something went wrong')
            }

        } else {
            res.status(400)
            throw new Error('User does not exist')
        }
    }

})

// @desc delete user
// @route DELETE /user
// @access Private
const deleteUser = asyncHandler(async (req, res) => {

    const user = req.user

    const deletedUser = await User.findByIdAndDelete(user._id).exec()
    if (deletedUser) {
        if (deletedUser.role === 'recruiter') {
            const deletedRecruiter = await Recruiter.findOneAndDelete({ userId: user._id }).exec()
            console.log(user._id);
            if (deletedRecruiter) {
                res.status(200).json({ meesage: "User deleted" })
            } else {
                res.status(400)
                console.log(user._id);
                throw new Error('Could not delete user')
            }
        } else {
            const deletedApplicant = await Applicant.findOneAndDelete({ userId: user._id })
            if (deletedApplicant) {
                res.status(200).json({ meesage: "User deleted" })
            } else {
                res.status(400)
                console.log(user._id);
                console.log("applicant");
                throw new Error('Could not delete user')
            }

        }
    } else {
        res.status(400)
        throw new Error('User not found')
    }
})



module.exports = { getUserInfo, updateUserInfo, deleteUser }
