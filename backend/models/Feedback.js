const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    venueRating: {
      type: Number,
      min: 1,
      max: 5
    },
    coordinationRating: {
      type: Number,
      min: 1,
      max: 5
    },
    technicalRating: {
      type: Number,
      min: 1,
      max: 5
    },
    hospitalityRating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: ""
    },
    isVisible: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

feedbackSchema.index({ event: 1, student: 1 }, { unique: true });

module.exports = mongoose.model("Feedback", feedbackSchema);