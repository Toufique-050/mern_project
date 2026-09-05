import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Loader from "../../components/common/Loader";
import FeedbackForm from "../../components/feedback/FeedbackForm";
import Rating from "../../components/feedback/Rating";
import { getMyFeedback, submitFeedback } from "../../services/feedbackService";
import { getMyRegistrations } from "../../services/registrationService";
import { formatDate, errorMessage } from "../../utils/helpers";

export default function MyFeedback() {
    const [feedback, setFeedback] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [selected, setSelected] = useState("");
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);

    const load = () => Promise.all([getMyFeedback(), getMyRegistrations()])
        .then(([f, r]) => {
            setFeedback(f.feedback || []);
            setRegistrations(r.registrations || [])
        })
        .catch(() => {})
        .finally(() => setLoading(false));

    useEffect(() => {
        load()
    }, []);

    const submit = async (data) => {
        setBusy(true);
        try {
            await submitFeedback(data);
            setSelected("");
            await load();
            alert("Feedback submitted successfully.")
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
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.92); }
                    to { opacity: 1; transform: scale(1); }
                }

                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(-16px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.03); }
                }

                .dashboard-page {
                    min-height: 100vh;
                    background: #f7f6f2;
                    font-family: 'Inter', sans-serif;
                    padding: 44px 24px 64px;
                }

                .dashboard-page .container {
                    max-width: 900px;
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

                .dashboard-page .btn-ghost {
                    background: transparent;
                    color: #8a8676;
                    border-color: #e0ddd4;
                    font-size: 12px;
                    padding: 6px 14px;
                    margin-bottom: 16px;
                }

                .dashboard-page .btn-ghost:hover {
                    background: #faf8f2;
                    border-color: #d0cbbc;
                    transform: translateX(-3px);
                }

                .dashboard-page .btn-ghost::before {
                    content: "← ";
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

                .dashboard-page .panel .form-title {
                    font-family: 'Inter', sans-serif;
                    font-size: 18px;
                    font-weight: 600;
                    color: #1c1830;
                    margin: 0 0 18px 0;
                    letter-spacing: -0.01em;
                }

                .dashboard-page .panel-head {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 16px;
                    margin-bottom: 10px;
                    padding-bottom: 12px;
                    border-bottom: 1px solid #f0eee4;
                }

                .dashboard-page .panel-head h3 {
                    font-family: 'Inter', sans-serif;
                    font-size: 15px;
                    font-weight: 600;
                    color: #1c1830;
                    margin: 0 0 4px 0;
                    letter-spacing: -0.01em;
                }

                .dashboard-page .panel-head span {
                    font-size: 12.5px;
                    color: #8a8676;
                }

                .dashboard-page .panel-head .rating-wrap {
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                .dashboard-page .panel p {
                    font-size: 13.5px;
                    color: #34321f;
                    line-height: 1.6;
                    margin: 0;
                    padding: 8px 14px;
                    background: #faf8f2;
                    border-radius: 8px;
                    border-left: 3px solid #e29a4d;
                }

                .dashboard-page .feedback-picker {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                    gap: 16px;
                    margin: 28px 0 32px;
                    animation: fadeInUp 0.5s ease both;
                    animation-delay: 0.06s;
                }

                .dashboard-page .feedback-picker .picker-card {
                    background: #ffffff;
                    border: 1px solid #eae7dd;
                    border-radius: 14px;
                    padding: 18px 20px;
                    text-align: left;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow: 0 1px 2px rgba(28,24,48,0.03);
                    font-family: 'Inter', sans-serif;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .dashboard-page .feedback-picker .picker-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #e29a4d, #e8b06a);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .dashboard-page .feedback-picker .picker-card:hover::before {
                    opacity: 1;
                }

                .dashboard-page .feedback-picker .picker-card:hover {
                    transform: translateY(-4px) scale(1.01);
                    box-shadow: 0 8px 30px rgba(28,24,48,0.08);
                    border-color: #d6d0bf;
                }

                .dashboard-page .feedback-picker .picker-card:active {
                    transform: translateY(0px) scale(0.98);
                }

                .dashboard-page .feedback-picker .picker-card strong {
                    font-size: 14px;
                    font-weight: 600;
                    color: #1c1830;
                    letter-spacing: -0.01em;
                }

                .dashboard-page .feedback-picker .picker-card span {
                    font-size: 12.5px;
                    color: #8a8676;
                }

                .dashboard-page .feedback-picker .picker-card small {
                    font-size: 11.5px;
                    color: #e29a4d;
                    font-weight: 600;
                    margin-top: 4px;
                    transition: all 0.3s ease;
                }

                .dashboard-page .feedback-picker .picker-card:hover small {
                    transform: translateX(4px);
                }

                .dashboard-page .feedback-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    animation: fadeInUp 0.5s ease both;
                    animation-delay: 0.10s;
                }

                .dashboard-page .feedback-list .panel {
                    animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                .dashboard-page .feedback-list .panel:nth-child(1) { animation-delay: 0.05s; }
                .dashboard-page .feedback-list .panel:nth-child(2) { animation-delay: 0.10s; }
                .dashboard-page .feedback-list .panel:nth-child(3) { animation-delay: 0.15s; }
                .dashboard-page .feedback-list .panel:nth-child(4) { animation-delay: 0.20s; }
                .dashboard-page .feedback-list .panel:nth-child(5) { animation-delay: 0.25s; }

                .dashboard-page .feedback-list .panel:hover {
                    border-color: #d6d0bf;
                    box-shadow: 0 4px 20px rgba(28,24,48,0.06);
                }

                .dashboard-page .empty-state {
                    text-align: center;
                    padding: 56px 32px;
                    font-size: 14px;
                    color: #8a8676;
                    line-height: 1.7;
                    background: #ffffff;
                    border: 1px solid #eae7dd;
                    border-radius: 16px;
                    animation: fadeInUp 0.5s ease both;
                    transition: all 0.3s ease;
                }

                .dashboard-page .empty-state:hover {
                    border-color: #d6d0bf;
                    box-shadow: 0 4px 20px rgba(28,24,48,0.04);
                }

                .dashboard-page .empty-state::before {
                    content: "💬";
                    display: block;
                    font-size: 40px;
                    margin-bottom: 14px;
                    opacity: 0.4;
                }

                .dashboard-page .feedback-picker-empty {
                    text-align: center;
                    padding: 40px 20px;
                    font-size: 13.5px;
                    color: #8a8676;
                    background: #ffffff;
                    border: 1px solid #eae7dd;
                    border-radius: 14px;
                    animation: fadeInUp 0.5s ease both;
                    margin: 28px 0 32px;
                }

                .dashboard-page .feedback-picker-empty::before {
                    content: "🎯";
                    display: block;
                    font-size: 32px;
                    margin-bottom: 10px;
                    opacity: 0.4;
                }

                @media (max-width: 640px) {
                    .dashboard-page {
                        padding: 24px 16px 40px;
                    }

                    .dashboard-page .panel {
                        padding: 18px 18px;
                        border-radius: 14px;
                    }

                    .dashboard-page .panel-head {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .dashboard-page .panel-head .rating-wrap {
                        align-self: flex-start;
                    }

                    .dashboard-page .feedback-picker {
                        grid-template-columns: 1fr;
                    }

                    .dashboard-page .feedback-picker .picker-card {
                        padding: 14px 16px;
                    }
                }

                @media (max-width: 480px) {
                    .dashboard-page {
                        padding: 16px 10px 32px;
                    }

                    .dashboard-page .panel {
                        padding: 14px 14px;
                        border-radius: 12px;
                    }

                    .dashboard-page .panel-head h3 {
                        font-size: 14px;
                    }

                    .dashboard-page .panel p {
                        font-size: 12.5px;
                        padding: 6px 12px;
                    }

                    .dashboard-page .empty-state {
                        padding: 32px 16px;
                        font-size: 13px;
                    }

                    .dashboard-page .empty-state::before {
                        font-size: 32px;
                    }

                    .dashboard-page .feedback-picker-empty {
                        padding: 28px 16px;
                        font-size: 12.5px;
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
                    .dashboard-page .feedback-picker .picker-card::before {
                        display: none !important;
                    }
                }
            `}</style>

            <div className="container">
                <div className="dash-header-wrap">
                    <DashboardHeader
                        eyebrow="PARTICIPANT"
                        title="My feedback"
                        description="Feedback becomes available after your attendance is marked."
                    />
                </div>

                {selected ? (
                    <div className="panel">
                        <button className="btn btn-ghost" onClick={() => setSelected("")}>
                            Back
                        </button>
                        <h3 className="form-title">Rate your event</h3>
                        <FeedbackForm 
                            eventId={selected} 
                            onSubmit={submit} 
                            submitting={busy}
                        />
                    </div>
                ) : (
                    <>
                        {registrations.filter(r => r.status === "confirmed").length > 0 ? (
                            <div className="feedback-picker">
                                {registrations.filter(r => r.status === "confirmed").map(r => (
                                    <button 
                                        key={r._id} 
                                        className="picker-card" 
                                        onClick={() => setSelected(r.event?._id)}
                                    >
                                        <strong>{r.event?.title}</strong>
                                        <span>{formatDate(r.event?.date)}</span>
                                        <small>Give feedback →</small>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="feedback-picker-empty">
                                No confirmed registrations to give feedback for.
                            </div>
                        )}

                        <div className="feedback-list">
                            {feedback.map(f => (
                                <div className="panel" key={f._id}>
                                    <div className="panel-head">
                                        <div>
                                            <h3>{f.event?.title}</h3>
                                            <span>{formatDate(f.createdAt)}</span>
                                        </div>
                                        <div className="rating-wrap">
                                            <Rating value={f.rating} readOnly />
                                        </div>
                                    </div>
                                    <p>{f.comment || "No written comment."}</p>
                                </div>
                            ))}
                            {!feedback.length && (
                                <div className="empty-state">
                                    You have not submitted any feedback yet.
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}