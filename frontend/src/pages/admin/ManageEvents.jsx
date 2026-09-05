import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Loader from "../../components/common/Loader";
import EventStatus from "../../components/events/EventStatus";
import { getAdminEvents } from "../../services/adminService";
import { updateEventStatus } from "../../services/eventService";
import { formatDate, errorMessage } from "../../utils/helpers";

export default function ManageEvents() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getAdminEvents()
      .then((d) => setItems(d.events || []))
      .catch((e) => alert(errorMessage(e)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleStatusChange = async (id, value) => {
    try {
      await updateEventStatus(id, value);
      load();
    } catch (e) {
      alert(errorMessage(e));
    }
  };

  return (
    <main className="dashboard-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .dashboard-page {
          min-height: 100vh;
          background: #f7f6f2;
          font-family: 'Inter', sans-serif;
          padding: 44px 24px 64px;
        }

        .dashboard-page .container {
          max-width: 1120px;
          margin: 0 auto;
        }

        .dashboard-page .dash-header-wrap {
          animation: fadeInUp 0.4s ease both;
        }

        .dashboard-page .table-card {
          margin-top: 32px;
          background: #ffffff;
          border: 1px solid #eae7dd;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(28, 24, 48, 0.04), 0 16px 32px -20px rgba(28, 24, 48, 0.14);
          animation: fadeInUp 0.4s ease both;
          animation-delay: 0.08s;
        }

        .dashboard-page table {
          width: 100%;
          border-collapse: collapse;
        }

        .dashboard-page thead th {
          text-align: left;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #a89b78;
          background: #faf8f2;
          padding: 16px 22px;
          border-bottom: 1px solid #eae7dd;
          white-space: nowrap;
        }

        .dashboard-page tbody tr {
          transition: background 0.2s ease;
        }

        .dashboard-page tbody tr:not(:last-child) td {
          border-bottom: 1px solid #f0eee4;
        }

        .dashboard-page tbody tr:hover {
          background: #faf8f2;
        }

        .dashboard-page td {
          padding: 18px 22px;
          font-size: 13.5px;
          color: #34321f;
          vertical-align: middle;
          line-height: 1.5;
        }

        .dashboard-page td strong {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #1c1830;
          letter-spacing: -0.01em;
        }

        .dashboard-page td small {
          display: block;
          font-size: 12px;
          color: #8a8676;
          margin-top: 4px;
        }

        .dashboard-page .organizer-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .dashboard-page .organizer-cell .name {
          font-weight: 500;
          color: #1c1830;
        }

        .dashboard-page .organizer-cell .email {
          font-size: 12px;
          color: #8a8676;
        }

        .dashboard-page select {
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          color: #1c1830;
          background: #ffffff;
          border: 1px solid #e0ddd4;
          border-radius: 8px;
          padding: 7px 12px 7px 10px;
          cursor: pointer;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          min-width: 110px;
          appearance: auto;
        }

        .dashboard-page select:hover {
          border-color: #d0cbbc;
        }

        .dashboard-page select:focus {
          outline: none;
          border-color: #e29a4d;
          box-shadow: 0 0 0 4px rgba(226, 154, 77, 0.14);
        }

        .dashboard-page .status-badge-wrap {
          display: inline-block;
        }

        .dashboard-page .empty-state {
          text-align: center;
          padding: 56px 32px;
          font-size: 14px;
          color: #8a8676;
          line-height: 1.7;
          max-width: 440px;
          margin: 0 auto;
        }

        .dashboard-page .empty-state .icon {
          font-size: 32px;
          margin-bottom: 12px;
          display: block;
          opacity: 0.6;
        }

        /* responsive */
        @media (max-width: 820px) {
          .dashboard-page {
            padding: 28px 16px 48px;
          }

          .dashboard-page .table-card {
            overflow-x: auto;
            border-radius: 14px;
          }

          .dashboard-page table {
            min-width: 660px;
          }

          .dashboard-page thead th,
          .dashboard-page td {
            padding: 14px 16px;
          }
        }

        @media (max-width: 480px) {
          .dashboard-page {
            padding: 20px 12px 36px;
          }

          .dashboard-page .table-card {
            margin-top: 20px;
          }

          .dashboard-page td {
            font-size: 12.5px;
            padding: 12px 14px;
          }

          .dashboard-page td strong {
            font-size: 13px;
          }

          .dashboard-page select {
            font-size: 12px;
            padding: 6px 8px;
            min-width: 92px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dashboard-page * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="container">
        <div className="dash-header-wrap">
          <DashboardHeader
            eyebrow="ADMIN"
            title="Manage events"
            description="Approve, reject or update the lifecycle status of events."
          />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Organizer</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((e) => (
                  <tr key={e._id}>
                    <td>
                      <strong>{e.title}</strong>
                      <small>
                        {e.category} · {e.venue}
                      </small>
                    </td>
                    <td>
                      <span className="organizer-cell">
                        <span className="name">{e.organizer?.name || "—"}</span>
                        {e.organizer?.email && (
                          <span className="email">{e.organizer.email}</span>
                        )}
                      </span>
                    </td>
                    <td>{formatDate(e.date)}</td>
                    <td>
                      <span className="status-badge-wrap">
                        <EventStatus status={e.status} />
                      </span>
                    </td>
                    <td>
                      <select
                        value={e.status}
                        onChange={(ev) =>
                          handleStatusChange(e._id, ev.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!items.length && (
              <div className="empty-state">
                <span className="icon">📋</span>
                No events found. If an organizer created one, make sure you are
                logged in as an admin and using the same database.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}