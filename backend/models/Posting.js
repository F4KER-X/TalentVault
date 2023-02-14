const mongoose = require("mongoose");

const postingSchema = mongoose.Schema({
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  jobTitle: {
    type: String,
  },
  companyName: {
    type: String,
  },
  salary: {
    type: Number,
  },

  jobDescription: {
    type: String,
  },
  jobType: {
    type: { type: String, enum: ["full-time", "part-time", "permanent"] },
  },
  jobRequirements: {
    //requirements like "must have degree in finance"
    type: String,
  },
});

module.exports = mongoose.model("posting", postingSchema);
