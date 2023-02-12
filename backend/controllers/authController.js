const User = require('../models/User')
const Recruiter = require('../models/Recruiter')
const Applicant = require('../models/Applicant')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


// @desc Authenticate a user
// @route POST /auth/signup
// @access Public
const registerUser = asyncHandler(async (req, res) => {

    //for user registration
    const { email, password, role } = req.body

    //for recruiter/applicant registration
    const { companyName, profilePicUrl, phoneNumber, firstName, lastName, resume } = req.body

    //email validation
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    const usedEmail = await User.findOne({ email }).exec()
    console.log("jere");

    //validation email
    if (!email) {
        res.status(400)
        throw new Error('Empty field')
    } else if (!validEmail) {
        res.status(400)
        throw new Error(`${email} is not a valid email`)
    } else if (usedEmail) {
        res.status(400)
        throw new Error(`${email} is already registered`)
    }

    //validation pwd
    if (!password) {
        res.status(400)
        throw new Error('Empty field')
    } else if (password.length < 8) {
        res.status(400)
        throw new Error('Make sure the password is not less than 8 characters')
    }


    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPwd = await bcrypt.hash(password, salt)


    //create user
    const user = await User.create({
        email, password: hashedPwd, role
    })

    if (user) {
        //now create either applicant or recruiter
        if (user.role === 'recruiter') {
            if (!companyName) {
                await user.delete()
                res.status(400)
                throw new Error('Required fields are empty')
            }
            const recruiter = await Recruiter.create({
                userId: user._id, companyName, profilePicUrl, phoneNumber
            })
            if (recruiter) {
                res.status(201).json({
                    message: "Recruiter was created successfully!",
                    token: generateToken(user.id, user.role)
                })
            }
        } else {
            if (!firstName || !lastName) {
                await user.delete()
                res.status(400)
                throw new Error('Required fields are empty')
            }
            const applicant = await Applicant.create({
                userId: user._id, firstName, lastName, phoneNumber, profilePicUrl, resume
            })
            if (applicant) {
                res.status(201).json({
                    message: "Applicant was created successfully!",
                    token: generateToken(user.id, user.role)
                })
            }
        }
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// @desc login a user
// @route POST /auth/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //check for user email
    const user = await User.findOne({ email }).exec()

    //check pwd
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            message: "Login successful",
            token: generateToken(user.id, user.role)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//Generate JWT token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' })
}


module.exports = { registerUser, loginUser }