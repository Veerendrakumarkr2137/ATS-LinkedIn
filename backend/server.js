const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.get("/", (req, res) => res.send("Backend is running"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/resume", require("./routes/resumeRoutes"));
app.use("/api/linkedin", require("./routes/linkedinRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
