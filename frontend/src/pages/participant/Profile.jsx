import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Loader from "../../components/common/Loader";
import api from "../../services/api";
import { errorMessage } from "../../utils/helpers";

export default function Profile() {
    const [form, setForm] = useState({
        name: "",
        contact: "",
        department: "",
        enrollmentNo: "",
        email: "",
        role: ""
    });
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        api.get("/users/profile")
            .then(d => setForm({
                ...d.user,
                email: d.user.email,
                role: d.user.role
            }))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, []);

    const save = async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
            const d = await api.put("/users/profile", {
                name: form.name,
                contact: form.contact,
                department: form.department,
                enrollmentNo: form.enrollmentNo
            });
            setForm(p => ({ ...p, ...d.user }));
            alert(d.message)
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
                    from { opacity: 0; transform: translateX(-12px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
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
                    max-width: 780px;
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

                .dashboard-page .panel .form-header .avatar {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #1c1830, #2c2648);
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 22px;
                    font-weight: 600;
                    font-family: 'Inter', sans-serif;
                    flex-shrink: 0;
                    box-shadow: 0 4px 12px rgba(28,24,48,0.2);
                    transition: all 0.3s ease;
                }

                .dashboard-page .panel .form-header .avatar:hover {
                    transform: scale(1.05) rotate(-3deg);
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

                .dashboard-page .panel .form-header .role-badge {
                    font-size: 11px;
                    font-weight: 500;
                    color: #ffffff;
                    background: #e29a4d;
                    padding: 4px 14px;
                    border-radius: 12px;
                    white-space: nowrap;
                    text-transform: capitalize;
                }

                .dashboard-page .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 18px 24px;
                }

                .dashboard-page .form-grid label {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #1c1830;
                    animation: slideIn 0.4s ease both;
                }

                .dashboard-page .form-grid label:nth-child(1) { animation-delay: 0.10s; }
                .dashboard-page .form-grid label:nth-child(2) { animation-delay: 0.14s; }
                .dashboard-page .form-grid label:nth-child(3) { animation-delay: 0.18s; }
                .dashboard-page .form-grid label:nth-child(4) { animation-delay: 0.22s; }
                .dashboard-page .form-grid label:nth-child(5) { animation-delay: 0.26s; }
                .dashboard-page .form-grid label:nth-child(6) { animation-delay: 0.30s; }

                .dashboard-page .form-grid label .required {
                    color: #b33a2e;
                    margin-left: 2px;
                }

                .dashboard-page .form-grid label .field-hint {
                    font-size: 11px;
                    font-weight: 400;
                    color: #b5b0a4;
                    margin-top: 1px;
                }

                .dashboard-page .form-grid input {
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

                .dashboard-page .form-grid input::placeholder {
                    color: #b5b0a4;
                }

                .dashboard-page .form-grid input:focus {
                    outline: none;
                    border-color: #e29a4d;
                    box-shadow: 0 0 0 4px rgba(226,154,77,0.12);
                }

                .dashboard-page .form-grid input:hover:not(:disabled) {
                    border-color: #d0cbbc;
                }

                .dashboard-page .form-grid input:disabled {
                    background: #f7f6f2;
                    color: #8a8676;
                    cursor: not-allowed;
                }

                .dashboard-page .form-grid .full {
                    grid-column: 1 / -1;
                    display: flex;
                    gap: 12px;
                    margin-top: 6px;
                    padding-top: 18px;
                    border-top: 1px solid #f0eee4;
                    animation: slideIn 0.4s ease both;
                    animation-delay: 0.34s;
                }

                .dashboard-page .form-grid .btn {
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

                .dashboard-page .form-grid .btn-primary {
                    background: #1c1830;
                    color: #ffffff;
                    border-color: #1c1830;
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                }

                .dashboard-page .form-grid .btn-primary::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
                    transform: translateX(-100%);
                    transition: transform 0.6s;
                }

                .dashboard-page .form-grid .btn-primary:hover:not(:disabled)::after {
                    transform: translateX(100%);
                }

                .dashboard-page .form-grid .btn-primary:hover:not(:disabled) {
                    background: #2c2648;
                    border-color: #2c2648;
                    transform: translateY(-3px) scale(1.01);
                    box-shadow: 0 8px 30px rgba(28,24,48,0.3);
                }

                .dashboard-page .form-grid .btn-primary:active:not(:disabled) {
                    transform: translateY(0px) scale(0.97);
                }

                .dashboard-page .form-grid .btn-primary:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none !important;
                }

                .dashboard-page .form-grid .btn .spinner {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: #ffffff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                    vertical-align: middle;
                }

                .dashboard-page .form-grid .btn .icon {
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

                    .dashboard-page .form-grid {
                        grid-template-columns: 1fr;
                        gap: 14px;
                    }

                    .dashboard-page .form-grid .full {
                        grid-column: 1;
                    }

                    .dashboard-page .panel .form-header {
                        flex-wrap: wrap;
                        gap: 10px;
                    }

                    .dashboard-page .panel .form-header .avatar {
                        width: 44px;
                        height: 44px;
                        font-size: 18px;
                    }

                    .dashboard-page .panel .form-header .role-badge {
                        font-size: 10px;
                        padding: 3px 10px;
                    }

                    .dashboard-page .form-grid .btn {
                        font-size: 12px;
                        padding: 10px 20px;
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

                    .dashboard-page .form-grid input {
                        font-size: 12.5px;
                        padding: 9px 14px;
                    }

                    .dashboard-page .panel .form-header .info h4 {
                        font-size: 14px;
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
                    .dashboard-page .form-grid .btn-primary::after {
                        display: none !important;
                    }
                }
            `}</style>

            <div className="container">
                <div className="dash-header-wrap">
                    <DashboardHeader
                        eyebrow="ACCOUNT"
                        title="Profile"
                        description="Keep your personal information up to date."
                    />
                </div>

                <div className="panel form-panel">
                    <div className="form-header">
                        <div className="avatar">
                            {form.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div className="info">
                            <h4>{form.name || "Your name"}</h4>
                            <p>{form.email}</p>
                        </div>
                        <span className="role-badge">{form.role || "User"}</span>
                    </div>

                    <form className="form-grid" onSubmit={save}>
                        <label>
                            Full name
                            <span className="required">*</span>
                            <span className="field-hint">How you want to be addressed</span>
                            <input 
                                required 
                                value={form.name} 
                                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                placeholder="Enter your full name"
                            />
                        </label>

                        <label>
                            Email address
                            <span className="field-hint">Cannot be changed</span>
                            <input 
                                disabled 
                                value={form.email}
                            />
                        </label>

                        <label>
                            Contact number
                            <span className="field-hint">For event updates</span>
                            <input 
                                value={form.contact || ""} 
                                onChange={e => setForm(p => ({ ...p, contact: e.target.value }))}
                                placeholder="Enter your phone number"
                            />
                        </label>

                        <label>
                            Department
                            <span className="field-hint">Your department or major</span>
                            <input 
                                value={form.department || ""} 
                                onChange={e => setForm(p => ({ ...p, department: e.target.value }))}
                                placeholder="e.g. Computer Science"
                            />
                        </label>

                        <label>
                            Enrollment number
                            <span className="field-hint">Your student ID</span>
                            <input 
                                value={form.enrollmentNo || ""} 
                                onChange={e => setForm(p => ({ ...p, enrollmentNo: e.target.value }))}
                                placeholder="Enter your enrollment number"
                            />
                        </label>

                        <label>
                            Role
                            <span className="field-hint">Your account type</span>
                            <input 
                                disabled 
                                value={form.role}
                            />
                        </label>

                        <div className="full">
                            <button className="btn btn-primary" disabled={busy}>
                                {busy ? (
                                    <>
                                        <span className="spinner" />
                                        Saving…
                                    </>
                                ) : (
                                    <>
                                        <span className="icon">💾</span>
                                        Save changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}