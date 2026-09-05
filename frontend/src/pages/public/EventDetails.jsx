import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getEventById } from "../../services/eventService";
import { registerForEvent } from "../../services/registrationService";
import { useAuth } from "../../context/AuthContext";

import EventStatus from "../../components/events/EventStatus";
import Loader from "../../components/common/Loader";

import {
  assetUrl,
  formatDate,
  errorMessage,
} from "../../utils/helpers";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getEventById(id);
        setEvent(data?.event || null);
      } catch (err) {
        setError(
          errorMessage(err, "Event could not be loaded.")
        );
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const register = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setBusy(true);

    try {
      const data = await registerForEvent(id);

      alert(
        data?.message || "Registration successful!"
      );

      if (data?.registration?.status === "confirmed") {
        setEvent((previous) => {
          if (!previous) return previous;

          return {
            ...previous,
            availableSeats: Math.max(
              (previous.availableSeats || 1) - 1,
              0
            ),
            registeredCount:
              (previous.registeredCount || 0) + 1,
          };
        });

        navigate("/participant/registrations");
      }
    } catch (err) {
      alert(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!event) {
    return (
      <main className="page">
        <style>{`
          .page {
            min-height: 100vh;
            background: #f7f6f2;
            font-family: 'Inter', sans-serif;
            padding: 44px 24px 64px;
          }
          .page .container {
            max-width: 800px;
            margin: 0 auto;
          }
          .page .alert {
            padding: 14px 20px;
            border-radius: 10px;
            font-size: 13.5px;
            font-weight: 500;
          }
          .page .alert.error {
            background: #fdf2f0;
            border: 1px solid #f5d6d0;
            color: #b33a2e;
          }
          .page .btn {
            font-family: 'Inter', sans-serif;
            font-size: 13px;
            font-weight: 600;
            padding: 10px 22px;
            border-radius: 8px;
            border: 1px solid transparent;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
          }
          .page .btn-light {
            background: #ffffff;
            color: #1c1830;
            border-color: #e0ddd4;
            margin-top: 12px;
          }
          .page .btn-light:hover {
            background: #faf8f2;
            border-color: #d0cbbc;
          }
        `}</style>
        <div className="container">
          <div className="alert error">
            {error || "Event not found."}
          </div>

          <Link
            className="btn btn-light"
            to="/events"
          >
            ← Back to events
          </Link>
        </div>
      </main>
    );
  }

  const isApproved = event.status === "approved";
  const isFull = event.availableSeats <= 0;

  return (
    <main className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700;800&display=swap');

        /* ===== ANIMATIONS ===== */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }

        /* ===== PAGE ===== */
        .page {
          min-height: 100vh;
          background: #f7f6f2;
          font-family: 'Inter', sans-serif;
          padding: 44px 24px 64px;
        }

        .page .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ===== DETAIL GRID ===== */
        .page .detail-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 40px;
          align-items: start;
          animation: fadeInUp 0.5s ease both;
        }

        /* ===== COVER IMAGE ===== */
        .page .detail-cover {
          border-radius: 18px;
          overflow: hidden;
          background: #eae7dd;
          position: relative;
          animation: fadeInScale 0.5s ease both;
          box-shadow: 0 4px 20px rgba(28, 24, 48, 0.04);
        }

        .page .detail-cover img {
          width: 100%;
          height: 340px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .page .detail-cover:hover img {
          transform: scale(1.02);
        }

        .page .detail-cover .cover-placeholder {
          width: 100%;
          height: 340px;
          background: linear-gradient(135deg, #e29a4d, #d48a3a);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.15);
          font-size: 80px;
          font-weight: 700;
          font-family: 'Fraunces', serif;
        }

        .page .detail-cover .cover-placeholder.large span {
          font-size: 100px;
          color: rgba(255, 255, 255, 0.2);
        }

        /* ===== DETAIL CONTENT ===== */
        .page .detail-content {
          padding: 28px 0 0 0;
          animation: fadeInUp 0.5s ease both 0.1s;
        }

        .page .event-top {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .page .chip {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #e29a4d;
          background: rgba(226, 154, 77, 0.08);
          padding: 4px 16px;
          border-radius: 20px;
          border: 1px solid rgba(226, 154, 77, 0.1);
        }

        .page .detail-content h1 {
          font-family: 'Fraunces', serif;
          font-size: 36px;
          font-weight: 700;
          color: #1c1830;
          margin: 0 0 12px 0;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }

        .page .lead {
          font-size: 16.5px;
          color: #5a564a;
          line-height: 1.8;
          margin: 0 0 24px 0;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 12px;
          border-left: 4px solid #e29a4d;
        }

        .page .detail-box {
          background: #ffffff;
          border: 1px solid #eae7dd;
          border-radius: 14px;
          padding: 20px 24px;
          margin-top: 16px;
          box-shadow: 0 1px 2px rgba(28, 24, 48, 0.02);
          transition: all 0.3s ease;
        }

        .page .detail-box:hover {
          border-color: #d6d0bf;
          box-shadow: 0 4px 16px rgba(28, 24, 48, 0.04);
        }

        .page .detail-box h3 {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #a89b78;
          margin: 0 0 8px 0;
        }

        .page .detail-box p {
          font-size: 14px;
          color: #5a564a;
          line-height: 1.7;
          margin: 0;
        }

        /* ===== SIDEBAR ===== */
        .page .detail-side {
          animation: slideInRight 0.5s ease both 0.15s;
        }

        .page .sticky-card {
          position: sticky;
          top: 24px;
          background: #ffffff;
          border: 1px solid #eae7dd;
          border-radius: 18px;
          padding: 28px 30px;
          box-shadow: 0 2px 8px rgba(28, 24, 48, 0.02), 0 12px 40px -20px rgba(28, 24, 48, 0.08);
          transition: all 0.3s ease;
        }

        .page .sticky-card:hover {
          border-color: #d6d0bf;
          box-shadow: 0 4px 20px rgba(28, 24, 48, 0.04), 0 12px 40px -20px rgba(28, 24, 48, 0.08);
        }

        .page .sticky-card h3 {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #a89b78;
          margin: 0 0 18px 0;
          padding-bottom: 14px;
          border-bottom: 1px solid #f0eee4;
        }

        .page .info-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #f5f3eb;
          font-size: 13.5px;
        }

        .page .info-row:last-of-type {
          border-bottom: none;
        }

        .page .info-row span {
          color: #8a8676;
          font-weight: 500;
        }

        .page .info-row strong {
          color: #1c1830;
          font-weight: 600;
          text-align: right;
          max-width: 60%;
        }

        /* ===== CAPACITY ===== */
        .page .capacity {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin: 16px 0 20px;
          padding: 16px;
          background: #faf8f2;
          border-radius: 12px;
          border: 1px solid #f0eee4;
        }

        .page .capacity div {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .page .capacity div span {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #8a8676;
        }

        .page .capacity div strong {
          font-size: 22px;
          font-weight: 700;
          color: #1c1830;
          margin-top: 2px;
        }

        .page .capacity div:first-child strong {
          color: #e29a4d;
        }

        /* ===== BUTTONS ===== */
        .page .btn {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 10px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .page .btn-block {
          width: 100%;
        }

        /* Primary Button */
        .page .btn-primary {
          background: linear-gradient(135deg, #e29a4d, #d48a3a);
          color: #ffffff;
          border-color: #e29a4d;
          box-shadow: 0 2px 12px rgba(226, 154, 77, 0.25);
          margin-top: 4px;
        }

        .page .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }

        .page .btn-primary:hover:not(:disabled)::after {
          transform: translateX(100%);
        }

        .page .btn-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #f0c27a, #e29a4d);
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 30px rgba(226, 154, 77, 0.35);
        }

        .page .btn-primary:active:not(:disabled) {
          transform: translateY(0px) scale(0.97);
        }

        .page .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        /* Light Button */
        .page .btn-light {
          background: #ffffff;
          color: #1c1830;
          border-color: #e0ddd4;
          margin-top: 8px;
        }

        .page .btn-light:hover {
          background: #faf8f2;
          border-color: #d0cbbc;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(28, 24, 48, 0.04);
        }

        .page .btn-light:active {
          transform: translateY(0px) scale(0.97);
        }

        /* ===== ALERT ===== */
        .page .alert {
          padding: 14px 18px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          background: #fdf6ed;
          border: 1px solid #f5e8d0;
          color: #b8873a;
          margin-top: 8px;
          text-align: center;
        }

        .page .hint {
          display: block;
          text-align: center;
          font-size: 12px;
          color: #8a8676;
          margin-top: 10px;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 920px) {
          .page .detail-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .page .detail-side {
            order: -1;
          }

          .page .sticky-card {
            position: static;
          }

          .page .detail-cover img,
          .page .detail-cover .cover-placeholder {
            height: 250px;
          }

          .page .detail-content h1 {
            font-size: 30px;
          }

          .page .lead {
            font-size: 15px;
          }
        }

        @media (max-width: 480px) {
          .page {
            padding: 20px 12px 36px;
          }

          .page .detail-cover img,
          .page .detail-cover .cover-placeholder {
            height: 180px;
          }

          .page .detail-content h1 {
            font-size: 24px;
          }

          .page .lead {
            font-size: 14px;
            padding: 12px 16px;
          }

          .page .sticky-card {
            padding: 20px 16px;
          }

          .page .capacity {
            padding: 12px;
          }

          .page .capacity div strong {
            font-size: 18px;
          }

          .page .btn {
            font-size: 12px;
            padding: 10px 18px;
          }

          .page .detail-box {
            padding: 16px 18px;
          }

          .page .info-row {
            font-size: 12.5px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .page * {
            animation: none !important;
            transition: none !important;
          }
          .page .btn-primary::after {
            display: none !important;
          }
        }
      `}</style>

      <div className="container detail-grid">
        {/* Event Content */}
        <div>
          <div className="detail-cover">
            {event.bannerImage ? (
              <img
                src={assetUrl(event.bannerImage)}
                alt={event.title}
              />
            ) : (
              <div className="cover-placeholder large">
                <span>
                  {event.category?.slice(0, 1) || "E"}
                </span>
              </div>
            )}
          </div>

          <div className="detail-content">
            <div className="event-top">
              <span className="chip">
                {event.category}
              </span>

              <EventStatus
                status={event.status}
              />
            </div>

            <h1>{event.title}</h1>

            <p className="lead">
              {event.description}
            </p>

            {event.rules && (
              <div className="detail-box">
                <h3>📋 Event notes</h3>
                <p>{event.rules}</p>
              </div>
            )}
          </div>
        </div>

        {/* Event Information */}
        <aside className="detail-side">
          <div className="sticky-card">
            <h3>ℹ️ Event information</h3>

            <div className="info-row">
              <span>Date</span>
              <strong>
                {formatDate(event.date)}
              </strong>
            </div>

            <div className="info-row">
              <span>Time</span>
              <strong>
                {event.time || "Not specified"}
              </strong>
            </div>

            <div className="info-row">
              <span>Venue</span>
              <strong>
                {event.venue || "Not specified"}
              </strong>
            </div>

            <div className="info-row">
              <span>Organizer</span>
              <strong>
                {event.organizer?.name ||
                  "Event organizer"}
              </strong>
            </div>

            {/* Capacity */}
            <div className="capacity">
              <div>
                <span>Registered</span>
                <strong>
                  {event.registeredCount || 0}
                </strong>
              </div>

              <div>
                <span>Available</span>
                <strong>
                  {event.availableSeats || 0}
                </strong>
              </div>
            </div>

            {/* Register Button */}
            {isApproved && (
              <button
                type="button"
                className="btn btn-primary btn-block"
                disabled={busy || isFull}
                onClick={register}
              >
                {busy
                  ? "⏳ Registering..."
                  : isFull
                    ? "❌ Event is full"
                    : "✅ Register for event"}
              </button>
            )}

            {!isApproved && (
              <div className="alert">
                ⏳ Registration is not available for this event yet.
              </div>
            )}

            {!user && (
              <small className="hint">
                🔐 You'll need an account to register.
              </small>
            )}

            <Link
              className="btn btn-light btn-block"
              to="/events"
            >
              ← Back to events
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}