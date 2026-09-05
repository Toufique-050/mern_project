const User = require("../models/User");

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.json({
    success: true,
    user
  });
};

const updateProfile = async (req, res) => {
  const allowedFields = [
    "name",
    "contact",
    "department",
    "enrollmentNo"
  ];

  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    updates,
    { new: true, runValidators: true }
  ).select("-password");

  res.json({
    success: true,
    message: "Profile updated successfully.",
    user
  });
};

module.exports = { getProfile, updateProfile };