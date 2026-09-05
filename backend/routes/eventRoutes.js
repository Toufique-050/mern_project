const express = require("express");
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
  approveEvent
} = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getEvents);

router.get(
  "/organizer/my-events",
  protect,
  allowRoles("organizer", "admin"),
  getMyEvents
);

router.get("/:id", getEventById);

router.post(
  "/",
  protect,
  allowRoles("organizer", "admin"),
  upload.single("banner"),
  createEvent
);

router.put(
  "/:id",
  protect,
  allowRoles("organizer", "admin"),
  upload.single("banner"),
  updateEvent
);

router.delete(
  "/:id",
  protect,
  allowRoles("organizer", "admin"),
  deleteEvent
);

router.patch(
  "/:id/status",
  protect,
  allowRoles("admin"),
  approveEvent
);

module.exports = router;