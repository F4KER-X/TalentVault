const mongoose = require("mongoose");

const applicantionSchema = mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Job",
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "applicant",
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Application', applicantionSchema)