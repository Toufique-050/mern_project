const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      enum: ["image", "video", "other"],
      default: "image"
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 300,
      default: ""
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

mediaSchema.index({ event: 1, createdAt: -1 });

module.exports = mongoose.model("Media", mediaSchema);