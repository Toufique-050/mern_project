import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Loader from "../../components/common/Loader";
import { getMyEvents } from "../../services/eventService";
import { getEventRegistrations } from "../../services/registrationService";
import { formatDate, errorMessage } from "../../utils/helpers";

export default function OrganizerRegistrations() {
    const [events, setEvents] = useState([]);
    const [selected, setSelected] = useState("");
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyEvents()
            .then(d => {
                const list = d.events || [];
                setEvents(list);
                if (list[0]) setSelected(list[0]._id)
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, []);

    useEffect(() => {
        if (selected)
            getEventRegistrations(selected)
                .then(d => setRows(d.registrations || []))
                .catch(e => alert(errorMessage(e)))
    }, [selected]);

    if (loading) return <Loader />;

    return (
        <main className="dashboard-page">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@400;500;600;700&display=swap');

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-8px); }
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
                    max-width: 1100px;
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

                .dashboard-page .toolbar select {
                    font-family: 'Inter', sans-serif;
                    font-size: 13.5px;
                    font-weight: 500;
                    color: #1c1830;
                    background: #ffffff;
                    border: 1px solid #e0ddd4;
                    border-radius: 10px;
                    padding: 11px 18px;
                    min-width: 280px;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    box-shadow: 0 1px 2px rgba(28,24,48,0.03);
                    appearance: auto;
                }

                .dashboard-page .toolbar select:hover {
                    border-color: #d0cbbc;
                    box-shadow: 0 2px 8px rgba(28,24,48,0.05);
                }

                .dashboard-page .toolbar select:focus {
                    outline: none;
                    border-color: #e29a4d;
                    box-shadow: 0 0 0 4px rgba(226,154,77,0.12);
                }

                .dashboard-page .toolbar select option {
                    padding: 8px;
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
                    transition: all 0.2s ease;
                }

                .dashboard-page tbody tr:not(:last-child) td {
                    border-bottom: 1px solid #f0eee4;
                }

                .dashboard-page tbody tr:hover {
                    background: #faf8f2;
                    transform: scale(1.002);
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

                .dashboard-page td .contact-cell {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .dashboard-page td .contact-cell .email {
                    font-weight: 500;
                    color: #1c1830;
                }

                .dashboard-page td .contact-cell .phone {
                    font-size: 12px;
                    color: #8a8676;
                }

                .dashboard-page td .registration-cell {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .dashboard-page td .registration-cell .date {
                    font-weight: 500;
                    color: #1c1830;
                }

                .dashboard-page td .registration-cell .status {
                    font-size: 11px;
                    font-weight: 600;
                    padding: 2px 12px;
                    border-radius: 12px;
                    display: inline-block;
                    text-transform: capitalize;
                    letter-spacing: 0.02em;
                    width: fit-content;
                }

                .dashboard-page td .registration-cell .status-pending {
                    background: #fdf6ed;
                    color: #b8873a;
                }

                .dashboard-page td .registration-cell .status-approved {
                    background: #e8f0e6;
                    color: #3c6b2e;
                }

                .dashboard-page td .registration-cell .status-rejected {
                    background: #fdf2f0;
                    color: #b33a2e;
                }

                .dashboard-page td .registration-cell .status-completed {
                    background: #e6edf5;
                    color: #2a5b8a;
                }

                .dashboard-page td .registration-cell .status-cancelled {
                    background: #f5f5f5;
                    color: #6b6b6b;
                }

                .dashboard-page .empty-state {
                    text-align: center;
                    padding: 56px 32px;
                    font-size: 13.5px;
                    color: #8a8676;
                    line-height: 1.6;
                }

                .dashboard-page .empty-state::before {
                    content: "📋";
                    display: block;
                    font-size: 36px;
                    margin-bottom: 12px;
                    opacity: 0.4;
                }

                .dashboard-page .event-count {
                    font-size: 12.5px;
                    color: #8a8676;
                    margin-left: 12px;
                    font-weight: 400;
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
                        min-width: 620px;
                    }

                    .dashboard-page thead th,
                    .dashboard-page td {
                        padding: 14px 16px;
                    }

                    .dashboard-page .toolbar select {
                        min-width: 100%;
                        font-size: 13px;
                        padding: 10px 14px;
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

                    .dashboard-page .empty-state {
                        padding: 40px 20px;
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
                        title="Registrations"
                        description="See who signed up for each of your events."
                    />
                </div>

                <div className="toolbar">
                    <select 
                        value={selected} 
                        onChange={e => setSelected(e.target.value)}
                    >
                        <option value="">Select an event</option>
                        {events.map(e => (
                            <option key={e._id} value={e._id}>
                                {e.title}
                            </option>
                        ))}
                    </select>
                    {selected && events.length > 0 && (
                        <span className="event-count">
                            {rows.length} registrant{rows.length !== 1 ? 's' : ''}
                        </span>
                    )}
                </div>

                <div className="table-card">
                    <table>
                        <thead>
                            <tr>
                                <th>Participant</th>
                                <th>Contact</th>
                                <th>Department</th>
                                <th>Registration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(r => (
                                <tr key={r._id}>
                                    <td>
                                        <strong>{r.student?.name}</strong>
                                        <small>{r.student?.enrollmentNo || "—"}</small>
                                    </td>
                                    <td>
                                        <div className="contact-cell">
                                            <span className="email">{r.student?.email}</span>
                                            <span className="phone">{r.student?.contact || "—"}</span>
                                        </div>
                                    </td>
                                    <td>{r.student?.department || "—"}</td>
                                    <td>
                                        <div className="registration-cell">
                                            <span className="date">{formatDate(r.createdAt)}</span>
                                            <span className={`status status-${r.status || 'pending'}`}>
                                                {r.status || 'pending'}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {selected && !rows.length && (
                        <div className="empty-state">
                            No registrations for this event.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}