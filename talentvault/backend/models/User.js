const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'email is required'],

    },
    password: {
        type: String,
        required: [true, 'password is required'],

    },
    role: {
        type: String,
        enum: ['recruiter', 'applicant'],
        required: [true, 'roles is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('User', userSchema)