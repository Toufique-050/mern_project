const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "waitlist"],
      default: "confirmed"
    }
  },
  { timestamps: true }
);

registrationSchema.index({ event: 1, student: 1 }, { unique: true });
registrationSchema.index({ student: 1, createdAt: -1 });

module.exports = mongoose.model("Registration", registrationSchema);