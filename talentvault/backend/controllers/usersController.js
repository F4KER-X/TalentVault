const User = require('../models/User')
const Recruiter = require('../models/Recruiter')
const Applicant = require('../models/Applicant')
const asyncHandler = require('express-async-handler')


// @desc Get info of the user
// @route GET /user
// @access Private
const getUserInfo = asyncHandler(async (req, res) => {

    const id = req.user._id
    const role = req.user.role

    if (role === 'recruiter') {
        const recruiter = await Recruiter.findOne({ userId: id }).lean().exec()
        if (!recruiter) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(recruiter)
    } else {
        const applicant = await Applicant.findOne({ userId: id }).lean().exec()
        if (!applicant) {
            return res.status(404).json({ message: 'User not found' })
        } else {
            res.status(200).json(applicant)
        }
    }

})


// @desc update user personal info
// @route PATCH /user
// @access Private
const updateUserInfo = asyncHandler(async (req, res) => {
    const { _id, role } = req.user
    const { companyName, firstName, lastName, phoneNumber, profilePicUrl, resume } = req.body
    console.log(_id);

    if (role === 'recruiter') {
        const recruiter = await Recruiter.findOne({ userId: _id }).exec()
        if (recruiter) {
            if (companyName) {
                recruiter.companyName = companyName
            }
            if (profilePicUrl) {
                recruiter.profilePicUrl = profilePicUrl
            }
            if (phoneNumber) {
                recruiter.phoneNumber = phoneNumber
            }

            const updatedRecruiuter = await recruiter.save()

            //may not be necessary - check later
            if (updatedRecruiuter) {
                res.status(200).json({ message: 'User info updated!', _id, role, companyName, profilePicUrl, phoneNumber })
            } else {
                res.status(400).json({ message: 'update request faild' })
            }

        } else {
            return res.status(404).json({ message: 'User does not exist' })
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

            //may not be necessary - check later
            if (updatedApplicant) {
                res.status(200).json({ message: 'User info updated!', userId: user._id, role: user.role, firstName, lastName, profilePicUrl, resume })
            } else {
                res.status(400).json({ message: 'update request faild' })

            }

        } else {
            return res.status(404).json({ message: 'User does not exist' })
        }
    }

})

// @desc delete user
// @route DELETE /user
// @access Private
const deleteUser = asyncHandler(async (req, res) => {

    const user = req.user

    const deletedUser = await User.findByIdAndDelete(user._id).lean().exec()
    if (deletedUser) {
        if (deletedUser.role === 'recruiter') {
            const deletedRecruiter = await Recruiter.findOneAndDelete({ userId: user._id }).exec()
            console.log(user._id);
            if (deletedRecruiter) {
                res.status(200).json({ meesage: "User deleted" })
            } else {
                res.status(500).json({ message: 'Could not delete user' })
            }
        } else {
            const deletedApplicant = await Applicant.findOneAndDelete({ userId: user._id })
            if (deletedApplicant) {
                res.status(200).json({ meesage: "User deleted" })
            } else {
                res.status(500).json({ message: 'Could not delete user' })
            }

        }
    } else {
        res.status(404).json({ message: 'User not found' })
    }
})



module.exports = { getUserInfo, updateUserInfo, deleteUser }

