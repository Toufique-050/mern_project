const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
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
    certificateUrl: {
      type: String,
      required: true
    },
    issuedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

certificateSchema.index({ event: 1, student: 1 }, { unique: true });

module.exports = mongoose.model("Certificate", certificateSchema);