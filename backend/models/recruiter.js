const mongoose = require('mongoose')

const recruiterSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    profilePicUrl: {
        type: String,
    },
    companyName: {
        type: String,
    },
    phoneNumber: {
        type: String
    }

})

module.exports = mongoose.model('recruiter', recruiterSchema)