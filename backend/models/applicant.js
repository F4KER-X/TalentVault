const mongoose = require('mongoose')

const applicantSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    profilePicUrl: {
        type: String,
        //add validation
    },
    resume: {
        type: String
    },
    phoneNumber: {
        type: String
        //add validation
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('applicant', applicantSchema)