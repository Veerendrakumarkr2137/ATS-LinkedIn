// backend/routes/resumeRoutes.js
const express = require("express");
const pdfParse = require("pdf-parse/lib/pdf-parse");
const mammoth = require("mammoth");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");
const ResumeAnalysis = require("../models/ResumeAnalysis");
const { scoreText } = require("../utils/atsScorer");

const router = express.Router();

// Extract text from file
const extractTextFromFile = async (file) => {
  if (file.mimetype === "application/pdf") {
    const data = await pdfParse(file.buffer);

    if (!data.text || data.text.trim().length < 10) {
      throw new Error(
        "Could not extract text. This PDF is image/scanned. Upload a text-based PDF."
      );
    }

    return data.text;
  }

  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return result.value;
  }

  throw new Error("Unsupported file format");
};

router.post(
  "/analyze",
  protect,
  upload.single("resume"),
  async (req, res) => {
    try {
      const file = req.file;
      const { jobTitle } = req.body;

      if (!file) {
        return res.status(400).json({ message: "Resume file is required" });
      }

      let text;
      try {
        text = await extractTextFromFile(file);
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }

      const { score, breakdown, suggestions } = scoreText(
        text,
        jobTitle || "full stack developer"
      );

      const analysis = await ResumeAnalysis.create({
        user: req.user._id,
        originalFileName: file.originalname,
        fileType: file.mimetype,
        jobTitle: jobTitle,
        score,
        breakdown,
        suggestions,
        rawText: text.slice(0, 5000),
      });

      return res.json({
        message: "Resume analyzed successfully",
        analysis,
      });
    } catch (error) {
      console.error("Resume analysis error:", error.message);
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
);

module.exports = router;
