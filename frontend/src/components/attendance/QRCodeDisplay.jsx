import { useEffect, useState } from "react";
import { getMyEventQR } from "../../services/attendanceService";

export default function QRCodeDisplay({ eventId }) {
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQRCode = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyEventQR(eventId);

        setQrCode(response?.qrCode || "");
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Unable to load QR code."
        );
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      loadQRCode();
    }
  }, [eventId]);

  if (loading) {
    return <p>Generating QR code...</p>;
  }

  if (error) {
    return <div className="alert error">{error}</div>;
  }

  if (!qrCode) {
    return <p>QR code is not available.</p>;
  }

  return (
    <div className="qr-code-container">
      <h3>Your Event QR Code</h3>

      <img
        src={qrCode}
        alt="Event attendance QR code"
        className="qr-code-image"
      />

      <p>Show this QR code for attendance.</p>
    </div>
  );
}