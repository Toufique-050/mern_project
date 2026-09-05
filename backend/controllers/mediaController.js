const Event = require("../models/Event");
const Media = require("../models/Media");

const getGallery = async (req, res) => {
  const filter = {};

  if (req.query.eventId) {
    filter.event = req.query.eventId;
  }

  const media = await Media.find(filter)
    .populate("event", "title date category")
    .populate("uploadedBy", "name role")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    media
  });
};

const uploadMedia = async (req, res) => {
  const { eventId, caption, fileType } = req.body;

  if (!eventId || !req.file) {
    return res.status(400).json({
      success: false,
      message: "eventId and file are required."
    });
  }

  const event = await Event.findById(eventId);

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
      message: "You cannot upload media for this event."
    });
  }

  const detectedType = req.file.mimetype.startsWith("video/")
    ? "video"
    : req.file.mimetype.startsWith("image/")
      ? "image"
      : "other";

  const media = await Media.create({
    event: eventId,
    fileUrl: `/uploads/gallery/${req.file.filename}`,
    fileType: fileType || detectedType,
    caption: caption || "",
    uploadedBy: req.user._id
  });

  const populated = await media.populate([
    { path: "event", select: "title date category" },
    { path: "uploadedBy", select: "name role" }
  ]);

  res.status(201).json({
    success: true,
    message: "Media uploaded successfully.",
    media: populated
  });
};

const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
      .populate("event");

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found."
      });
    }

    // Event reference no longer exists
    if (!media.event) {
      await Media.deleteOne({ _id: media._id });

      return res.json({
        success: true,
        message: "Media deleted successfully."
      });
    }

    const isOwner =
      media.event.organizer &&
      media.event.organizer.toString() ===
        req.user._id.toString();

    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You cannot delete this media."
      });
    }

    await Media.deleteOne({
      _id: media._id
    });

    res.json({
      success: true,
      message: "Media deleted successfully."
    });

  } catch (error) {
    console.error("Delete media error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete media."
    });
  }
};

module.exports = {
  getGallery,
  uploadMedia,
  deleteMedia
};