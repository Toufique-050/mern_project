
const express = require("express");

const {
  getDashboardStats,
  getUsers,
  updateUser,
  getAllEvents,
  updateEventStatus,
  getAllFeedback
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

// ============================================================
// ADMIN PROTECTION
// ============================================================

router.use(
  protect,
  allowRoles("admin")
);

// ============================================================
// DASHBOARD
// ============================================================

router.get(
  "/dashboard",
  getDashboardStats
);

// ============================================================
// USERS
// ============================================================

router.get(
  "/users",
  getUsers
);

router.patch(
  "/users/:id",
  updateUser
);

// ============================================================
// EVENTS
// ============================================================

router.get(
  "/events",
  getAllEvents
);

router.patch(
  "/events/:id/status",
  updateEventStatus
);

// ============================================================
// FEEDBACK
// ============================================================

router.get(
  "/feedback",
  getAllFeedback
);

module.exports = router;

