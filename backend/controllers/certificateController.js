
const fs = require("fs");
const path = require("path");

const Attendance = require("../models/Attendance");
const Certificate = require("../models/Certificate");
const Event = require("../models/Event");
const createCertificate = require("../utils/generateCertificate");

const getMyCertificates = async (req, res) => {
  const certificates = await Certificate.find({
    student: req.user._id
  })
    .populate("event", "title date venue category")
    .sort({ issuedAt: -1 });

  res.json({
    success: true,
    certificates
  });
};

const generateCertificateForStudent = async (req, res) => {
  const { eventId, studentId } = req.body;

  if (!eventId || !studentId) {
    return res.status(400).json({
      success: false,
      message: "eventId and studentId are required."
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
      message: "You cannot issue certificates for this event."
    });
  }

  const attendance = await Attendance.findOne({
    event: eventId,
    student: studentId,
    attended: true
  }).populate("student", "name");

  if (!attendance) {
    return res.status(400).json({
      success: false,
      message: "Certificate can only be issued to an attendee."
    });
  }

  const existing = await Certificate.findOne({
    event: eventId,
    student: studentId
  });

  if (existing) {
    return res.json({
      success: true,
      message: "Certificate already exists.",
      certificate: existing
    });
  }

  const fileName = `certificate-${eventId}-${studentId}.pdf`;

  const uploadDir = path.join(
    __dirname,
    "..",
    process.env.UPLOAD_DIR || "uploads",
    "certificates"
  );

  fs.mkdirSync(uploadDir, {
    recursive: true
  });

  const outputPath = path.join(uploadDir, fileName);

  await createCertificate({
    studentName: attendance.student.name,
    eventTitle: event.title,
    eventDate: event.date,
    outputPath
  });

  const relativeUrl = `/uploads/certificates/${fileName}`;

  const certificate = await Certificate.create({
    event: eventId,
    student: studentId,
    certificateUrl: relativeUrl
  });

  res.status(201).json({
    success: true,
    message: "Certificate generated successfully.",
    certificate
  });
};

const downloadCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found."
      });
    }

    const isOwner =
      certificate.student.toString() === req.user._id.toString();

    if (!isOwner && req.user.role !== "admin") {
      const event = await Event.findById(certificate.event);

      const organizerOwnsEvent =
        event &&
        event.organizer.toString() === req.user._id.toString();

      if (!organizerOwnsEvent) {
        return res.status(403).json({
          success: false,
          message: "You cannot access this certificate."
        });
      }
    }

    const uploadDir = path.join(
      __dirname,
      "..",
      process.env.UPLOAD_DIR || "uploads",
      "certificates"
    );

    const fileName = path.basename(certificate.certificateUrl);

    const filePath = path.join(uploadDir, fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "Certificate PDF file is missing."
      });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}"`
    );

    return res.sendFile(filePath);
  } catch (error) {
    console.error("Download certificate error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to download certificate."
    });
  }
};

module.exports = {
  getMyCertificates,
  generateCertificateForStudent,
  downloadCertificate
};

