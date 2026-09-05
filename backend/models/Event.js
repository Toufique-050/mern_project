const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: 150
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true
    },
    category: {
      type: String,
      required: [true, "Event category is required"],
      trim: true
    },
    date: {
      type: Date,
      required: [true, "Event date is required"]
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
      trim: true
    },
    venue: {
      type: String,
      required: [true, "Event venue is required"],
      trim: true
    },
    maxParticipants: {
      type: Number,
      required: [true, "Maximum participants is required"],
      min: 1
    },
    bannerImage: {
      type: String,
      default: ""
    },
    rules: {
      type: String,
      default: ""
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "cancelled", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

eventSchema.index({ status: 1, date: 1 });
eventSchema.index({ organizer: 1, date: -1 });

module.exports = mongoose.model("Event", eventSchema);