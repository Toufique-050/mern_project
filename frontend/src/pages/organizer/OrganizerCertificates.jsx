import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Loader from "../../components/common/Loader";
import { getMyEvents } from "../../services/eventService";
import { getEventAttendance } from "../../services/attendanceService";
import { generateCertificate } from "../../services/certificateService";
import { errorMessage } from "../../utils/helpers";

export default function OrganizerCertificates() {
    const [events, setEvents] = useState([]);
    const [selected, setSelected] = useState("");
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState("");

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
            getEventAttendance(selected)
                .then(d => setRows(d.attendance || []))
                .catch(() => {})
    }, [selected]);

    const issue = async (studentId) => {
        setBusy(studentId);
        try {
            const d = await generateCertificate(selected, studentId);
            alert(d.message)
        } catch (e) {
            alert(errorMessage(e))
        } finally {
            setBusy("")
        }
    };

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

                @keyframes spin {
                    to { transform: rotate(360deg); }
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
                    max-width: 1000px;
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

                .dashboard-page .toolbar .info-badge {
                    font-size: 12.5px;
                    color: #8a8676;
                    margin-left: 16px;
                    font-weight: 400;
                    background: #ffffff;
                    padding: 6px 16px;
                    border-radius: 20px;
                    border: 1px solid #eae7dd;
                    display: inline-block;
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

                .dashboard-page thead th:last-child {
                    text-align: center;
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
                    margin-top: 2px;
                }

                .dashboard-page td .marked-time {
                    font-size: 13px;
                    color: #34321f;
                }

                .dashboard-page td .marked-time .no-time {
                    color: #8a8676;
                    font-style: italic;
                }

                .dashboard-page td:last-child {
                    text-align: center;
                }

                .dashboard-page .btn {
                    font-family: 'Inter', sans-serif;
                    font-size: 12px;
                    font-weight: 600;
                    padding: 7px 18px;
                    border-radius: 8px;
                    border: 1px solid transparent;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    white-space: nowrap;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                }

                .dashboard-page .btn-primary {
                    background: #1c1830;
                    color: #ffffff;
                    border-color: #1c1830;
                }

                .dashboard-page .btn-primary:hover:not(:disabled) {
                    background: #2c2648;
                    border-color: #2c2648;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(28,24,48,0.2);
                }

                .dashboard-page .btn-primary:active:not(:disabled) {
                    transform: translateY(0px) scale(0.97);
                }

                .dashboard-page .btn-primary:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none !important;
                }

                .dashboard-page .btn .spinner {
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: #ffffff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                    vertical-align: middle;
                }

                .dashboard-page .btn .icon {
                    font-size: 14px;
                }

                .dashboard-page .btn-success {
                    background: #e8f0e6;
                    color: #3c6b2e;
                    border-color: #d4e6cc;
                    cursor: default;
                }

                .dashboard-page .btn-success .icon {
                    color: #3c6b2e;
                }

                .dashboard-page .empty-state {
                    text-align: center;
                    padding: 56px 32px;
                    font-size: 13.5px;
                    color: #8a8676;
                    line-height: 1.6;
                }

                .dashboard-page .empty-state::before {
                    content: "📜";
                    display: block;
                    font-size: 36px;
                    margin-bottom: 12px;
                    opacity: 0.4;
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
                        min-width: 520px;
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

                    .dashboard-page .toolbar .info-badge {
                        margin-left: 0;
                        margin-top: 8px;
                        display: inline-block;
                        width: 100%;
                        text-align: center;
                    }

                    .dashboard-page .toolbar {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        gap: 8px;
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

                    .dashboard-page .btn {
                        font-size: 11px;
                        padding: 6px 14px;
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
                        title="Certificates"
                        description="Issue certificates only to participants whose attendance is marked."
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
                    {selected && (
                        <span className="info-badge">
                            {rows.length} eligible participant{rows.length !== 1 ? 's' : ''}
                        </span>
                    )}
                </div>

                <div className="table-card">
                    <table>
                        <thead>
                            <tr>
                                <th>Participant</th>
                                <th>Marked at</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(a => (
                                <tr key={a._id}>
                                    <td>
                                        <strong>{a.student?.name}</strong>
                                        <small>{a.student?.email}</small>
                                    </td>
                                    <td>
                                        <span className="marked-time">
                                            {a.markedAt 
                                                ? new Date(a.markedAt).toLocaleString() 
                                                : <span className="no-time">—</span>
                                            }
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-primary" 
                                            disabled={busy === a.student?._id} 
                                            onClick={() => issue(a.student?._id)}
                                        >
                                            {busy === a.student?._id ? (
                                                <>
                                                    <span className="spinner" />
                                                    Generating…
                                                </>
                                            ) : (
                                                <>
                                                    <span className="icon">📄</span>
                                                    Issue certificate
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!rows.length && (
                        <div className="empty-state">
                            No attendance records for this event.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}