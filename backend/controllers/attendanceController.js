const Attendance = require("../models/Attendance");
const Event = require("../models/Event");
const Registration = require("../models/Registration");
const generateQR = require("../utils/generateQR");

const getMyEventQR = async (req, res) => {
  const registration = await Registration.findOne({
    event: req.params.eventId,
    student: req.user._id,
    status: "confirmed"
  });

  if (!registration) {
    return res.status(404).json({
      success: false,
      message: "Confirmed registration not found."
    });
  }

  const qrCode = await generateQR(registration._id.toString());

  res.json({
    success: true,
    registrationId: registration._id,
    qrCode
  });
};

const markAttendance = async (req, res) => {
  const { registrationId } = req.body;

  if (!registrationId) {
    return res.status(400).json({
      success: false,
      message: "registrationId is required."
    });
  }

  const registration = await Registration.findById(registrationId)
    .populate("event")
    .populate("student", "name email department enrollmentNo");

  if (!registration) {
    return res.status(404).json({
      success: false,
      message: "Registration not found."
    });
  }

  if (registration.status !== "confirmed") {
    return res.status(400).json({
      success: false,
      message: "Only confirmed registrations can receive attendance."
    });
  }

  const event = registration.event;
  const isOwner =
    event.organizer.toString() === req.user._id.toString();

  if (!isOwner && req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You cannot mark attendance for this event."
    });
  }

  const attendance = await Attendance.findOneAndUpdate(
    {
      event: event._id,
      student: registration.student._id
    },
    {
      event: event._id,
      student: registration.student._id,
      attended: true,
      markedAt: new Date()
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    }
  ).populate("student", "name email department enrollmentNo");

  res.json({
    success: true,
    message: "Attendance marked successfully.",
    attendance
  });
};

const getEventAttendance = async (req, res) => {
  const event = await Event.findById(req.params.eventId);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found."
    });
  }

  const isOwner =
    event.organizer.toString() === req.user._id.toString();

  if (!isOwner && req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You do not have access to this attendance list."
    });
  }

  const attendance = await Attendance.find({
    event: event._id
  })
    .populate("student", "name email department enrollmentNo")
    .sort({ markedAt: -1 });

  res.json({
    success: true,
    attendance
  });
};

module.exports = {
  getMyEventQR,
  markAttendance,
  getEventAttendance
};