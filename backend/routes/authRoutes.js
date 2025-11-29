const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User exists" });

    const user = await User.create({ name, email, password });

    return res.status(201).json({
      _id: user._id,
      name,
      email,
      token: createToken(user._id)
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: createToken(user._id)
  });
});

module.exports = router;
