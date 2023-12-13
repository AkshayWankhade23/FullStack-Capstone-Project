const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  companyName: {
    type: String,
    required: true,
  },
  recruiterName: {
    type: String, 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
  },
  logoUrl: {
    type: String,
    required: true,
  },
  jobPosition: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
    enum: ["Full Time", "Part Time"],
  },
  remote: {
    type: String,
    required: true,
    enum: ["Remote", "Office"],
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  skillsRequired: {
    type: [String],
    required: true,
  },
  information: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Job", jobSchema);
