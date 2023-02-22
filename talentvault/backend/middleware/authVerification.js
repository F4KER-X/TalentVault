const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

const protect = asyncHandler(async (req, res, next) => {

    try {

        const { token } = req.cookies

        if (!token) {
            res.status(401).json({ message: 'Not authorized' })
        }

        //verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        //get user from token
        const user = await User.findById(verified.id).select('-password').lean().exec()

        if (!user) {
            res.status(401).json({ message: 'User not found' })
        }

        req.user = user

        next()

    } catch (err) {

    }





})

module.exports = protect