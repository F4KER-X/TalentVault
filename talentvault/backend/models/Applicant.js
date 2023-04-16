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
    bio: {
        type: String
    },
    profilePicUrl: {
        public_id: { type: String, default: 0 },
        URL: { type: String, default: 'https://i.ibb.co/4pDNDk1/avatar.png' }
    },
    resume: {
        public_id: { type: String, default: 0 },
        URL: { type: String }
    },
    phoneNumber: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Applicant', applicantSchema)
