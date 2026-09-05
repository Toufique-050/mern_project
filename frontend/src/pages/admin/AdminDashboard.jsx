import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import Loader from "../../components/common/Loader";
import { getAdminStats } from "../../services/adminService";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null), [loading, setLoading] = useState(true);
    useEffect(() => {
        getAdminStats().then(d => setStats(d.stats)).catch(() => { }).finally(() => setLoading(false))
    }, []);
    if (loading) return <Loader />;

    const tools = [
        { to: "/admin/events", label: "Manage events", icon: <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /> },
        { to: "/admin/users", label: "Manage users", icon: <><circle cx="9" cy="7" r="4" /><path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2M17 3.5a4 4 0 0 1 0 7.6M22 21v-2a4.5 4.5 0 0 0-3-4.2" /></> },
        { to: "/admin/feedback", label: "Manage feedback", icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
        { to: "/admin/gallery", label: "Manage gallery", icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></> },
        { to: "/admin/reports", label: "Reports", icon: <path d="M3 3v18h18M8 17V10M13 17V6M18 17v-4" /> },
    ];

    return (
        <main className="dashboard-page">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@400;500;600;700&display=swap');

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes growWidth {
                    from { width: 0 !important; }
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

                .dashboard-page .btn.btn-primary {
                    background: #1c1830;
                    color: #fff;
                    border: none;
                    padding: 11px 20px;
                    border-radius: 9px;
                    font-size: 13.5px;
                    font-weight: 600;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    transition: opacity 0.15s, transform 0.15s;
                }
                .dashboard-page .btn.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
                .dashboard-page .btn.btn-primary:active { transform: scale(0.98); }

                .dashboard-page .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 14px;
                    margin: 32px 0 28px;
                }
                @media (max-width: 900px) {
                    .dashboard-page .stats-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 520px) {
                    .dashboard-page .stats-grid { grid-template-columns: 1fr; }
                }

                .dashboard-page .stats-grid > * {
                    animation: fadeInUp 0.5s ease both;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .dashboard-page .stats-grid > *:hover {
                    transform: translateY(-3px);
                }
                .dashboard-page .stats-grid > *:nth-child(1) { animation-delay: 0.05s; }
                .dashboard-page .stats-grid > *:nth-child(2) { animation-delay: 0.12s; }
                .dashboard-page .stats-grid > *:nth-child(3) { animation-delay: 0.19s; }
                .dashboard-page .stats-grid > *:nth-child(4) { animation-delay: 0.26s; }

                .dashboard-page .content-grid {
                    display: grid;
                    grid-template-columns: 1.55fr 1fr;
                    gap: 18px;
                    align-items: start;
                }
                @media (max-width: 820px) {
                    .dashboard-page .content-grid { grid-template-columns: 1fr; }
                }

                .dashboard-page .panel {
                    background: #fff;
                    border: 1px solid #eae7dd;
                    border-radius: 16px;
                    padding: 26px 28px;
                    box-shadow: 0 1px 2px rgba(28,24,48,0.03), 0 12px 28px -18px rgba(28,24,48,0.12);
                    animation: fadeInUp 0.5s ease both;
                    animation-delay: 0.3s;
                }
                .dashboard-page .content-grid section.panel.quick-panel { animation-delay: 0.36s; }

                .dashboard-page .panel-head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }
                .dashboard-page .panel-head h3 {
                    font-family: 'Fraunces', serif;
                    font-weight: 500;
                    font-size: 17px;
                    color: #1c1830;
                    margin: 0;
                }
                .dashboard-page .panel-tag {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.06em;
                    color: #a89b78;
                    text-transform: uppercase;
                }

                .dashboard-page .bar-row {
                    display: grid;
                    grid-template-columns: 108px 1fr 30px;
                    align-items: center;
                    gap: 14px;
                    padding: 10px 0;
                }
                .dashboard-page .bar-row + .bar-row { border-top: 1px solid #f2f0e7; }
                .dashboard-page .bar-row span {
                    color: #35331f;
                    font-size: 13px;
                    font-weight: 500;
                    text-transform: capitalize;
                }
                .dashboard-page .bar-row > div {
                    height: 7px;
                    background: #f2f0e7;
                    border-radius: 999px;
                    overflow: hidden;
                }
                .dashboard-page .bar-row i {
                    display: block;
                    height: 100%;
                    background: linear-gradient(90deg, #e29a4d, #cf7f2e);
                    border-radius: 999px;
                    font-style: normal;
                    animation: growWidth 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
                    animation-delay: 0.5s;
                }
                .dashboard-page .bar-row strong {
                    text-align: right;
                    color: #1c1830;
                    font-weight: 600;
                    font-size: 13px;
                }

                .dashboard-page .quick-panel h3 {
                    font-family: 'Fraunces', serif;
                    font-weight: 500;
                    font-size: 17px;
                    color: #1c1830;
                    margin: 0 0 18px;
                }
                .dashboard-page .tool-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 11px 10px;
                    margin: 0 -10px;
                    border-radius: 10px;
                    font-size: 13.5px;
                    font-weight: 500;
                    color: #34321f;
                    text-decoration: none;
                    transition: background 0.15s, color 0.15s, transform 0.15s;
                }
                .dashboard-page .tool-link:hover {
                    background: #f7f2e8;
                    color: #1c1830;
                    transform: translateX(3px);
                }
                .dashboard-page .tool-icon {
                    width: 32px;
                    height: 32px;
                    flex-shrink: 0;
                    border-radius: 9px;
                    background: #fbf1e0;
                    color: #c17e2f;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.15s;
                }
                .dashboard-page .tool-link:hover .tool-icon { transform: scale(1.08); }
                .dashboard-page .tool-arrow {
                    margin-left: auto;
                    color: #c9c4b3;
                    font-size: 13px;
                    transition: transform 0.15s;
                }
                .dashboard-page .tool-link:hover .tool-arrow { transform: translateX(2px); }

                @media (prefers-reduced-motion: reduce) {
                    .dashboard-page * { animation: none !important; transition: none !important; }
                }
            `}</style>

            <div className="container">
                <div className="dash-header-wrap">
                    <DashboardHeader
                        eyebrow="ADMIN"
                        title="System overview"
                        description="Keep events, users and feedback moving through the right workflow."
                        action={<Link className="btn btn-primary" to="/admin/events">Review events</Link>}
                    />
                </div>

                <div className="stats-grid">
                    <StatCard label="Users" value={stats?.totalUsers || 0} icon="◎" />
                    <StatCard label="Events" value={stats?.totalEvents || 0} icon="◈" tone="green" />
                    <StatCard label="Pending events" value={stats?.pendingEvents || 0} icon="◷" tone="purple" />
                    <StatCard label="Registrations" value={stats?.totalRegistrations || 0} icon="✓" tone="orange" />
                </div>

                <div className="content-grid">
                    <section className="panel">
                        <div className="panel-head">
                            <h3>Event categories</h3>
                            <span className="panel-tag">By volume</span>
                        </div>
                        {(stats?.eventsByCategory || []).map(x => (
                            <div className="bar-row" key={x._id}>
                                <span>{x._id}</span>
                                <div><i style={{ width: `${Math.min((x.count / (stats?.totalEvents || 1)) * 100, 100)}%` }} /></div>
                                <strong>{x.count}</strong>
                            </div>
                        ))}
                    </section>

                    <section className="panel quick-panel">
                        <h3>Admin tools</h3>
                        {tools.map(t => (
                            <Link key={t.to} to={t.to} className="tool-link">
                                <span className="tool-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {t.icon}
                                    </svg>
                                </span>
                                {t.label}
                                <span className="tool-arrow">→</span>
                            </Link>
                        ))}
                    </section>
                </div>
            </div>
        </main>
    );
}