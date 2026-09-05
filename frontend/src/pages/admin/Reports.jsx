import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import Loader from "../../components/common/Loader";
import { getAdminStats } from "../../services/adminService";

export default function Reports() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then(d => setStats(d.stats))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="dashboard-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes growBar {
          from { width: 0%; }
          to { width: 100%; }
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
          max-width: 1100px;
          margin: 0 auto;
        }

        .dashboard-page .dash-header-wrap {
          animation: fadeInUp 0.4s ease both;
        }

        .dashboard-page .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 16px;
          margin-top: 28px;
          animation: fadeInUp 0.4s ease both;
          animation-delay: 0.06s;
        }

        .dashboard-page .stats-grid > * {
          animation: fadeInUp 0.4s ease both;
        }

        .dashboard-page .stats-grid > *:nth-child(1) { animation-delay: 0.06s; }
        .dashboard-page .stats-grid > *:nth-child(2) { animation-delay: 0.09s; }
        .dashboard-page .stats-grid > *:nth-child(3) { animation-delay: 0.12s; }
        .dashboard-page .stats-grid > *:nth-child(4) { animation-delay: 0.15s; }
        .dashboard-page .stats-grid > *:nth-child(5) { animation-delay: 0.18s; }

        .dashboard-page .panel {
          margin-top: 28px;
          background: #ffffff;
          border: 1px solid #eae7dd;
          border-radius: 16px;
          padding: 24px 28px;
          box-shadow: 0 1px 2px rgba(28,24,48,0.03), 0 12px 28px -18px rgba(28,24,48,0.12);
          animation: fadeInUp 0.4s ease both;
          animation-delay: 0.2s;
        }

        .dashboard-page .panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid #f0eee4;
        }

        .dashboard-page .panel-head h3 {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #1c1830;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .dashboard-page .panel-head .badge {
          font-size: 11px;
          font-weight: 500;
          color: #8a8676;
          background: #f7f6f2;
          padding: 4px 12px;
          border-radius: 12px;
          border: 1px solid #f0eee4;
        }

        .dashboard-page .bar-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 7px 0;
          transition: background 0.15s ease;
          border-radius: 6px;
        }

        .dashboard-page .bar-row:hover {
          background: #faf8f2;
        }

        .dashboard-page .bar-row > span {
          font-size: 13px;
          font-weight: 500;
          color: #34321f;
          min-width: 100px;
          text-transform: capitalize;
        }

        .dashboard-page .bar-row > div {
          flex: 1;
          height: 8px;
          background: #f0eee4;
          border-radius: 6px;
          overflow: hidden;
          position: relative;
        }

        .dashboard-page .bar-row > div i {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, #e29a4d, #e8b06a);
          border-radius: 6px;
          transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: growBar 0.8s ease both;
        }

        .dashboard-page .bar-row > strong {
          font-size: 13px;
          font-weight: 600;
          color: #1c1830;
          min-width: 36px;
          text-align: right;
        }

        .dashboard-page .empty-state {
          text-align: center;
          padding: 48px 32px;
          font-size: 13.5px;
          color: #8a8676;
          line-height: 1.6;
        }

        .dashboard-page .empty-state::before {
          content: "📊";
          display: block;
          font-size: 36px;
          margin-bottom: 10px;
          opacity: 0.4;
        }

        @media (max-width: 820px) {
          .dashboard-page {
            padding: 28px 16px 48px;
          }

          .dashboard-page .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 12px;
          }

          .dashboard-page .panel {
            padding: 18px 20px;
          }

          .dashboard-page .bar-row {
            flex-wrap: wrap;
            gap: 8px 12px;
          }

          .dashboard-page .bar-row > span {
            min-width: 80px;
            font-size: 12.5px;
          }

          .dashboard-page .bar-row > div {
            flex: 1;
            min-width: 100%;
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

          .dashboard-page .bar-row > span {
            min-width: 70px;
            font-size: 12px;
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
            title="Reports"
            description="A lightweight overview built from the live EventSphere API."
          />
        </div>

        <div className="stats-grid">
          <StatCard label="Users" value={stats?.totalUsers || 0} />
          <StatCard label="Events" value={stats?.totalEvents || 0} />
          <StatCard label="Registrations" value={stats?.totalRegistrations || 0} />
          <StatCard label="Feedback" value={stats?.totalFeedback || 0} />
          <StatCard label="Media" value={stats?.totalMedia || 0} />
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3>Users by role</h3>
            <span className="badge">
              Total: {stats?.totalUsers || 0}
            </span>
          </div>

          {stats?.usersByRole && stats.usersByRole.length > 0 ? (
            (stats.usersByRole || []).map(x => (
              <div className="bar-row" key={x._id}>
                <span>{x._id}</span>
                <div>
                  <i style={{
                    width: `${Math.min((x.count / (stats?.totalUsers || 1)) * 100, 100)}%`
                  }} />
                </div>
                <strong>{x.count}</strong>
              </div>
            ))
          ) : (
            <div className="empty-state">No user data available</div>
          )}
        </div>
      </div>
    </main>
  );
}