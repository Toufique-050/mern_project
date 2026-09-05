import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import Loader from "../../components/common/Loader";
import { getMyEvents } from "../../services/eventService";
import { getEventRegistrations } from "../../services/registrationService";
import { formatDate } from "../../utils/helpers";

export default function OrganizerDashboard() {
    const [events, setEvents] = useState([]);
    const [registrations, setRegistrations] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyEvents()
            .then(async (d) => {
                const list = d.events || [];

                setEvents(list);

                const results = await Promise.all(
                    list
                        .slice(0, 8)
                        .map((e) =>
                            getEventRegistrations(e._id).catch(() => ({
                                registrations: []
                            }))
                        )
                );

                setRegistrations(
                    results.reduce(
                        (total, r) => total + (r.registrations?.length || 0),
                        0
                    )
                );
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Loader />;
    }

    const pendingEvents = events.filter(
        (e) => e.status === "pending"
    ).length;

    return (
        <main className="dashboard-page">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@400;500;600;700&display=swap');

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(-12px); }
                    to { opacity: 1; transform: translateX(0); }
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

                .dashboard-page .dashboard-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-top: 4px;
                }

                .dashboard-page .dashboard-actions .btn {
                    font-family: 'Inter', sans-serif;
                    font-size: 12px;
                    font-weight: 600;
                    padding: 8px 16px;
                    border-radius: 8px;
                    text-decoration: none;
                    transition: all 0.25s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                }

                .dashboard-page .dashboard-actions .btn-primary {
                    background: #1c1830;
                    color: #ffffff;
                    border: 1px solid #1c1830;
                }

                .dashboard-page .dashboard-actions .btn-primary:hover {
                    background: #2c2648;
                    border-color: #2c2648;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(28,24,48,0.2);
                }

                .dashboard-page .dashboard-actions .btn-light {
                    background: #ffffff;
                    color: #1c1830;
                    border: 1px solid #e0ddd4;
                }

                .dashboard-page .dashboard-actions .btn-light:hover {
                    background: #faf8f2;
                    border-color: #d0cbbc;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(28,24,48,0.06);
                }

                .dashboard-page .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

                .dashboard-page .dashboard-stat-link {
                    text-decoration: none;
                    display: block;
                    transition: all 0.25s ease;
                    border-radius: 12px;
                }

                .dashboard-page .dashboard-stat-link:hover {
                    transform: translateY(-4px) scale(1.01);
                    box-shadow: 0 8px 24px rgba(28,24,48,0.08);
                }

                .dashboard-page .dashboard-stat-link:active {
                    transform: translateY(0px) scale(0.98);
                }

                .dashboard-page .panel {
                    margin-top: 28px;
                    background: #ffffff;
                    border: 1px solid #eae7dd;
                    border-radius: 16px;
                    padding: 24px 28px;
                    box-shadow: 0 1px 2px rgba(28,24,48,0.03), 0 12px 28px -18px rgba(28,24,48,0.12);
                    animation: fadeInUp 0.4s ease both;
                    animation-delay: 0.15s;
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
                }

                .dashboard-page .list-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 14px;
                    border-radius: 8px;
                    transition: all 0.2s ease;
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
                    padding: 48px 32px;
                    font-size: 13.5px;
                    color: #8a8676;
                    line-height: 1.6;
                }

                .dashboard-page .empty-state.small {
                    padding: 32px 20px;
                    font-size: 13px;
                }

                .dashboard-page .empty-state::before {
                    content: "📅";
                    display: block;
                    font-size: 32px;
                    margin-bottom: 8px;
                    opacity: 0.4;
                }

                .dashboard-page .empty-state.small::before {
                    font-size: 24px;
                }

                @media (max-width: 820px) {
                    .dashboard-page {
                        padding: 28px 16px 48px;
                    }

                    .dashboard-page .stats-grid {
                        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                        gap: 12px;
                    }

                    .dashboard-page .dashboard-actions {
                        gap: 6px;
                    }

                    .dashboard-page .dashboard-actions .btn {
                        font-size: 11px;
                        padding: 6px 12px;
                    }

                    .dashboard-page .panel {
                        padding: 18px 20px;
                    }

                    .dashboard-page .list-row {
                        flex-wrap: wrap;
                        gap: 8px;
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

                    .dashboard-page .dashboard-actions {
                        flex-direction: column;
                        width: 100%;
                    }

                    .dashboard-page .dashboard-actions .btn {
                        width: 100%;
                        justify-content: center;
                        font-size: 12px;
                        padding: 8px 14px;
                    }

                    .dashboard-page .panel {
                        padding: 14px 16px;
                    }

                    .dashboard-page .list-row {
                        padding: 10px 12px;
                    }

                    .dashboard-page .list-row strong {
                        font-size: 13px;
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
                        eyebrow="ORGANIZER"
                        title="Organizer workspace"
                        description="Create events, manage participants and finish the event lifecycle."
                        action={
                            <div className="dashboard-actions">
                                <Link
                                    className="btn btn-primary"
                                    to="/organizer/events"
                                >
                                    Manage Events
                                </Link>

                                <Link
                                    className="btn btn-light"
                                    to="/organizer/attendance"
                                >
                                    Attendance
                                </Link>

                                <Link
                                    className="btn btn-light"
                                    to="/organizer/certificates"
                                >
                                    Certificates
                                </Link>

                                <Link
                                    className="btn btn-primary"
                                    to="/organizer/events/create"
                                >
                                    + Create event
                                </Link>
                            </div>
                        }
                    />
                </div>

                <div className="stats-grid">
                    <Link
                        to="/organizer/events"
                        className="dashboard-stat-link"
                    >
                        <StatCard
                            label="My events"
                            value={events.length}
                            icon="◈"
                        />
                    </Link>

                    <Link
                        to="/organizer/registrations"
                        className="dashboard-stat-link"
                    >
                        <StatCard
                            label="Registrations"
                            value={registrations}
                            icon="◎"
                            tone="green"
                        />
                    </Link>

                    <Link
                        to="/organizer/events"
                        className="dashboard-stat-link"
                    >
                        <StatCard
                            label="Pending approval"
                            value={pendingEvents}
                            icon="◷"
                            tone="purple"
                        />
                    </Link>
                </div>

                <section className="panel">
                    <div className="panel-head">
                        <h3>Recent events</h3>

                        <Link to="/organizer/events">
                            Manage all →
                        </Link>
                    </div>

                    {events.slice(0, 6).map((e) => (
                        <div className="list-row" key={e._id}>
                            <div>
                                <strong>{e.title}</strong>

                                <span>
                                    {formatDate(e.date)} · {e.venue}
                                </span>
                            </div>

                            <span
                                className={`status status-${e.status}`}
                            >
                                {e.status}
                            </span>
                        </div>
                    ))}

                    {!events.length && (
                        <div className="empty-state small">
                            Create your first event to get started.
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}