import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Loader from "../../components/common/Loader";
import { getMyCertificates, downloadCertificate } from "../../services/certificateService";
import { formatDate, errorMessage } from "../../utils/helpers";

export default function MyCertificates() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState("");

    useEffect(() => {
        getMyCertificates()
            .then(d => setItems(d.certificates || []))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, []);

    const download = async (id) => {
        setBusy(id);
        try {
            await downloadCertificate(id)
        } catch (e) {
            alert(errorMessage(e))
        } finally {
            setBusy("")
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

                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.92) rotateX(-3deg); }
                    to { opacity: 1; transform: scale(1) rotateX(0deg); }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                @keyframes borderGlow {
                    0%, 100% { border-color: #eae7dd; }
                    50% { border-color: #e29a4d; }
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

                .dashboard-page .certificate-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 24px;
                    margin-top: 28px;
                }

                .dashboard-page .certificate-grid > * {
                    animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                .dashboard-page .certificate-grid > *:nth-child(1) { animation-delay: 0.05s; }
                .dashboard-page .certificate-grid > *:nth-child(2) { animation-delay: 0.10s; }
                .dashboard-page .certificate-grid > *:nth-child(3) { animation-delay: 0.15s; }
                .dashboard-page .certificate-grid > *:nth-child(4) { animation-delay: 0.20s; }
                .dashboard-page .certificate-grid > *:nth-child(5) { animation-delay: 0.25s; }
                .dashboard-page .certificate-grid > *:nth-child(6) { animation-delay: 0.30s; }

                .dashboard-page .certificate-card {
                    background: #ffffff;
                    border: 1px solid #eae7dd;
                    border-radius: 16px;
                    padding: 24px 24px 22px;
                    display: flex;
                    align-items: flex-start;
                    gap: 18px;
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow: 0 1px 2px rgba(28,24,48,0.03), 0 8px 24px -16px rgba(28,24,48,0.08);
                    position: relative;
                    overflow: hidden;
                    cursor: default;
                }

                .dashboard-page .certificate-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #e29a4d, #e8b06a, #e29a4d);
                    background-size: 200% 100%;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }

                .dashboard-page .certificate-card:hover::before {
                    opacity: 1;
                    animation: shimmer 2s linear infinite;
                }

                .dashboard-page .certificate-card:hover {
                    transform: translateY(-8px) scale(1.01);
                    box-shadow: 0 20px 60px rgba(28,24,48,0.12), 0 8px 24px rgba(28,24,48,0.06);
                    border-color: #d6d0bf;
                }

                .dashboard-page .certificate-card:active {
                    transform: translateY(-2px) scale(0.98);
                    transition-duration: 0.1s;
                }

                .dashboard-page .certificate-card .certificate-mark {
                    width: 56px;
                    height: 56px;
                    min-width: 56px;
                    border-radius: 14px;
                    background: linear-gradient(135deg, #e29a4d, #d48a3a);
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Fraunces', serif;
                    font-size: 22px;
                    font-weight: 600;
                    letter-spacing: 0.02em;
                    box-shadow: 0 4px 12px rgba(226,154,77,0.25);
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .dashboard-page .certificate-card:hover .certificate-mark {
                    transform: scale(1.05) rotate(-3deg);
                    box-shadow: 0 8px 24px rgba(226,154,77,0.35);
                }

                .dashboard-page .certificate-card > div:last-child {
                    flex: 1;
                    min-width: 0;
                }

                .dashboard-page .certificate-card > div:last-child > span {
                    font-size: 11.5px;
                    font-weight: 500;
                    color: #8a8676;
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                    display: block;
                    margin-bottom: 6px;
                }

                .dashboard-page .certificate-card h3 {
                    font-family: 'Inter', sans-serif;
                    font-size: 16px;
                    font-weight: 600;
                    color: #1c1830;
                    margin: 0 0 4px 0;
                    letter-spacing: -0.01em;
                    line-height: 1.3;
                }

                .dashboard-page .certificate-card p {
                    font-size: 13px;
                    color: #8a8676;
                    margin: 0 0 14px 0;
                    line-height: 1.4;
                }

                .dashboard-page .certificate-card .btn {
                    font-family: 'Inter', sans-serif;
                    font-size: 12px;
                    font-weight: 600;
                    padding: 7px 20px;
                    border-radius: 8px;
                    border: 1px solid transparent;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                }

                .dashboard-page .certificate-card .btn-primary {
                    background: #1c1830;
                    color: #ffffff;
                    border-color: #1c1830;
                    position: relative;
                    overflow: hidden;
                }

                .dashboard-page .certificate-card .btn-primary::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    transform: translateX(-100%);
                    transition: transform 0.6s;
                }

                .dashboard-page .certificate-card .btn-primary:hover:not(:disabled)::after {
                    transform: translateX(100%);
                }

                .dashboard-page .certificate-card .btn-primary:hover:not(:disabled) {
                    background: #2c2648;
                    border-color: #2c2648;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(28,24,48,0.25);
                }

                .dashboard-page .certificate-card .btn-primary:active:not(:disabled) {
                    transform: translateY(0px) scale(0.97);
                }

                .dashboard-page .certificate-card .btn-primary:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none !important;
                }

                .dashboard-page .certificate-card .btn .spinner {
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: #ffffff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                    vertical-align: middle;
                }

                .dashboard-page .certificate-card .btn .icon {
                    font-size: 14px;
                }

                .dashboard-page .certificate-card .btn-success {
                    background: #e8f0e6;
                    color: #3c6b2e;
                    border-color: #d4e6cc;
                    cursor: default;
                    pointer-events: none;
                }

                .dashboard-page .certificate-card .btn-success::before {
                    content: "✓";
                    font-weight: 700;
                    margin-right: 4px;
                }

                .dashboard-page .certificate-card .badge {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    font-size: 10px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    color: #3c6b2e;
                    background: #e8f0e6;
                    padding: 2px 12px;
                    border-radius: 12px;
                    border: 1px solid #d4e6cc;
                }

                .dashboard-page .empty-state {
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 72px 32px;
                    background: #ffffff;
                    border: 1px solid #eae7dd;
                    border-radius: 16px;
                    font-size: 14px;
                    color: #8a8676;
                    line-height: 1.7;
                    animation: fadeInUp 0.5s ease both;
                    transition: all 0.3s ease;
                }

                .dashboard-page .empty-state:hover {
                    border-color: #d6d0bf;
                    box-shadow: 0 4px 20px rgba(28,24,48,0.04);
                }

                .dashboard-page .empty-state::before {
                    content: "📜";
                    display: block;
                    font-size: 48px;
                    margin-bottom: 16px;
                    opacity: 0.4;
                    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .dashboard-page .empty-state:hover::before {
                    transform: scale(1.1) rotate(-5deg);
                }

                @media (max-width: 820px) {
                    .dashboard-page {
                        padding: 28px 16px 48px;
                    }

                    .dashboard-page .certificate-grid {
                        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                        gap: 18px;
                    }

                    .dashboard-page .certificate-card:hover {
                        transform: translateY(-4px) scale(1.005);
                    }
                }

                @media (max-width: 480px) {
                    .dashboard-page {
                        padding: 20px 12px 36px;
                    }

                    .dashboard-page .certificate-grid {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }

                    .dashboard-page .certificate-card {
                        padding: 18px 18px 16px;
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                    }

                    .dashboard-page .certificate-card .certificate-mark {
                        width: 48px;
                        height: 48px;
                        min-width: 48px;
                        font-size: 18px;
                    }

                    .dashboard-page .certificate-card h3 {
                        font-size: 14px;
                    }

                    .dashboard-page .certificate-card .btn {
                        font-size: 11px;
                        padding: 6px 16px;
                    }

                    .dashboard-page .certificate-card .badge {
                        position: static;
                        display: inline-block;
                        margin-bottom: 8px;
                        font-size: 9px;
                    }

                    .dashboard-page .empty-state {
                        padding: 40px 20px;
                        font-size: 13px;
                    }

                    .dashboard-page .empty-state::before {
                        font-size: 36px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .dashboard-page * {
                        animation: none !important;
                        transition: none !important;
                    }
                    .dashboard-page .certificate-card::before {
                        display: none !important;
                    }
                    .dashboard-page .certificate-card .btn-primary::after {
                        display: none !important;
                    }
                }
            `}</style>

            <div className="container">
                <div className="dash-header-wrap">
                    <DashboardHeader
                        eyebrow="PARTICIPANT"
                        title="My certificates"
                        description="Download certificates issued for your attended events."
                    />
                </div>

                {loading ? (
                    <Loader />
                ) : (
                    <div className="certificate-grid">
                        {items.map(c => (
                            <div className="certificate-card" key={c._id}>
                                <div className="certificate-mark">ES</div>
                                <div>
                                    <span>{formatDate(c.issuedAt)}</span>
                                    <h3>{c.event?.title}</h3>
                                    <p>{c.event?.category} · {c.event?.venue}</p>
                                    <button 
                                        className="btn btn-primary btn-sm" 
                                        onClick={() => download(c._id)}
                                        disabled={busy === c._id}
                                    >
                                        {busy === c._id ? (
                                            <>
                                                <span className="spinner" />
                                                Preparing…
                                            </>
                                        ) : (
                                            <>
                                                <span className="icon">📄</span>
                                                Download PDF
                                            </>
                                        )}
                                    </button>
                                </div>
                                <span className="badge">✓ Verified</span>
                            </div>
                        ))}

                        {!items.length && (
                            <div className="empty-state">
                                No certificates have been issued yet.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}