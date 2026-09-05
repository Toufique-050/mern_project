
const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/Registration");
const Feedback = require("../models/Feedback");
const Media = require("../models/Media");

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalEvents,
      pendingEvents,
      totalRegistrations,
      totalFeedback,
      totalMedia
    ] = await Promise.all([
      User.countDocuments(),
      Event.countDocuments(),
      Event.countDocuments({ status: "pending" }),
      Registration.countDocuments({ status: "confirmed" }),
      Feedback.countDocuments(),
      Media.countDocuments()
    ]);

    const roleCounts = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 }
        }
      }
    ]);

    const categoryCounts = await Event.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalEvents,
        pendingEvents,
        totalRegistrations,
        totalFeedback,
        totalMedia,
        usersByRole: roleCounts,
        eventsByCategory: categoryCounts
      }
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load dashboard statistics."
    });
  }
};


const getUsers = async (req, res) => {
  try {
    const { role, search } = req.query;

    const filter = {};

    if (role) {
      filter.role = role;
    }

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i"
          }
        },
        {
          email: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load users."
    });
  }
};


const updateUser = async (req, res) => {
  try {
    const { role, isActive, email } = req.body;

    const updates = {};

    // Update role
    if (role !== undefined) {
      if (!["participant", "organizer", "admin"].includes(role)) {
        return res.status(400).json({
          success: false,
          message: "Invalid role."
        });
      }

      updates.role = role;
    }

    // Update active status
    if (isActive !== undefined) {
      updates.isActive = Boolean(isActive);
    }

    // Update email
    if (email !== undefined) {
      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail) {
        return res.status(400).json({
          success: false,
          message: "Email is required."
        });
      }

      // Check if another account already uses this email
      const existingUser = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: req.params.id }
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "This email is already being used by another account."
        });
      }

      updates.email = normalizedEmail;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    res.json({
      success: true,
      message: "User updated successfully.",
      user
    });
  } catch (error) {
    console.error("Update user error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update user."
    });
  }
};


const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organizer", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      events
    });
  } catch (error) {
    console.error("Get events error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load events."
    });
  }
};


// IMPORTANT: This function fixes the current error.

const updateEventStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event status."
      });
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true
      }
    ).populate("organizer", "name email");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found."
      });
    }

    res.json({
      success: true,
      message: `Event ${status} successfully.`,
      event
    });
  } catch (error) {
    console.error("Update event status error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update event status."
    });
  }
};


const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate("student", "name email department enrollmentNo")
      .populate("event", "title date category")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      feedback
    });
  } catch (error) {
    console.error("Get feedback error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load feedback."
    });
  }
};


module.exports = {
  getDashboardStats,
  getUsers,
  updateUser,
  getAllEvents,
  updateEventStatus,
  getAllFeedback
};

