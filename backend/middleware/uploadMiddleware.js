const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only PDF and DOCX allowed"));
};

module.exports = { upload: multer({ storage, fileFilter }) };
