import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import EventForm from "../../components/events/EventForm";
import Loader from "../../components/common/Loader";
import { getEventById, updateEvent } from "../../services/eventService";
import { errorMessage } from "../../utils/helpers";

export default function EditEvent() {
    const { id } = useParams();
    const nav = useNavigate();
    const [event, setEvent] = useState(null);
    const [busy, setBusy] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEventById(id)
            .then(d => setEvent(d.event))
            .catch(e => alert(errorMessage(e)))
            .finally(() => setLoading(false))
    }, [id]);

    const submit = async (data) => {
        setBusy(true);
        try {
            const d = await updateEvent(id, data);
            alert(d.message);
            nav("/organizer/events")
        } catch (e) {
            alert(errorMessage(e))
        } finally {
            setBusy(false)
        }
    };

    if (loading) return <Loader />;

    return (
        <main className="dashboard-page">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@400;500;600;700&display=swap');

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-16px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.6; }
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
                    max-width: 820px;
                    margin: 0 auto;
                }

                .dashboard-page .dash-header-wrap {
                    animation: fadeInUp 0.5s ease both;
                }

                .dashboard-page .panel {
                    margin-top: 28px;
                    background: #ffffff;
                    border: 1px solid #eae7dd;
                    border-radius: 18px;
                    padding: 32px 36px;
                    box-shadow: 0 1px 2px rgba(28,24,48,0.03), 0 16px 40px -20px rgba(28,24,48,0.14);
                    animation: fadeInUp 0.5s ease both;
                    animation-delay: 0.08s;
                    position: relative;
                    overflow: hidden;
                }

                .dashboard-page .panel::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #e29a4d, #e8b06a, #e29a4d);
                    background-size: 200% 100%;
                    animation: shimmer 3s linear infinite;
                }

                .dashboard-page .panel .form-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 24px;
                    padding-bottom: 18px;
                    border-bottom: 1px solid #f0eee4;
                }

                .dashboard-page .panel .form-header .icon {
                    font-size: 28px;
                    opacity: 0.6;
                }

                .dashboard-page .panel .form-header .info {
                    flex: 1;
                }

                .dashboard-page .panel .form-header .info h4 {
                    font-family: 'Inter', sans-serif;
                    font-size: 15px;
                    font-weight: 600;
                    color: #1c1830;
                    margin: 0 0 2px 0;
                    letter-spacing: -0.01em;
                }

                .dashboard-page .panel .form-header .info p {
                    font-size: 12.5px;
                    color: #8a8676;
                    margin: 0;
                }

                .dashboard-page .panel .form-header .badge {
                    font-size: 11px;
                    font-weight: 500;
                    color: #8a8676;
                    background: #f7f6f2;
                    padding: 4px 14px;
                    border-radius: 12px;
                    border: 1px solid #f0eee4;
                    white-space: nowrap;
                }

                .dashboard-page .panel .form-header .badge .dot {
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #e29a4d;
                    margin-right: 6px;
                    animation: pulse 1.5s ease-in-out infinite;
                }

                .dashboard-page .panel .form-panel {
                    padding: 0;
                }

                .dashboard-page .panel .form-panel > * {
                    animation: slideIn 0.4s ease both;
                    animation-delay: 0.15s;
                }

                .dashboard-page .panel .event-status-banner {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 18px;
                    background: #fdf6ed;
                    border: 1px solid #f5e8d0;
                    border-radius: 10px;
                    margin-bottom: 22px;
                }

                .dashboard-page .panel .event-status-banner .status-icon {
                    font-size: 20px;
                }

                .dashboard-page .panel .event-status-banner .status-text {
                    font-size: 13px;
                    color: #7a6a4a;
                    font-weight: 500;
                }

                .dashboard-page .panel .event-status-banner .status-text strong {
                    color: #1c1830;
                    font-weight: 600;
                    text-transform: capitalize;
                }

                .dashboard-page .panel .event-status-banner .status-text .highlight {
                    color: #e29a4d;
                    font-weight: 600;
                }

                /* Override EventForm styles for better integration */
                .dashboard-page .panel .form-panel form {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                }

                .dashboard-page .panel .form-panel label {
                    font-size: 13px;
                    font-weight: 500;
                    color: #1c1830;
                    display: block;
                    margin-bottom: 4px;
                }

                .dashboard-page .panel .form-panel input,
                .dashboard-page .panel .form-panel select,
                .dashboard-page .panel .form-panel textarea {
                    font-family: 'Inter', sans-serif;
                    font-size: 13.5px;
                    padding: 10px 14px;
                    border: 1px solid #e0ddd4;
                    border-radius: 8px;
                    background: #ffffff;
                    color: #1c1830;
                    transition: all 0.25s ease;
                    width: 100%;
                    box-sizing: border-box;
                }

                .dashboard-page .panel .form-panel input:focus,
                .dashboard-page .panel .form-panel select:focus,
                .dashboard-page .panel .form-panel textarea:focus {
                    outline: none;
                    border-color: #e29a4d;
                    box-shadow: 0 0 0 4px rgba(226,154,77,0.12);
                }

                .dashboard-page .panel .form-panel input:hover,
                .dashboard-page .panel .form-panel select:hover,
                .dashboard-page .panel .form-panel textarea:hover {
                    border-color: #d0cbbc;
                }

                .dashboard-page .panel .form-panel textarea {
                    resize: vertical;
                    min-height: 80px;
                }

                .dashboard-page .panel .form-actions {
                    display: flex;
                    gap: 12px;
                    margin-top: 8px;
                    padding-top: 18px;
                    border-top: 1px solid #f0eee4;
                }

                .dashboard-page .panel .form-actions .btn {
                    font-family: 'Inter', sans-serif;
                    font-size: 13px;
                    font-weight: 600;
                    padding: 10px 28px;
                    border-radius: 8px;
                    border: 1px solid transparent;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                }

                .dashboard-page .panel .form-actions .btn-primary {
                    background: #1c1830;
                    color: #ffffff;
                    border-color: #1c1830;
                    flex: 1;
                    justify-content: center;
                }

                .dashboard-page .panel .form-actions .btn-primary:hover:not(:disabled) {
                    background: #2c2648;
                    border-color: #2c2648;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(28,24,48,0.25);
                }

                .dashboard-page .panel .form-actions .btn-primary:active:not(:disabled) {
                    transform: translateY(0px) scale(0.97);
                }

                .dashboard-page .panel .form-actions .btn-primary:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none !important;
                }

                .dashboard-page .panel .form-actions .btn-secondary {
                    background: #ffffff;
                    color: #1c1830;
                    border-color: #e0ddd4;
                }

                .dashboard-page .panel .form-actions .btn-secondary:hover {
                    background: #faf8f2;
                    border-color: #d0cbbc;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(28,24,48,0.06);
                }

                .dashboard-page .panel .form-actions .btn-secondary:active {
                    transform: translateY(0px) scale(0.97);
                }

                .dashboard-page .panel .form-actions .btn .spinner {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: #ffffff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                    vertical-align: middle;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                @media (max-width: 640px) {
                    .dashboard-page {
                        padding: 24px 16px 40px;
                    }

                    .dashboard-page .panel {
                        padding: 20px 18px;
                        border-radius: 14px;
                    }

                    .dashboard-page .panel .form-header {
                        flex-wrap: wrap;
                        gap: 8px;
                    }

                    .dashboard-page .panel .form-header .badge {
                        font-size: 10px;
                        padding: 3px 10px;
                    }

                    .dashboard-page .panel .form-actions {
                        flex-direction: column;
                    }

                    .dashboard-page .panel .form-actions .btn {
                        justify-content: center;
                        width: 100%;
                        padding: 10px 20px;
                        font-size: 12px;
                    }

                    .dashboard-page .panel .event-status-banner {
                        padding: 10px 14px;
                        font-size: 12px;
                    }
                }

                @media (max-width: 480px) {
                    .dashboard-page {
                        padding: 16px 10px 32px;
                    }

                    .dashboard-page .panel {
                        padding: 16px 14px;
                        border-radius: 12px;
                    }

                    .dashboard-page .panel .form-header .icon {
                        font-size: 22px;
                    }

                    .dashboard-page .panel .form-header .info h4 {
                        font-size: 14px;
                    }

                    .dashboard-page .panel .form-actions .btn {
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
                }
            `}</style>

            <div className="container">
                <div className="dash-header-wrap">
                    <DashboardHeader
                        eyebrow="ORGANIZER"
                        title="Edit event"
                        description="Changes made by an organizer return the event to pending approval."
                    />
                </div>

                <div className="panel form-panel">
                    <div className="form-header">
                        <span className="icon">✏️</span>
                        <div className="info">
                            <h4>Editing: {event?.title || "Event"}</h4>
                            <p>Update your event details below</p>
                        </div>
                        <span className="badge">
                            <span className="dot" />
                            {event?.status || "pending"}
                        </span>
                    </div>

                    {event && (
                        <div className="event-status-banner">
                            <span className="status-icon">ℹ️</span>
                            <span className="status-text">
                                Current status: <strong>{event.status}</strong>
                                {event.status !== "pending" && (
                                    <> · Editing will require <span className="highlight">re-approval</span></>
                                )}
                            </span>
                        </div>
                    )}

                    <EventForm
                        initialValues={event}
                        onSubmit={submit}
                        submitting={busy}
                    />
                </div>
            </div>
        </main>
    );
}