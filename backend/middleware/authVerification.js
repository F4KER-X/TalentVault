require('dotenv').config()
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

const protect = asyncHandler(async (req, res, next) => {

    let token

    if (req.headers.authorization?.startsWith('Bearer')) {
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            //get user from token 
            req.user = await User.findById(decode.id).select('_id, role').lean().exec()

            next()

        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(403)
        throw new Error('Forbidden, no token')
    }

})

module.exports = protect