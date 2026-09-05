
const Feedback = require("../models/Feedback");
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const Attendance = require("../models/Attendance");

const submitFeedback = async (req, res) => {
  try {
    const {
      eventId,
      rating,
      venueRating,
      coordinationRating,
      technicalRating,
      hospitalityRating,
      comment
    } = req.body;

    if (!eventId || !rating) {
      return res.status(400).json({
        success: false,
        message: "eventId and rating are required."
      });
    }

    const registration = await Registration.findOne({
      event: eventId,
      student: req.user._id,
      status: "confirmed"
    });

    if (!registration) {
      return res.status(403).json({
        success: false,
        message: "You can only review an event you registered for."
      });
    }

    const attendance = await Attendance.findOne({
      event: eventId,
      student: req.user._id,
      attended: true
    });

    if (!attendance) {
      return res.status(403).json({
        success: false,
        message: "Feedback is available after attendance."
      });
    }

    const feedback = await Feedback.findOneAndUpdate(
      {
        event: eventId,
        student: req.user._id
      },
      {
        event: eventId,
        student: req.user._id,
        rating,
        venueRating,
        coordinationRating,
        technicalRating,
        hospitalityRating,
        comment
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }
    );

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
      feedback
    });
  } catch (error) {
    console.error("Submit feedback error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to submit feedback."
    });
  }
};

const getMyFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({
      student: req.user._id
    })
      .populate("event", "title date category")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      feedback
    });
  } catch (error) {
    console.error("Get my feedback error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load feedback."
    });
  }
};

const getEventFeedback = async (req, res) => {
  try {
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
        message: "You do not have access to this feedback."
      });
    }

    const feedback = await Feedback.find({
      event: event._id,
      isVisible: true
    })
      .populate("student", "name department")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      feedback
    });
  } catch (error) {
    console.error("Get event feedback error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load event feedback."
    });
  }
};

const updateFeedbackVisibility = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        isVisible: req.body.isVisible !== false
      },
      {
        new: true
      }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found."
      });
    }

    res.json({
      success: true,
      message: "Feedback visibility updated.",
      feedback
    });
  } catch (error) {
    console.error(
      "Update feedback visibility error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to update feedback visibility."
    });
  }
};

module.exports = {
  submitFeedback,
  getMyFeedback,
  getEventFeedback,
  updateFeedbackVisibility
};

