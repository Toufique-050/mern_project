const Event = require("../models/Event");
const Registration = require("../models/Registration");

const getEvents = async (req, res) => {
  const { status, category, search, organizer } = req.query;

  const filter = {};

  if (status) filter.status = status;
  if (category) filter.category = category;
  if (organizer) filter.organizer = organizer;

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { venue: { $regex: search, $options: "i" } }
    ];
  }

  const events = await Event.find(filter)
    .populate("organizer", "name email department")
    .sort({ date: 1, createdAt: -1 });

  const eventIds = events.map((event) => event._id);

  const counts = await Registration.aggregate([
    {
      $match: {
        event: { $in: eventIds },
        status: "confirmed"
      }
    },
    {
      $group: {
        _id: "$event",
        count: { $sum: 1 }
      }
    }
  ]);

  const countMap = new Map(
    counts.map((item) => [item._id.toString(), item.count])
  );

  const result = events.map((event) => {
    const item = event.toObject();
    item.registeredCount = countMap.get(event._id.toString()) || 0;
    item.availableSeats = Math.max(
      event.maxParticipants - item.registeredCount,
      0
    );
    return item;
  });

  res.json({
    success: true,
    count: result.length,
    events: result
  });
};

const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id).populate(
    "organizer",
    "name email department"
  );

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found."
    });
  }

  const registeredCount = await Registration.countDocuments({
    event: event._id,
    status: "confirmed"
  });

  res.json({
    success: true,
    event: {
      ...event.toObject(),
      registeredCount,
      availableSeats: Math.max(
        event.maxParticipants - registeredCount,
        0
      )
    }
  });
};

const createEvent = async (req, res) => {
  const {
    title,
    description,
    category,
    date,
    time,
    venue,
    maxParticipants,
    rules
  } = req.body;

  if (
    !title ||
    !description ||
    !category ||
    !date ||
    !time ||
    !venue ||
    !maxParticipants
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required event fields."
    });
  }

  const event = await Event.create({
    title,
    description,
    category,
    date,
    time,
    venue,
    maxParticipants: Number(maxParticipants),
    rules,
    organizer: req.user._id,
    status: "pending",
    bannerImage: req.file
      ? `/uploads/events/${req.file.filename}`
      : ""
  });

  const populatedEvent = await event.populate(
    "organizer",
    "name email department"
  );

  res.status(201).json({
    success: true,
    message: "Event created and sent for admin approval.",
    event: populatedEvent
  });
};

const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found."
    });
  }

  const isOwner =
    event.organizer.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return res.status(403).json({
      success: false,
      message: "You can only update your own events."
    });
  }

  const fields = [
    "title",
    "description",
    "category",
    "date",
    "time",
    "venue",
    "maxParticipants",
    "rules"
  ];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      event[field] =
        field === "maxParticipants"
          ? Number(req.body[field])
          : req.body[field];
    }
  });

  if (req.file) {
    event.bannerImage = `/uploads/events/${req.file.filename}`;
  }

  // Organizer changes go back through approval.
  if (!isAdmin) {
    event.status = "pending";
  }

  await event.save();

  const populatedEvent = await event.populate(
    "organizer",
    "name email department"
  );

  res.json({
    success: true,
    message: "Event updated successfully.",
    event: populatedEvent
  });
};

const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found."
    });
  }

  const isOwner =
    event.organizer.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return res.status(403).json({
      success: false,
      message: "You do not have permission to delete this event."
    });
  }

  await Registration.deleteMany({ event: event._id });
  await Event.deleteOne({ _id: event._id });

  res.json({
    success: true,
    message: "Event deleted successfully."
  });
};

const getMyEvents = async (req, res) => {
  const events = await Event.find({
    organizer: req.user._id
  }).sort({ createdAt: -1 });

  res.json({
    success: true,
    events
  });
};

const approveEvent = async (req, res) => {
  const { status } = req.body;

  if (!["approved", "rejected", "cancelled", "completed"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid event status."
    });
  }

  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  ).populate("organizer", "name email");

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found."
    });
  }

  res.json({
    success: true,
    message: `Event ${status} successfully.`,
    event
  });
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
  approveEvent
};