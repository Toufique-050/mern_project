const QRCode = require("qrcode");

const generateQR = async (registrationId) => {
  return QRCode.toDataURL(
    JSON.stringify({
      type: "EVENTSPHERE_ATTENDANCE",
      registrationId
    }),
    {
      width: 320,
      margin: 2,
      errorCorrectionLevel: "M"
    }
  );
};

module.exports = generateQR;