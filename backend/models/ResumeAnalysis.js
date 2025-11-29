const mongoose = require("mongoose");

const resumeAnalysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  originalFileName: String,
  fileType: String,
  jobTitle: String,
  score: Number,
  breakdown: Object,
  suggestions: [String],
  rawText: String
}, { timestamps: true });

module.exports = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);
