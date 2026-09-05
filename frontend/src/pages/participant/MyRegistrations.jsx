import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Loader from "../../components/common/Loader";

import {
  getMyRegistrations,
  cancelRegistration,
} from "../../services/registrationService";

import { getMyEventQR } from "../../services/attendanceService";

import {
  formatDate,
  errorMessage,
} from "../../utils/helpers";

export default function MyRegistrations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [qrCodes, setQrCodes] = useState({});
  const [qrLoading, setQrLoading] = useState({});
  const [qrErrors, setQrErrors] = useState({});

  const load = async () => {
    try {
      setLoading(true);

      const data = await getMyRegistrations();

      setItems(data?.registrations || []);
    } catch (error) {
      console.error("Failed to load registrations:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id) => {
    if (!window.confirm("Cancel this registration?")) {
      return;
    }

    try {
      await cancelRegistration(id);
      await load();
    } catch (error) {
      alert(errorMessage(error));
    }
  };

  const showQRCode = async (eventId) => {
    if (!eventId) {
      return;
    }

    try {
      setQrLoading((prev) => ({
        ...prev,
        [eventId]: true,
      }));

      setQrErrors((prev) => ({
        ...prev,
        [eventId]: "",
      }));

      const data = await getMyEventQR(eventId);

      setQrCodes((prev) => ({
        ...prev,
        [eventId]: data?.qrCode || "",
      }));
    } catch (error) {
      setQrErrors((prev) => ({
        ...prev,
        [eventId]:
          errorMessage(error) || "Unable to generate QR code.",
      }));
    } finally {
      setQrLoading((prev) => ({
        ...prev,
        [eventId]: false,
      }));
    }
  };

  return (
    <main className="dashboard-page">
      <div className="container">
        <DashboardHeader
          eyebrow="PARTICIPANT"
          title="My registrations"
          description="Everything you have booked through EventSphere."
          action={
            <Link
              className="btn btn-primary"
              to="/events"
            >
              Browse events
            </Link>
          }
        />

        {loading ? (
          <Loader />
        ) : (
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>QR Code</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {items.map((registration) => {
                  const eventId = registration.event?._id;
                  const qrCode = qrCodes[eventId];
                  const isQRLoading = qrLoading[eventId];
                  const qrError = qrErrors[eventId];

                  return (
                    <tr key={registration._id}>
                      <td>
                        <strong>
                          {registration.event?.title ||
                            "Unknown Event"}
                        </strong>

                        <small>
                          {registration.event?.venue ||
                            "Venue not available"}
                        </small>
                      </td>

                      <td>
                        {formatDate(
                          registration.event?.date
                        )}

                        <small>
                          {registration.event?.time || ""}
                        </small>
                      </td>

                      <td>
                        <span
                          className={`status status-${registration.status}`}
                        >
                          {registration.status}
                        </span>
                      </td>

                      <td>
                        {registration.status === "confirmed" && (
                          <div className="qr-section">
                            {!qrCode && !isQRLoading && (
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() =>
                                  showQRCode(eventId)
                                }
                              >
                                Show QR
                              </button>
                            )}

                            {isQRLoading && (
                              <span>
                                Generating...
                              </span>
                            )}

                            {qrCode && (
                              <div className="qr-code-box">
                                <img
                                  src={qrCode}
                                  alt="Event attendance QR code"
                                  className="qr-code-image"
                                />
                              </div>
                            )}

                            {qrError && (
                              <small className="qr-error">
                                {qrError}
                              </small>
                            )}
                          </div>
                        )}

                        {registration.status !== "confirmed" && (
                          <small>
                            QR available after confirmation
                          </small>
                        )}
                      </td>

                      <td>
                        {registration.status !== "cancelled" && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              cancel(registration._id)
                            }
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {!items.length && (
              <div className="empty-state">
                You have no registrations.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}