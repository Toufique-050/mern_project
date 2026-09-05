const express = require("express");
const {
  getMyEventQR,
  markAttendance,
  getEventAttendance
} = require("../controllers/attendanceController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/my-qr/:eventId",
  protect,
  allowRoles("participant"),
  getMyEventQR
);

router.post(
  "/mark",
  protect,
  allowRoles("organizer", "admin"),
  markAttendance
);

router.get(
  "/event/:eventId",
  protect,
  allowRoles("organizer", "admin"),
  getEventAttendance
);

module.exports = router;