const Event = require("../models/Event");
const Registration = require("../models/Registration");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "eventId is required."
      });
    }

    // Get event + organizer details
    const event = await Event.findById(eventId).populate(
      "organizer",
      "name email"
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found."
      });
    }

    if (event.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "This event is not open for registration."
      });
    }

    // Check if participant already registered
    const existing = await Registration.findOne({
      event: eventId,
      student: req.user._id
    });

    if (existing && existing.status !== "cancelled") {
      return res.status(409).json({
        success: false,
        message: "You are already registered for this event."
      });
    }

    // Count confirmed registrations
    const confirmedCount = await Registration.countDocuments({
      event: eventId,
      status: "confirmed"
    });

    // Decide registration status
    const status =
      confirmedCount >= event.maxParticipants
        ? "waitlist"
        : "confirmed";

    let registration;

    // Re-activate cancelled registration
    if (existing) {
      existing.status = status;
      registration = await existing.save();
    } else {
      registration = await Registration.create({
        event: eventId,
        student: req.user._id,
        status
      });
    }

    // Populate registration details
    const populated = await registration.populate([
      {
        path: "event",
        select: "title date time venue maxParticipants"
      },
      {
        path: "student",
        select: "name email department enrollmentNo"
      }
    ]);

    // ============================================================
    // SEND EMAIL NOTIFICATIONS
    // ============================================================

    try {
      // Get participant details
      const participant = populated.student;

      // Organizer email
      const organizerEmail = event.organizer?.email;

      // Admin email from .env
      const adminEmail = process.env.ADMIN_EMAIL;

      const eventDate = event.date
        ? new Date(event.date).toLocaleDateString()
        : "N/A";

      const eventTime = event.time || "N/A";

      const registrationStatus =
        status === "confirmed"
          ? "CONFIRMED"
          : "WAITLIST";

      const statusMessage =
        status === "confirmed"
          ? "has successfully registered for your event."
          : "has been added to the waitlist for your event.";

      const subject =
        status === "confirmed"
          ? `New Registration - ${event.title}`
          : `New Waitlist Entry - ${event.title}`;

      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <title>EventSphere Registration</title>
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background: #f4f7fb;
            font-family: Arial, Helvetica, sans-serif;
          "
        >

          <div
            style="
              max-width: 650px;
              margin: 30px auto;
              background: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            "
          >

            <!-- Header -->
            <div
              style="
                padding: 25px;
                background: #111827;
                color: white;
              "
            >
              <h1 style="margin: 0;">
                Event<span style="color: #4f7cff;">Sphere</span>
              </h1>

              <p style="margin: 8px 0 0; color: #d1d5db;">
                Event Management System
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 30px;">

              <h2 style="margin-top: 0;">
                New Participant Registration
              </h2>

              <p>
                A participant ${statusMessage}
              </p>

              <!-- Registration Status -->
              <div
                style="
                  padding: 15px;
                  margin: 20px 0;
                  border-radius: 8px;
                  background: ${
                    status === "confirmed"
                      ? "#ecfdf5"
                      : "#fff7ed"
                  };
                "
              >
                <strong>
                  Registration Status:
                </strong>

                <span
                  style="
                    margin-left: 8px;
                    font-weight: bold;
                  "
                >
                  ${registrationStatus}
                </span>
              </div>

              <!-- Event Details -->
              <h3>Event Details</h3>

              <table
                style="
                  width: 100%;
                  border-collapse: collapse;
                "
              >
                <tr>
                  <td style="padding: 8px 0;">
                    <strong>Event:</strong>
                  </td>

                  <td style="padding: 8px 0;">
                    ${event.title}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 8px 0;">
                    <strong>Date:</strong>
                  </td>

                  <td style="padding: 8px 0;">
                    ${eventDate}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 8px 0;">
                    <strong>Time:</strong>
                  </td>

                  <td style="padding: 8px 0;">
                    ${eventTime}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 8px 0;">
                    <strong>Venue:</strong>
                  </td>

                  <td style="padding: 8px 0;">
                    ${event.venue || "N/A"}
                  </td>
                </tr>
              </table>

              <!-- Participant Details -->
              <h3 style="margin-top: 25px;">
                Participant Details
              </h3>

              <table
                style="
                  width: 100%;
                  border-collapse: collapse;
                "
              >
                <tr>
                  <td style="padding: 8px 0;">
                    <strong>Name:</strong>
                  </td>

                  <td style="padding: 8px 0;">
                    ${participant?.name || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 8px 0;">
                    <strong>Email:</strong>
                  </td>

                  <td style="padding: 8px 0;">
                    ${participant?.email || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 8px 0;">
                    <strong>Department:</strong>
                  </td>

                  <td style="padding: 8px 0;">
                    ${participant?.department || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 8px 0;">
                    <strong>Enrollment No:</strong>
                  </td>

                  <td style="padding: 8px 0;">
                    ${participant?.enrollmentNo || "N/A"}
                  </td>
                </tr>
              </table>

              <p style="margin-top: 30px;">
                Please log in to your EventSphere dashboard
                to manage this registration.
              </p>

            </div>

            <!-- Footer -->
            <div
              style="
                padding: 20px;
                background: #f9fafb;
                text-align: center;
                color: #6b7280;
                font-size: 13px;
              "
            >
              © 2026 EventSphere. All rights reserved.
            </div>

          </div>

        </body>
        </html>
      `;

      const emailPromises = [];

      // Send to organizer
      if (organizerEmail) {
        emailPromises.push(
          sendEmail({
            to: organizerEmail,
            subject,
            html: emailHtml
          })
        );
      }

      // Send to admin
      if (adminEmail) {
        emailPromises.push(
          sendEmail({
            to: adminEmail,
            subject,
            html: emailHtml
          })
        );
      }

      await Promise.all(emailPromises);

      console.log(
        `Registration notification sent for event: ${event.title}`
      );
    } catch (emailError) {
      // Do NOT fail registration if email fails
      console.error(
        "Registration email notification failed:",
        emailError.message
      );
    }

    // ============================================================
    // RESPONSE
    // ============================================================

    return res.status(201).json({
      success: true,
      message:
        status === "confirmed"
          ? "Event registration successful."
          : "Event is full. You have been added to the waitlist.",
      registration: populated
    });

  } catch (error) {
    console.error("Register for event error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to register for this event."
    });
  }
};


// ============================================================
// CANCEL REGISTRATION
// ============================================================

const cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findOne({
      _id: req.params.id,
      student: req.user._id
    });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found."
      });
    }

    registration.status = "cancelled";

    await registration.save();

    return res.json({
      success: true,
      message: "Registration cancelled successfully.",
      registration
    });

  } catch (error) {
    console.error("Cancel registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to cancel registration."
    });
  }
};


// ============================================================
// GET MY REGISTRATIONS
// ============================================================

const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      student: req.user._id
    })
      .populate("event")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      registrations
    });

  } catch (error) {
    console.error("Get my registrations error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load registrations."
    });
  }
};


// ============================================================
// GET EVENT REGISTRATIONS
// ============================================================

const getEventRegistrations = async (req, res) => {
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
        message: "You do not have access to these registrations."
      });
    }

    const registrations = await Registration.find({
      event: event._id,
      status: { $ne: "cancelled" }
    })
      .populate(
        "student",
        "name email contact department enrollmentNo"
      )
      .sort({ createdAt: 1 });

    return res.json({
      success: true,
      registrations
    });

  } catch (error) {
    console.error("Get event registrations error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load event registrations."
    });
  }
};


module.exports = {
  registerForEvent,
  cancelRegistration,
  getMyRegistrations,
  getEventRegistrations
};