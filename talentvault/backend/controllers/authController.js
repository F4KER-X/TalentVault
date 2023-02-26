const User = require('../models/User')
const Recruiter = require('../models/Recruiter')
const Applicant = require('../models/Applicant')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const { validEmail, usedEmail, validPassword } = require('./userValidation')


// @desc Authenticate a user
// @route POST /auth/signup
// @access Public
const registerUser = asyncHandler(async (req, res) => {

    //for user registration
    const { email, password, role, companyName, firstName, lastName } = req.body


    //validation email
    if (!email) {
        return res.status(400).json({ message: 'Email was not provided' })
    } else if (!validEmail(email)) {
        return res.status(400).json({ message: `${email} is not a valid email` })
    } else if (await usedEmail(email)) {
        return res.status(400).json({ message: `${email} is already registered` })
    }

    //validation pwd
    if (!password) {
        return res.status(400).json({ message: 'Empty field' })
    } else if (validPassword(password)) {
        return res.status(400).json({ message: 'Make sure the password is not less than 8 characters' })
    }


    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPwd = await bcrypt.hash(password, salt)


    //create user
    const user = await User.create({
        email, password: hashedPwd, role
    })

    //generate token


    if (user) {
        //now create either applicant or recruiter
        const token = generateToken(user._id, user.role)
        const { role } = user
        if (user.role === 'recruiter') {
            if (!companyName) {
                await user.delete()
                return res.status(400).json({ message: 'Company name is missing, signup unsuccessful' })
            }
            if (!lastName || !firstName) {
                await user.delete()
                return res.status(400).json({ message: 'Full name is missing, signup unsuccessful' })
            }
            const recruiter = await Recruiter.create({
                userId: user._id, companyName, firstName, lastName
            })

            if (recruiter) {
                const { firstName, lastName, profilePicUrl } = recruiter
                // Send HTTP-only cookie
                res.cookie("token", token, {
                    path: "/",
                    httpOnly: true,
                    expires: new Date(Date.now() + 1000 * 86400), // 1 day
                    sameSite: "none",
                    secure: true,
                });
                res.status(200).json({
                    message: "Recruiter was created successfully!",
                    firstName,
                    lastName,
                    profilePicUrl,
                    token
                })
            }
        } else {
            //applicant
            if (!firstName || !lastName) {
                await user.delete()
                return res.status(400).json({ message: 'Full name is missing, signup unsuccessful' })
            }
            const applicant = await Applicant.create({
                userId: user._id, firstName, lastName
            })
            if (applicant) {
                const { firstName, lastName, profilePicUrl } = applicant
                // Send HTTP-only cookie
                res.cookie("token", token, {
                    path: "/",
                    httpOnly: true,
                    expires: new Date(Date.now() + 1000 * 86400), // 1 day
                    sameSite: "none",
                    secure: true,
                });
                res.status(200).json({
                    message: "Applicant was created successfully!",
                    firstName,
                    lastName,
                    profilePicUrl,
                    token
                })
            }
        }
    } else {
        return res.status(400).json({ message: 'Invalid user data' })
    }
})


// @desc login a user
// @route POST /auth/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(400).json({ message: 'Email field can not be empty' })
    }
    if (!password) {
        return res.status(400).json({ message: 'Password field can not be empty' })
    }

    //check for user email
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({ message: 'User not found, please signup' })
    }

    //user exists, check pass
    const correctPwd = await bcrypt.compare(password, user.password)

    const token = generateToken(user._id, user.role)


    let userProfile
    if (user.role === 'recruiter') {
        userProfile = await Recruiter.findOne({ userId: user._id }).lean().exec()
    } else {
        userProfile = await Applicant.findOne({ userId: user._id }).lean().exec()
    }

    const { firstName, lastName, profilePicUrl } = userProfile

    if (user && correctPwd) {
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: "none",
            secure: true,
        })
        res.status(200).json({
            message: 'Login succussfull', firstName, lastName, profilePicUrl, token
        })
    } else {
        res.status(400).json({ message: 'Invalid email or password' })
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({ message: "Successfully Logged Out" });
})

const loggedinStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token

    if (!token) {
        return res.json(false)
    }

    //verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET)

    if (verified)
        return res.json(true)
})

//Generate JWT token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' })
}


module.exports = { registerUser, loginUser, logoutUser, loggedinStatus }