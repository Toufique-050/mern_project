import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Loader from "../../components/common/Loader";
import {
  getAdminUsers,
  updateAdminUser
} from "../../services/adminService";
import { errorMessage } from "../../utils/helpers";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");

  const load = () => {
    setLoading(true);

    getAdminUsers(search ? { search } : {})
      .then((data) => {
        setUsers(data.users || []);
      })
      .catch((error) => {
        alert(errorMessage(error));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      load();
    }, 250);

    return () => clearTimeout(timer);
  }, [search]);

  const update = async (id, data) => {
    try {
      setSaving(id);

      await updateAdminUser(id, data);

      await load();
    } catch (error) {
      alert(errorMessage(error));
    } finally {
      setSaving("");
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

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
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

        .dashboard-page .toolbar {
          margin-top: 28px;
          animation: fadeInUp 0.4s ease both;
          animation-delay: 0.06s;
        }

        .dashboard-page .toolbar input {
          width: 100%;
          max-width: 380px;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          padding: 11px 18px;
          background: #ffffff;
          border: 1px solid #e0ddd4;
          border-radius: 10px;
          color: #1c1830;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 1px 2px rgba(28,24,48,0.03);
        }

        .dashboard-page .toolbar input::placeholder {
          color: #a8a392;
        }

        .dashboard-page .toolbar input:hover {
          border-color: #d0cbbc;
        }

        .dashboard-page .toolbar input:focus {
          outline: none;
          border-color: #e29a4d;
          box-shadow: 0 0 0 4px rgba(226,154,77,0.12);
        }

        .dashboard-page .table-card {
          margin-top: 24px;
          background: #ffffff;
          border: 1px solid #eae7dd;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(28,24,48,0.03), 0 12px 28px -18px rgba(28,24,48,0.12);
          animation: fadeInUp 0.4s ease both;
          animation-delay: 0.1s;
        }

        .dashboard-page table {
          width: 100%;
          border-collapse: collapse;
        }

        .dashboard-page thead th {
          text-align: left;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #a89b78;
          background: #faf8f2;
          padding: 14px 20px;
          border-bottom: 1px solid #eae7dd;
          white-space: nowrap;
        }

        .dashboard-page tbody tr {
          transition: background 0.2s ease, transform 0.15s ease;
        }

        .dashboard-page tbody tr:not(:last-child) td {
          border-bottom: 1px solid #f0eee4;
        }

        .dashboard-page tbody tr:hover {
          background: #faf8f2;
        }

        .dashboard-page tbody tr:active {
          transform: scale(0.998);
        }

        .dashboard-page td {
          padding: 16px 20px;
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
          margin-top: 3px;
        }

        .dashboard-page td input[type="email"] {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #1c1830;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 6px;
          padding: 5px 10px;
          width: 100%;
          min-width: 160px;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .dashboard-page td input[type="email"]:hover {
          border-color: #e0ddd4;
          background: #ffffff;
        }

        .dashboard-page td input[type="email"]:focus {
          outline: none;
          border-color: #e29a4d;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(226,154,77,0.12);
        }

        .dashboard-page td input[type="email"]:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .dashboard-page select {
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          color: #1c1830;
          background: #ffffff;
          border: 1px solid #e0ddd4;
          border-radius: 8px;
          padding: 6px 10px 6px 8px;
          cursor: pointer;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          min-width: 120px;
          appearance: auto;
        }

        .dashboard-page select:hover:not(:disabled) {
          border-color: #d0cbbc;
        }

        .dashboard-page select:focus:not(:disabled) {
          outline: none;
          border-color: #e29a4d;
          box-shadow: 0 0 0 3px rgba(226,154,77,0.12);
        }

        .dashboard-page select:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .dashboard-page .toggle {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 16px;
          border: 1px solid #e0ddd4;
          border-radius: 20px;
          background: #f7f6f2;
          color: #8a8676;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        .dashboard-page .toggle:hover:not(:disabled) {
          border-color: #d0cbbc;
          background: #f0eee4;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(28,24,48,0.06);
        }

        .dashboard-page .toggle:active:not(:disabled) {
          transform: translateY(0px) scale(0.97);
        }

        .dashboard-page .toggle.on {
          background: #e8f0e6;
          border-color: #8db87a;
          color: #3c6b2e;
        }

        .dashboard-page .toggle.on:hover:not(:disabled) {
          background: #dce8d8;
          border-color: #7aa867;
          box-shadow: 0 2px 8px rgba(60,107,46,0.12);
        }

        .dashboard-page .toggle:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .dashboard-page .saving-indicator {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid #e0ddd4;
          border-top-color: #e29a4d;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .dashboard-page .empty-state {
          text-align: center;
          padding: 48px 32px;
          font-size: 13.5px;
          color: #8a8676;
          line-height: 1.6;
          max-width: 420px;
          margin: 0 auto;
        }

        .dashboard-page .empty-state::before {
          content: "👥";
          display: block;
          font-size: 32px;
          margin-bottom: 10px;
          opacity: 0.5;
        }

        @media (max-width: 820px) {
          .dashboard-page {
            padding: 28px 16px 48px;
          }

          .dashboard-page .table-card {
            overflow-x: auto;
            border-radius: 14px;
          }

          .dashboard-page table {
            min-width: 700px;
          }

          .dashboard-page thead th,
          .dashboard-page td {
            padding: 14px 16px;
          }

          .dashboard-page .toolbar input {
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .dashboard-page {
            padding: 20px 12px 36px;
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
            padding: 5px 8px;
            min-width: 100px;
          }

          .dashboard-page .toggle {
            font-size: 11px;
            padding: 5px 12px;
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
            title="Manage users"
            description="Control account details, roles and active status for EventSphere users."
          />
        </div>

        <div className="toolbar">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email..."
          />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Active</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>
                      <strong>{u.name}</strong>
                      <small>{u.enrollmentNo || "—"}</small>
                    </td>

                    <td>
                      <input
                        type="email"
                        defaultValue={u.email}
                        disabled={saving === u._id}
                        onBlur={(e) => {
                          const newEmail = e.target.value.trim();

                          if (
                            newEmail &&
                            newEmail !== u.email
                          ) {
                            update(u._id, {
                              email: newEmail
                            });
                          }
                        }}
                      />
                    </td>

                    <td>
                      {u.department || "—"}
                    </td>

                    <td>
                      <select
                        value={u.role}
                        disabled={saving === u._id}
                        onChange={(e) =>
                          update(u._id, {
                            role: e.target.value
                          })
                        }
                      >
                        <option value="participant">
                          Participant
                        </option>

                        <option value="organizer">
                          Organizer
                        </option>

                        <option value="admin">
                          Admin
                        </option>
                      </select>
                    </td>

                    <td>
                      <button
                        className={`toggle ${
                          u.isActive ? "on" : ""
                        }`}
                        disabled={saving === u._id}
                        onClick={() =>
                          update(u._id, {
                            isActive: !u.isActive
                          })
                        }
                      >
                        {saving === u._id ? (
                          <span className="saving-indicator" />
                        ) : u.isActive ? (
                          "Active"
                        ) : (
                          "Disabled"
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!users.length && (
              <div className="empty-state">
                No users found.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}