const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadRoot = path.join(
  __dirname,
  "..",
  process.env.UPLOAD_DIR || "uploads"
);

const folders = {
  event: path.join(uploadRoot, "events"),
  gallery: path.join(uploadRoot, "gallery")
};

Object.values(folders).forEach((folder) => {
  fs.mkdirSync(folder, { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.baseUrl.includes("/media")
      ? folders.gallery
      : folders.event;

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeName = path
      .basename(file.originalname, extension)
      .replace(/[^a-z0-9-_]/gi, "-")
      .toLowerCase();

    cb(
      null,
      `${Date.now()}-${safeName || "upload"}${extension}`
    );
  }
});

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm"
];

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error("Only JPG, PNG, WEBP, GIF, MP4 and WEBM files are allowed.")
    );
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

module.exports = upload;