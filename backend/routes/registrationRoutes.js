const express = require("express");
const {
  registerForEvent,
  cancelRegistration,
  getMyRegistrations,
  getEventRegistrations
} = require("../controllers/registrationController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);

router.post("/", allowRoles("participant"), registerForEvent);
router.get("/my", allowRoles("participant"), getMyRegistrations);
router.patch("/:id/cancel", allowRoles("participant"), cancelRegistration);

router.get(
  "/event/:eventId",
  allowRoles("organizer", "admin"),
  getEventRegistrations
);

module.exports = router;