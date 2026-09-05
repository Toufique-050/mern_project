const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const createCertificate = ({ studentName, eventTitle, eventDate, outputPath }) => {
  return new Promise((resolve, reject) => {
    const directory = path.dirname(outputPath);
    fs.mkdirSync(directory, { recursive: true });

    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margin: 50
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    doc
      .fontSize(34)
      .font("Helvetica-Bold")
      .text("CERTIFICATE OF PARTICIPATION", { align: "center", y: 145 });

    doc
      .moveDown(1.5)
      .fontSize(18)
      .font("Helvetica")
      .text("This certificate is proudly presented to", { align: "center" });

    doc
      .moveDown(0.7)
      .fontSize(30)
      .font("Helvetica-Bold")
      .text(studentName, { align: "center" });

    doc
      .moveDown(0.9)
      .fontSize(17)
      .font("Helvetica")
      .text(`for successfully participating in "${eventTitle}"`, {
        align: "center"
      });

    const formattedDate = new Date(eventDate).toLocaleDateString("en-GB");

    doc
      .moveDown(0.6)
      .fontSize(14)
      .text(`Event date: ${formattedDate}`, { align: "center" });

    doc
      .fontSize(12)
      .text("EventSphere — College Event Management System", 50, 500, {
        align: "center",
        width: 742
      });

    doc.end();

    stream.on("finish", () => resolve(outputPath));
    stream.on("error", reject);
  });
};

module.exports = createCertificate;