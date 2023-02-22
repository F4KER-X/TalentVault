const asyncHandler = require('express-async-handler')
const User = require('../models/User')

//email validation
const validEmail = email => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
}

const usedEmail = asyncHandler(async (email) => {
    return await User.findOne({ email }).lean().exec()
})

const validPassword = password => {
    return (password.length < 8)
}

module.exports = { validEmail, usedEmail, validPassword }