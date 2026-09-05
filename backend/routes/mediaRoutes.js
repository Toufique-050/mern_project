const express = require("express");
const {
  getGallery,
  uploadMedia,
  deleteMedia
} = require("../controllers/mediaController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getGallery);

router.post(
  "/",
  protect,
  allowRoles("organizer", "admin"),
  upload.single("file"),
  uploadMedia
);

router.delete(
  "/:id",
  protect,
  allowRoles("organizer", "admin"),
  deleteMedia
);

module.exports = router;