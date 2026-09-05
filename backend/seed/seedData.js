require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");
const Event = require("../models/Event");

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Event.deleteMany({});

    const password = "Password123!";

    const [admin, organizer, participant] = await User.create([
      {
        name: "EventSphere Admin",
        email: "huriyaaslam03@gmail.com",
        password,
        role: "admin",
        department: "Administration",
        contact: "03000000000"
      },
      {
        name: "Event Organizer",
        email: "malaikasarfaraz2001@gmail.com",
        password,
        role: "organizer",
        department: "Computer Science",
        contact: "03111111111"
      },
      {
        name: "Demo Participant",
        email: "student@eventsphere.com",
        password,
        role: "participant",
        department: "Computer Science",
        enrollmentNo: "DEMO-001",
        contact: "03222222222"
      }
    ]);

    await Event.create([
      {
        title: "Tech Innovation Summit",
        description:
          "A student-focused event featuring talks, demonstrations and technology discussions.",
        category: "Technology",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        time: "10:00 AM",
        venue: "Main Auditorium",
        maxParticipants: 100,
        rules: "Bring your student ID. Please arrive 15 minutes early.",
        organizer: organizer._id,
        status: "approved"
      },
      {
        title: "Campus Coding Challenge",
        description:
          "A practical coding competition for students interested in problem solving.",
        category: "Competition",
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        time: "02:00 PM",
        venue: "Computer Lab 2",
        maxParticipants: 60,
        rules: "Participants must bring their own laptop.",
        organizer: organizer._id,
        status: "pending"
      }
    ]);

    console.log("Seed data inserted successfully.");
    console.log("");
    console.log("Demo accounts:");
    console.log("Admin: admin@eventsphere.com / Password123!");
    console.log("Organizer: organizer@eventsphere.com / Password123!");
    console.log("Participant: student@eventsphere.com / Password123!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedData();