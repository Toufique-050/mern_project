import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Loader from "../../components/common/Loader";
import { getMyEvents } from "../../services/eventService";
import { getEventRegistrations } from "../../services/registrationService";
import { getEventAttendance, markAttendance } from "../../services/attendanceService";
import { errorMessage } from "../../utils/helpers";

export default function OrganizerAttendance() {
    const [events, setEvents] = useState([]);
    const [selected, setSelected] = useState("");
    const [regs, setRegs] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState("");

    const load = async (id) => {
        if (!id) return;
        try {
            const [r, a] = await Promise.all([
                getEventRegistrations(id),
                getEventAttendance(id)
            ]);
            setRegs(r.registrations || []);
            setAttendance(a.attendance || [])
        } catch (e) {
            alert(errorMessage(e))
        }
    };

    useEffect(() => {
        getMyEvents()
            .then(d => {
                const list = d.events || [];
                setEvents(list);
                if (list[0]) {
                    setSelected(list[0]._id);
                    load(list[0]._id)
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, []);

    const choose = (id) => {
        setSelected(id);
        load(id)
    };

    const mark = async (id) => {
        setBusy(id);
        try {
            await markAttendance(id);
            await load(selected)
        } catch (e) {
            alert(errorMessage(e))
        } finally {
            setBusy("")
        }
    };

    const attended = new Set(attendance.map(a => a.student?._id));

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

                @keyframes popIn {
                    0% { transform: scale(0.8); opacity: 0; }
                    70% { transform: scale(1.05); }
                    100% { transform: scale(1); opacity: 1; }
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

                .dashboard-page .toolbar .info-badge strong {
                    color: #1c1830;
                    font-weight: 600;
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

                .dashboard-page tbody tr.attended-row {
                    background: #f8fbf7;
                }

                .dashboard-page tbody tr.attended-row:hover {
                    background: #f0f7ec;
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

                .dashboard-page td code {
                    font-family: 'Inter', monospace;
                    font-size: 12px;
                    background: #f7f6f2;
                    padding: 3px 10px;
                    border-radius: 6px;
                    color: #1c1830;
                    border: 1px solid #f0eee4;
                    display: inline-block;
                    white-space: nowrap;
                    max-width: 200px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .dashboard-page td:last-child {
                    text-align: center;
                }

                .dashboard-page .status {
                    font-size: 11px;
                    font-weight: 600;
                    padding: 4px 14px;
                    border-radius: 20px;
                    text-transform: capitalize;
                    letter-spacing: 0.03em;
                    display: inline-block;
                    white-space: nowrap;
                }

                .dashboard-page .status-approved {
                    background: #e8f0e6;
                    color: #3c6b2e;
                    border: 1px solid #d4e6cc;
                }

                .dashboard-page .status-approved::before {
                    content: "✓ ";
                    font-weight: 700;
                }

                .dashboard-page .status-pending {
                    background: #fdf6ed;
                    color: #b8873a;
                    border: 1px solid #f5e8d0;
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

                .dashboard-page .btn-success {
                    background: #e8f0e6;
                    color: #3c6b2e;
                    border-color: #d4e6cc;
                    cursor: default;
                    pointer-events: none;
                }

                .dashboard-page .btn-success::before {
                    content: "✓";
                    font-weight: 700;
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

                .dashboard-page .attendance-count {
                    display: flex;
                    gap: 20px;
                    margin-top: 12px;
                    flex-wrap: wrap;
                }

                .dashboard-page .attendance-count .count-item {
                    font-size: 12.5px;
                    color: #8a8676;
                    background: #ffffff;
                    padding: 4px 14px;
                    border-radius: 16px;
                    border: 1px solid #f0eee4;
                }

                .dashboard-page .attendance-count .count-item strong {
                    color: #1c1830;
                }

                .dashboard-page .attendance-count .count-item.present strong {
                    color: #3c6b2e;
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
                        min-width: 600px;
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

                    .dashboard-page td code {
                        max-width: 120px;
                        font-size: 11px;
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

                    .dashboard-page td code {
                        max-width: 80px;
                        font-size: 10px;
                        padding: 2px 8px;
                    }

                    .dashboard-page .attendance-count {
                        gap: 10px;
                    }

                    .dashboard-page .attendance-count .count-item {
                        font-size: 11px;
                        padding: 3px 10px;
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
                        title="Attendance"
                        description="Mark participants present using their registration ID."
                    />
                </div>

                <div className="toolbar">
                    <select 
                        value={selected} 
                        onChange={e => choose(e.target.value)}
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
                            <strong>{attendance.length}</strong> attended out of <strong>{regs.length}</strong> registered
                        </span>
                    )}
                </div>

                <div className="table-card">
                    <table>
                        <thead>
                            <tr>
                                <th>Participant</th>
                                <th>Registration ID</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {regs.map(r => (
                                <tr key={r._id} className={attended.has(r.student?._id) ? 'attended-row' : ''}>
                                    <td>
                                        <strong>{r.student?.name}</strong>
                                        <small>{r.student?.email}</small>
                                    </td>
                                    <td>
                                        <code>{r._id}</code>
                                    </td>
                                    <td>
                                        {attended.has(r.student?._id) ? (
                                            <span className="status status-approved">attended</span>
                                        ) : (
                                            <span className="status status-pending">not marked</span>
                                        )}
                                    </td>
                                    <td>
                                        {attended.has(r.student?._id) ? (
                                            <button className="btn btn-success" disabled>
                                                Marked
                                            </button>
                                        ) : (
                                            <button 
                                                className="btn btn-primary" 
                                                disabled={busy === r._id} 
                                                onClick={() => mark(r._id)}
                                            >
                                                {busy === r._id ? (
                                                    <>
                                                        <span className="spinner" />
                                                        Marking…
                                                    </>
                                                ) : (
                                                    "Mark present"
                                                )}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!regs.length && (
                        <div className="empty-state">
                            No confirmed registrations for this event.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}