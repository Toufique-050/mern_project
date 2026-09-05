import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Loader from "../../components/common/Loader";
import EventCard from "../../components/events/EventCard";

import { getMyEvents, deleteEvent } from "../../services/eventService";
import { errorMessage } from "../../utils/helpers";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);

    try {
      const data = await getMyEvents();
      setEvents(data?.events || []);
    } catch (error) {
      console.error("Failed to load events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const del = async (id) => {
    if (!window.confirm("Delete this event?")) {
      return;
    }

    try {
      await deleteEvent(id);
      await load();
    } catch (error) {
      alert(errorMessage(error));
    }
  };

  return (
    <main className="dashboard-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92) rotateX(-5deg); }
          to { opacity: 1; transform: scale(1) rotateX(0deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes pulseBorder {
          0%, 100% { border-color: #eae7dd; }
          50% { border-color: #e29a4d; }
        }

        .dashboard-page {
          min-height: 100vh;
          background: #f7f6f2;
          font-family: 'Inter', sans-serif;
          padding: 44px 24px 64px;
        }

        .dashboard-page .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .dashboard-page .dash-header-wrap {
          animation: fadeInUp 0.5s ease both;
        }

        .dashboard-page .btn {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 10px 22px;
          border-radius: 8px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .dashboard-page .btn-primary {
          background: #1c1830;
          color: #ffffff;
          border-color: #1c1830;
          position: relative;
          overflow: hidden;
        }

        .dashboard-page .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }

        .dashboard-page .btn-primary:hover::after {
          transform: translateX(100%);
        }

        .dashboard-page .btn-primary:hover {
          background: #2c2648;
          border-color: #2c2648;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 30px rgba(28,24,48,0.3);
        }

        .dashboard-page .btn-primary:active {
          transform: translateY(0px) scale(0.97);
        }

        .dashboard-page .event-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
          margin-top: 28px;
        }

        .dashboard-page .event-grid > * {
          animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          perspective: 800px;
        }

        .dashboard-page .event-grid > *:nth-child(1) { animation-delay: 0.05s; }
        .dashboard-page .event-grid > *:nth-child(2) { animation-delay: 0.10s; }
        .dashboard-page .event-grid > *:nth-child(3) { animation-delay: 0.15s; }
        .dashboard-page .event-grid > *:nth-child(4) { animation-delay: 0.20s; }
        .dashboard-page .event-grid > *:nth-child(5) { animation-delay: 0.25s; }
        .dashboard-page .event-grid > *:nth-child(6) { animation-delay: 0.30s; }

        /* EventCard wrapper styling */
        .dashboard-page .event-grid .event-card-wrapper {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          border-radius: 16px;
          position: relative;
          background: #ffffff;
          border: 1px solid #eae7dd;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(28,24,48,0.03), 0 8px 24px -16px rgba(28,24,48,0.08);
        }

        .dashboard-page .event-grid .event-card-wrapper:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 20px 60px rgba(28,24,48,0.12), 0 8px 24px rgba(28,24,48,0.06);
          border-color: #d6d0bf;
        }

        .dashboard-page .event-grid .event-card-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #e29a4d, #e8b06a, #e29a4d);
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 2;
          border-radius: 16px 16px 0 0;
        }

        .dashboard-page .event-grid .event-card-wrapper:hover::before {
          opacity: 1;
          animation: shimmer 2s linear infinite;
        }

        .dashboard-page .event-grid .event-card-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(226,154,77,0.04), transparent 60%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 1;
        }

        .dashboard-page .event-grid .event-card-wrapper:hover::after {
          opacity: 1;
        }

        .dashboard-page .event-grid .event-card-wrapper:active {
          transform: translateY(-2px) scale(0.98);
          transition-duration: 0.1s;
        }

        .dashboard-page .card-actions {
          display: flex;
          gap: 8px;
          margin-top: 14px;
          flex-wrap: wrap;
          padding: 0 4px;
        }

        .dashboard-page .card-actions .btn {
          font-size: 12px;
          padding: 7px 18px;
          border-radius: 8px;
          flex: 1;
          justify-content: center;
          min-width: 70px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .dashboard-page .card-actions .btn-light {
          background: #faf8f2;
          color: #1c1830;
          border-color: #e0ddd4;
        }

        .dashboard-page .card-actions .btn-light:hover {
          background: #ffffff;
          border-color: #d0cbbc;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 4px 16px rgba(28,24,48,0.08);
        }

        .dashboard-page .card-actions .btn-light:active {
          transform: translateY(0px) scale(0.97);
        }

        .dashboard-page .card-actions .btn-danger {
          background: #fdf2f0;
          color: #b33a2e;
          border-color: #f5d6d0;
        }

        .dashboard-page .card-actions .btn-danger:hover {
          background: #fce8e5;
          border-color: #ecc0b8;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 4px 16px rgba(179,58,46,0.15);
        }

        .dashboard-page .card-actions .btn-danger:active {
          transform: translateY(0px) scale(0.97);
        }

        .dashboard-page .card-actions .btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s;
        }

        .dashboard-page .card-actions .btn:hover::after {
          transform: translateX(100%);
        }

        .dashboard-page .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 72px 32px;
          background: #ffffff;
          border: 1px solid #eae7dd;
          border-radius: 16px;
          font-size: 14px;
          color: #8a8676;
          line-height: 1.7;
          animation: fadeInUp 0.5s ease both;
          transition: all 0.3s ease;
        }

        .dashboard-page .empty-state:hover {
          border-color: #d6d0bf;
          box-shadow: 0 4px 20px rgba(28,24,48,0.04);
        }

        .dashboard-page .empty-state::before {
          content: "📅";
          display: block;
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.4;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .dashboard-page .empty-state:hover::before {
          transform: scale(1.1) rotate(-5deg);
        }

        .dashboard-page .empty-state .empty-action {
          margin-top: 18px;
        }

        .dashboard-page .empty-state .empty-action .btn {
          font-size: 13px;
          padding: 10px 28px;
        }

        /* Status badge styling inside EventCard via wrapper */
        .dashboard-page .event-grid .event-card-wrapper .status-badge {
          transition: all 0.3s ease;
        }

        .dashboard-page .event-grid .event-card-wrapper:hover .status-badge {
          transform: scale(1.05);
        }

        @media (max-width: 820px) {
          .dashboard-page {
            padding: 28px 16px 48px;
          }

          .dashboard-page .event-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
          }

          .dashboard-page .event-grid .event-card-wrapper:hover {
            transform: translateY(-4px) scale(1.005);
          }
        }

        @media (max-width: 480px) {
          .dashboard-page {
            padding: 20px 12px 36px;
          }

          .dashboard-page .event-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .dashboard-page .card-actions .btn {
            font-size: 11px;
            padding: 6px 12px;
            min-width: 60px;
          }

          .dashboard-page .empty-state {
            padding: 40px 20px;
            font-size: 13px;
          }

          .dashboard-page .empty-state::before {
            font-size: 36px;
          }

          .dashboard-page .event-grid .event-card-wrapper:hover {
            transform: translateY(-2px) scale(1.002);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dashboard-page * {
            animation: none !important;
            transition: none !important;
          }
          .dashboard-page .event-grid .event-card-wrapper::before,
          .dashboard-page .event-grid .event-card-wrapper::after,
          .dashboard-page .btn::after {
            display: none !important;
          }
        }
      `}</style>

      <div className="container">
        <div className="dash-header-wrap">
          <DashboardHeader
            eyebrow="ORGANIZER"
            title="My events"
            description="Events you created and their approval status."
            action={
              <Link
                className="btn btn-primary"
                to="/organizer/events/create"
              >
                + Create event
              </Link>
            }
          />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="event-grid">
            {events.map((event) => (
              <div key={event._id} className="event-card-wrapper">
                <EventCard
                  event={event}
                  action={
                    <div className="card-actions">
                      <Link
                        className="btn btn-light btn-sm"
                        to={`/organizer/events/${event._id}/edit`}
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => del(event._id)}
                      >
                        Delete
                      </button>
                    </div>
                  }
                />
              </div>
            ))}

            {!events.length && (
              <div className="empty-state">
                <div>No events yet.</div>
                <div className="empty-action">
                  <Link
                    className="btn btn-primary"
                    to="/organizer/events/create"
                  >
                    + Create your first event
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}