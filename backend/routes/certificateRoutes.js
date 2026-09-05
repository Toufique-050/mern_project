const express = require("express");
const {
  getMyCertificates,
  generateCertificateForStudent,
  downloadCertificate
} = require("../controllers/certificateController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/my",
  protect,
  allowRoles("participant"),
  getMyCertificates
);

router.post(
  "/generate",
  protect,
  allowRoles("organizer", "admin"),
  generateCertificateForStudent
);

router.get(
  "/:id/download",
  protect,
  downloadCertificate
);

module.exports = router;