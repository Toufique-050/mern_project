import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import Loader from "../../components/common/Loader";

import { useAuth } from "../../context/AuthContext";

import { getMyRegistrations } from "../../services/registrationService";
import { getMyCertificates } from "../../services/certificateService";
import { getMyFeedback } from "../../services/feedbackService";

import { formatDate } from "../../utils/helpers";

export default function ParticipantDashboard() {
  const { user } = useAuth();

  const [data, setData] = useState({
    registrations: [],
    certificates: [],
    feedback: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const [registrations, certificates, feedback] =
          await Promise.all([
            getMyRegistrations(),
            getMyCertificates(),
            getMyFeedback(),
          ]);

        setData({
          registrations: registrations?.registrations || [],
          certificates: certificates?.certificates || [],
          feedback: feedback?.feedback || [],
        });
      } catch (err) {
        console.error("Participant dashboard error:", err);

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <main className="dashboard-page">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@400;500;600;700&display=swap');

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-12px); }
            to { opacity: 1; transform: translateX(0); }
          }

          .dashboard-page {
            min-height: 100vh;
            background: #f7f6f2;
            font-family: 'Inter', sans-serif;
            padding: 44px 24px 64px;
          }

          .dashboard-page .container {
            max-width: 1100px;
            margin: 0 auto;
          }

          .dashboard-page .dash-header-wrap {
            animation: fadeInUp 0.4s ease both;
          }

          .dashboard-page .alert {
            margin-top: 24px;
            padding: 14px 20px;
            border-radius: 10px;
            font-size: 13.5px;
            font-weight: 500;
            animation: slideIn 0.3s ease both;
          }

          .dashboard-page .alert.error {
            background: #fdf2f0;
            border: 1px solid #f5d6d0;
            color: #b33a2e;
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
            margin-top: 12px;
          }

          .dashboard-page .btn-primary {
            background: #1c1830;
            color: #ffffff;
            border-color: #1c1830;
          }

          .dashboard-page .btn-primary:hover {
            background: #2c2648;
            border-color: #2c2648;
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(28,24,48,0.25);
          }

          @media (prefers-reduced-motion: reduce) {
            .dashboard-page * { animation: none !important; transition: none !important; }
          }
        `}</style>

        <div className="container">
          <div className="dash-header-wrap">
            <DashboardHeader
              eyebrow="PARTICIPANT"
              title={`Good to see you, ${
                user?.name?.split(" ")[0] || "Participant"
              }.`}
              description="Keep an eye on your registrations, certificates and feedback."
            />
          </div>

          <div className="alert error">
            {error}
          </div>

          <Link
            className="btn btn-primary"
            to="/events"
          >
            Find an event
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .dashboard-page {
          min-height: 100vh;
          background: #f7f6f2;
          font-family: 'Inter', sans-serif;
          padding: 44px 24px 64px;
        }

        .dashboard-page .container {
          max-width: 1100px;
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

        .dashboard-page .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 28px;
        }

        .dashboard-page .stats-grid > * {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        .dashboard-page .stats-grid > *:nth-child(1) { animation-delay: 0.05s; }
        .dashboard-page .stats-grid > *:nth-child(2) { animation-delay: 0.10s; }
        .dashboard-page .stats-grid > *:nth-child(3) { animation-delay: 0.15s; }

        .dashboard-page .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          margin-top: 24px;
        }

        .dashboard-page .panel {
          background: #ffffff;
          border: 1px solid #eae7dd;
          border-radius: 16px;
          padding: 24px 28px;
          box-shadow: 0 1px 2px rgba(28,24,48,0.03), 0 12px 28px -18px rgba(28,24,48,0.12);
          animation: fadeInUp 0.5s ease both;
          position: relative;
          overflow: hidden;
        }

        .dashboard-page .panel:first-child {
          animation-delay: 0.12s;
        }

        .dashboard-page .panel:last-child {
          animation-delay: 0.18s;
        }

        .dashboard-page .panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #e29a4d, #e8b06a, #e29a4d);
          background-size: 200% 100%;
          opacity: 0.6;
          animation: shimmer 3s linear infinite;
        }

        .dashboard-page .panel.quick-panel::before {
          background: linear-gradient(90deg, #a89b78, #c4b89a, #a89b78);
        }

        .dashboard-page .panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          padding-bottom: 14px;
          border-bottom: 1px solid #f0eee4;
        }

        .dashboard-page .panel-head h3 {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #1c1830;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .dashboard-page .panel-head a {
          font-size: 12.5px;
          font-weight: 500;
          color: #e29a4d;
          text-decoration: none;
          transition: all 0.2s ease;
          padding: 4px 12px;
          border-radius: 6px;
        }

        .dashboard-page .panel-head a:hover {
          background: #fdf6ed;
          color: #d48a3a;
          transform: translateX(2px);
        }

        .dashboard-page .list-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-radius: 8px;
          transition: all 0.25s ease;
          border-bottom: 1px solid #f5f3eb;
        }

        .dashboard-page .list-row:last-child {
          border-bottom: none;
        }

        .dashboard-page .list-row:hover {
          background: #faf8f2;
          transform: translateX(4px);
        }

        .dashboard-page .list-row > div {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .dashboard-page .list-row strong {
          font-size: 14px;
          font-weight: 600;
          color: #1c1830;
          letter-spacing: -0.01em;
        }

        .dashboard-page .list-row span {
          font-size: 12.5px;
          color: #8a8676;
        }

        .dashboard-page .status {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 14px;
          border-radius: 20px;
          text-transform: capitalize;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }

        .dashboard-page .status-pending {
          background: #fdf6ed;
          color: #b8873a;
          border: 1px solid #f5e8d0;
        }

        .dashboard-page .status-approved {
          background: #e8f0e6;
          color: #3c6b2e;
          border: 1px solid #d4e6cc;
        }

        .dashboard-page .status-rejected {
          background: #fdf2f0;
          color: #b33a2e;
          border: 1px solid #f5d6d0;
        }

        .dashboard-page .status-completed {
          background: #e6edf5;
          color: #2a5b8a;
          border: 1px solid #d0dde8;
        }

        .dashboard-page .status-cancelled {
          background: #f5f5f5;
          color: #6b6b6b;
          border: 1px solid #e8e8e8;
        }

        .dashboard-page .empty-state {
          text-align: center;
          padding: 40px 20px;
          font-size: 13px;
          color: #8a8676;
          line-height: 1.6;
        }

        .dashboard-page .empty-state.small {
          padding: 32px 16px;
        }

        .dashboard-page .empty-state::before {
          content: "📋";
          display: block;
          font-size: 28px;
          margin-bottom: 8px;
          opacity: 0.4;
        }

        .dashboard-page .quick-panel {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .dashboard-page .quick-panel h3 {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #1c1830;
          margin: 0 0 12px 0;
          padding-bottom: 14px;
          border-bottom: 1px solid #f0eee4;
          letter-spacing: -0.01em;
        }

        .dashboard-page .quick-panel a {
          font-size: 13.5px;
          color: #34321f;
          text-decoration: none;
          padding: 10px 14px;
          border-radius: 8px;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
        }

        .dashboard-page .quick-panel a:hover {
          background: #faf8f2;
          color: #1c1830;
          transform: translateX(6px);
        }

        .dashboard-page .quick-panel a .arrow {
          margin-left: auto;
          color: #a89b78;
          transition: all 0.25s ease;
        }

        .dashboard-page .quick-panel a:hover .arrow {
          transform: translateX(4px);
          color: #e29a4d;
        }

        .dashboard-page .quick-panel a .link-icon {
          font-size: 18px;
          width: 32px;
          text-align: center;
        }

        @media (max-width: 820px) {
          .dashboard-page {
            padding: 28px 16px 48px;
          }

          .dashboard-page .content-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .dashboard-page .panel {
            padding: 18px 20px;
          }

          .dashboard-page .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .dashboard-page {
            padding: 20px 12px 36px;
          }

          .dashboard-page .stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .dashboard-page .panel {
            padding: 14px 16px;
          }

          .dashboard-page .list-row {
            flex-wrap: wrap;
            gap: 8px;
          }

          .dashboard-page .list-row strong {
            font-size: 13px;
          }

          .dashboard-page .quick-panel a {
            font-size: 12.5px;
            padding: 8px 12px;
          }

          .dashboard-page .btn {
            font-size: 12px;
            padding: 8px 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dashboard-page * {
            animation: none !important;
            transition: none !important;
          }
          .dashboard-page .panel::before {
            display: none !important;
          }
          .dashboard-page .btn-primary::after {
            display: none !important;
          }
        }
      `}</style>

      <div className="container">
        <div className="dash-header-wrap">
          <DashboardHeader
            eyebrow="PARTICIPANT"
            title={`Good to see you, ${
              user?.name?.split(" ")[0] || "Participant"
            }.`}
            description="Keep an eye on your registrations, certificates and feedback."
            action={
              <Link
                className="btn btn-primary"
                to="/events"
              >
                Find an event
              </Link>
            }
          />
        </div>

        <div className="stats-grid">
          <StatCard
            label="Registrations"
            value={data.registrations.length}
            icon="◎"
          />

          <StatCard
            label="Certificates"
            value={data.certificates.length}
            icon="✓"
            tone="green"
          />

          <StatCard
            label="Feedback"
            value={data.feedback.length}
            icon="★"
            tone="purple"
          />
        </div>

        <div className="content-grid">
          <section className="panel">
            <div className="panel-head">
              <h3>Upcoming registrations</h3>

              <Link to="/participant/registrations">
                View all →
              </Link>
            </div>

            {data.registrations
              .filter((registration) => registration.status !== "cancelled")
              .slice(0, 5)
              .map((registration) => (
                <div
                  className="list-row"
                  key={registration._id}
                >
                  <div>
                    <strong>
                      {registration.event?.title ||
                        "Event"}
                    </strong>

                    <span>
                      {formatDate(
                        registration.event?.date
                      )}{" "}
                      ·{" "}
                      {registration.event?.venue ||
                        "Venue not specified"}
                    </span>
                  </div>

                  <span
                    className={`status status-${registration.status}`}
                  >
                    {registration.status}
                  </span>
                </div>
              ))}

            {!data.registrations.length && (
              <div className="empty-state small">
                No registrations yet.
              </div>
            )}
          </section>

          <section className="panel quick-panel">
            <h3>Quick access</h3>

            <Link to="/participant/registrations">
              <span className="link-icon">📋</span>
              My registrations
              <span className="arrow">→</span>
            </Link>

            <Link to="/participant/certificates">
              <span className="link-icon">📜</span>
              My certificates
              <span className="arrow">→</span>
            </Link>

            <Link to="/participant/feedback">
              <span className="link-icon">⭐</span>
              My feedback
              <span className="arrow">→</span>
            </Link>

            <Link to="/participant/profile">
              <span className="link-icon">👤</span>
              My profile
              <span className="arrow">→</span>
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}