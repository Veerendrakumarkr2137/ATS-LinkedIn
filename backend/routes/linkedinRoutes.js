const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { scoreText } = require("../utils/atsScorer");
const LinkedInAnalysis = require("../models/LinkedInAnalysis");

const router = express.Router();

router.post("/analyze", protect, async (req, res) => {
  const { headline, about, skills, experienceText, targetRole } = req.body;

  const combined = `
    ${headline}
    ${about}
    ${(skills || []).join(", ")}
    ${experienceText}
  `;

  const result = scoreText(combined, targetRole);

  const save = await LinkedInAnalysis.create({
    user: req.user._id,
    headline,
    about,
    skills,
    experienceText,
    ...result
  });

  res.json({ message: "LinkedIn analyzed", analysis: save });
});

module.exports = router;
