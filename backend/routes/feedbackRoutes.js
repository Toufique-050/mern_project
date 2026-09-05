const express = require("express");
const {
  submitFeedback,
  getMyFeedback,
  getEventFeedback,
  updateFeedbackVisibility
} = require("../controllers/feedbackController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  allowRoles("participant"),
  submitFeedback
);

router.get(
  "/my",
  protect,
  allowRoles("participant"),
  getMyFeedback
);

router.get(
  "/event/:eventId",
  protect,
  allowRoles("organizer", "admin"),
  getEventFeedback
);

router.patch(
  "/:id/visibility",
  protect,
  allowRoles("admin"),
  updateFeedbackVisibility
);

module.exports = router;