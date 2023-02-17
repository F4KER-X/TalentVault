const mongoose = require('mongoose')

const recruiterSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID is required'],
        ref: 'User'
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required']
    },
    profilePicUrl: {
        type: String
    },
    phoneNumber: {
        type: String
        //add validator
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Recruiter', recruiterSchema)