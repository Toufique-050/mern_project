import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import EventForm from "../../components/events/EventForm";
import { createEvent } from "../../services/eventService";
import { errorMessage } from "../../utils/helpers";

export default function CreateEvent() {
    const nav = useNavigate();
    const [busy, setBusy] = useState(false);

    const submit = async (data) => {
        setBusy(true);
        try {
            const d = await createEvent(data);
            alert(d.message);
            nav("/organizer/events")
        } catch (e) {
            alert(errorMessage(e))
        } finally {
            setBusy(false)
        }
    };

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

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-4px); }
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
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
                    padding: 36px 40px;
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
                    gap: 14px;
                    margin-bottom: 24px;
                    padding-bottom: 18px;
                    border-bottom: 1px solid #f0eee4;
                }

                .dashboard-page .panel .form-header .icon-wrapper {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    background: #fdf6ed;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                }

                .dashboard-page .panel .form-header .icon-wrapper:hover {
                    transform: scale(1.05) rotate(-5deg);
                }

                .dashboard-page .panel .form-header .info {
                    flex: 1;
                }

                .dashboard-page .panel .form-header .info h4 {
                    font-family: 'Inter', sans-serif;
                    font-size: 16px;
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
                    color: #ffffff;
                    background: #e29a4d;
                    padding: 4px 14px;
                    border-radius: 12px;
                    white-space: nowrap;
                    animation: float 2s ease-in-out infinite;
                }

                .dashboard-page .panel .form-header .badge .plus {
                    font-weight: 700;
                    margin-right: 4px;
                }

                .dashboard-page .panel .form-panel {
                    padding: 0;
                }

                .dashboard-page .panel .form-panel > * {
                    animation: slideIn 0.4s ease both;
                    animation-delay: 0.15s;
                }

                .dashboard-page .panel .info-banner {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px 20px;
                    background: #f8f6f0;
                    border: 1px solid #ece8de;
                    border-radius: 10px;
                    margin-bottom: 22px;
                    transition: all 0.3s ease;
                }

                .dashboard-page .panel .info-banner:hover {
                    border-color: #ddd8cb;
                    background: #faf8f4;
                }

                .dashboard-page .panel .info-banner .banner-icon {
                    font-size: 22px;
                    flex-shrink: 0;
                }

                .dashboard-page .panel .info-banner .banner-text {
                    font-size: 13px;
                    color: #6a665a;
                    line-height: 1.5;
                }

                .dashboard-page .panel .info-banner .banner-text strong {
                    color: #1c1830;
                    font-weight: 600;
                }

                .dashboard-page .panel .info-banner .banner-text .highlight {
                    color: #e29a4d;
                    font-weight: 600;
                }

                /* Override EventForm styles */
                .dashboard-page .panel .form-panel form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .dashboard-page .panel .form-panel label {
                    font-size: 13px;
                    font-weight: 500;
                    color: #1c1830;
                    display: block;
                    margin-bottom: 5px;
                }

                .dashboard-page .panel .form-panel label .required {
                    color: #b33a2e;
                    margin-left: 2px;
                }

                .dashboard-page .panel .form-panel input,
                .dashboard-page .panel .form-panel select,
                .dashboard-page .panel .form-panel textarea {
                    font-family: 'Inter', sans-serif;
                    font-size: 13.5px;
                    padding: 11px 16px;
                    border: 1px solid #e0ddd4;
                    border-radius: 8px;
                    background: #ffffff;
                    color: #1c1830;
                    transition: all 0.25s ease;
                    width: 100%;
                    box-sizing: border-box;
                }

                .dashboard-page .panel .form-panel input::placeholder,
                .dashboard-page .panel .form-panel textarea::placeholder {
                    color: #b5b0a4;
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

                .dashboard-page .panel .form-panel .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }

                .dashboard-page .panel .form-actions {
                    display: flex;
                    gap: 12px;
                    margin-top: 10px;
                    padding-top: 20px;
                    border-top: 1px solid #f0eee4;
                }

                .dashboard-page .panel .form-actions .btn {
                    font-family: 'Inter', sans-serif;
                    font-size: 13px;
                    font-weight: 600;
                    padding: 11px 32px;
                    border-radius: 8px;
                    border: 1px solid transparent;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }

                .dashboard-page .panel .form-actions .btn-primary {
                    background: #1c1830;
                    color: #ffffff;
                    border-color: #1c1830;
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                }

                .dashboard-page .panel .form-actions .btn-primary::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
                    transform: translateX(-100%);
                    transition: transform 0.6s;
                }

                .dashboard-page .panel .form-actions .btn-primary:hover:not(:disabled)::after {
                    transform: translateX(100%);
                }

                .dashboard-page .panel .form-actions .btn-primary:hover:not(:disabled) {
                    background: #2c2648;
                    border-color: #2c2648;
                    transform: translateY(-3px) scale(1.01);
                    box-shadow: 0 8px 30px rgba(28,24,48,0.3);
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

                .dashboard-page .panel .form-actions .btn .icon {
                    font-size: 16px;
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
                        gap: 10px;
                    }

                    .dashboard-page .panel .form-header .icon-wrapper {
                        width: 40px;
                        height: 40px;
                        font-size: 20px;
                    }

                    .dashboard-page .panel .form-header .badge {
                        font-size: 10px;
                        padding: 3px 10px;
                    }

                    .dashboard-page .panel .form-panel .form-row {
                        grid-template-columns: 1fr;
                        gap: 12px;
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

                    .dashboard-page .panel .info-banner {
                        padding: 12px 16px;
                        flex-wrap: wrap;
                    }

                    .dashboard-page .panel .info-banner .banner-text {
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
                    .dashboard-page .panel .form-header .badge {
                        animation: none !important;
                    }
                    .dashboard-page .panel .form-actions .btn-primary::after {
                        display: none !important;
                    }
                }
            `}</style>

            <div className="container">
                <div className="dash-header-wrap">
                    <DashboardHeader
                        eyebrow="ORGANIZER"
                        title="Create an event"
                        description="New organizer events are sent to an admin for approval."
                    />
                </div>

                <div className="panel form-panel">
                    <div className="form-header">
                        <div className="icon-wrapper">
                            🎯
                        </div>
                        <div className="info">
                            <h4>New Event</h4>
                            <p>Fill in the details to create your event</p>
                        </div>
                        <span className="badge">
                            <span className="plus">+</span> New
                        </span>
                    </div>

                    <div className="info-banner">
                        <span className="banner-icon">📌</span>
                        <span className="banner-text">
                            <strong>Tip:</strong> Provide detailed information about your event. 
                            Once submitted, an admin will review and <span className="highlight">approve</span> it.
                        </span>
                    </div>

                    <EventForm
                        onSubmit={submit}
                        submitting={busy}
                    />
                </div>
            </div>
        </main>
    );
}