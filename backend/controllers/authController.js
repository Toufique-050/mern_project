const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  const {
    name,
    email,
    password,
    contact,
    department,
    enrollmentNo
  } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required."
    });
  }

  const existingUser = await User.findOne({
    email: email.toLowerCase().trim()
  });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "An account with this email already exists."
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    role: "participant",
    contact,
    department,
    enrollmentNo
  });

  res.status(201).json({
    success: true,
    message: "Registration successful.",
    token: generateToken(user),
    user: user.toSafeObject()
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required."
    });
  }

  const user = await User.findOne({
    email: email.toLowerCase().trim()
  }).select("+password");

  if (!user || !user.isActive) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password."
    });
  }

  const passwordMatches = await user.comparePassword(password);

  if (!passwordMatches) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password."
    });
  }

  res.json({
    success: true,
    message: "Login successful.",
    token: generateToken(user),
    user: user.toSafeObject()
  });
};

const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
};

module.exports = { register, login, getMe };