const mongoose = require("mongoose");

const linkedInAnalysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  headline: String,
  about: String,
  skills: [String],
  experienceText: String,
  score: Number,
  breakdown: Object,
  suggestions: [String]
}, { timestamps: true });

module.exports = mongoose.model("LinkedInAnalysis", linkedInAnalysisSchema);
