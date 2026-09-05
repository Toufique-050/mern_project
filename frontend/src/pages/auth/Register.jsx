import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { errorMessage } from "../../utils/helpers";

export default function Register() {
    const { register } = useAuth(), nav = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "", contact: "", department: "", enrollmentNo: "" }),
        [busy, setBusy] = useState(false), [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState({});
    
    const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
    
    const submit = async (e) => {
        e.preventDefault(); setBusy(true); setError("");
        try { await register(form); nav("/participant") }
        catch (e) { setError(errorMessage(e)) }
        finally { setBusy(false) }
    };

    const handleFocus = (field) => setFocused(prev => ({ ...prev, [field]: true }));
    const handleBlur = (field) => setFocused(prev => ({ ...prev, [field]: false }));

    return (
        <main className="es-auth-page">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700;800&display=swap');

                /* ===== ANIMATIONS ===== */
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(50px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(2deg); }
                }

                @keyframes floatSlow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes pulseGlow {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(1.3); }
                }

                @keyframes shimmerGold {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(-25px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
                    20%, 40%, 60%, 80% { transform: translateX(8px); }
                }

                @keyframes borderPulse {
                    0%, 100% { border-color: rgba(226,154,77,0.1); }
                    50% { border-color: rgba(226,154,77,0.3); }
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                @keyframes breathe {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                }

                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    25% { background-position: 100% 50%; }
                    50% { background-position: 100% 0%; }
                    75% { background-position: 0% 0%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* ===== PAGE ===== */
                .es-auth-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 24px;
                    font-family: 'Inter', sans-serif;
                    background: linear-gradient(160deg, #0f0d1a 0%, #1c1830 30%, #2c2648 60%, #1c1830 100%);
                    background-size: 400% 400%;
                    animation: gradientMove 20s ease-in-out infinite;
                    position: relative;
                    overflow: hidden;
                }

                .es-auth-page::before {
                    content: '';
                    position: absolute;
                    top: -30%;
                    right: -20%;
                    width: 700px;
                    height: 700px;
                    background: radial-gradient(circle, rgba(226,154,77,0.05) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: float 12s ease-in-out infinite;
                    pointer-events: none;
                }

                .es-auth-page::after {
                    content: '';
                    position: absolute;
                    bottom: -30%;
                    left: -20%;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(226,154,77,0.03) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: floatSlow 15s ease-in-out infinite 2s;
                    pointer-events: none;
                }

                .es-bg-shapes {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    animation: fadeInScale 2s ease both;
                }

                .es-bg-shapes circle {
                    animation: float 10s ease-in-out infinite;
                }

                .es-bg-shapes circle:nth-child(1) { animation-delay: 0s; }
                .es-bg-shapes circle:nth-child(2) { animation-delay: 1.5s; }
                .es-bg-shapes circle:nth-child(3) { animation-delay: 3s; }
                .es-bg-shapes circle:nth-child(4) { animation-delay: 0.8s; }

                .es-bg-shapes .glow-circle {
                    filter: blur(60px);
                    opacity: 0.1;
                }

                /* ===== TOPBAR ===== */
                .es-topbar {
                    position: absolute;
                    top: 36px;
                    left: 44px;
                    font-size: 16px;
                    font-weight: 700;
                    color: #f4f2ea;
                    letter-spacing: -0.01em;
                    z-index: 1;
                    animation: fadeInDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                    transition: transform 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .es-topbar:hover {
                    transform: scale(1.04);
                }

                .es-topbar .brand-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 28px;
                    height: 28px;
                    background: linear-gradient(135deg, #e29a4d, #d48a3a);
                    border-radius: 6px;
                    color: #ffffff;
                    font-size: 12px;
                    font-weight: 800;
                    box-shadow: 0 2px 12px rgba(226,154,77,0.2);
                    transition: transform 0.3s ease;
                }

                .es-topbar:hover .brand-icon {
                    transform: rotate(-8deg) scale(1.05);
                }

                .es-topbar span {
                    color: #e29a4d;
                    position: relative;
                }

                .es-topbar span::after {
                    content: '';
                    position: absolute;
                    bottom: 2px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #e29a4d, #f0c27a);
                    border-radius: 2px;
                    opacity: 0.5;
                }

                .es-topbar .brand-dot {
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    background: #e29a4d;
                    border-radius: 50%;
                    margin-left: 2px;
                    animation: pulseGlow 2s ease-in-out infinite;
                }

                /* ===== CARD ===== */
                .es-card {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                    max-width: 640px;
                    background: rgba(255, 255, 255, 0.96);
                    backdrop-filter: blur(24px);
                    border-radius: 24px;
                    padding: 44px 44px 36px;
                    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.35), 0 8px 32px rgba(0, 0, 0, 0.1);
                    animation: fadeInUp 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    animation: borderPulse 3s ease-in-out infinite;
                }

                .es-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #e29a4d, #f0c27a, #e8b06a, #f0c27a, #e29a4d);
                    background-size: 300% 100%;
                    border-radius: 24px 24px 0 0;
                    animation: shimmerGold 3s linear infinite;
                }

                .es-card .card-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 56px;
                    height: 56px;
                    border-radius: 14px;
                    background: rgba(226,154,77,0.08);
                    margin-bottom: 16px;
                    font-size: 28px;
                    animation: breathe 3s ease-in-out infinite;
                }

                .es-eyebrow {
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    color: #e29a4d;
                    margin: 0 0 8px;
                    animation: slideInRight 0.6s ease both 0.05s;
                }

                .es-card h1 {
                    font-family: 'Fraunces', serif;
                    font-weight: 600;
                    font-size: 28px;
                    color: #1c1830;
                    margin: 0 0 6px;
                    animation: slideInRight 0.6s ease both 0.1s;
                }

                .es-card .subtitle {
                    font-size: 13.5px;
                    color: #7a7871;
                    line-height: 1.5;
                    margin: 0 0 26px;
                    max-width: 460px;
                    animation: slideInRight 0.6s ease both 0.15s;
                }

                /* ===== ALERT ===== */
                .es-alert {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    background: #fdf1ee;
                    border: 1px solid #f4d3c8;
                    color: #b3491f;
                    font-size: 13px;
                    line-height: 1.5;
                    padding: 12px 16px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    animation: shake 0.6s ease both;
                    position: relative;
                    overflow: hidden;
                }

                .es-alert::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    width: 3px;
                    background: #b3491f;
                }

                .es-alert svg {
                    flex-shrink: 0;
                    margin-top: 1px;
                    animation: pulseGlow 1.5s ease-in-out infinite;
                }

                /* ===== FORM GRID ===== */
                .es-form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px 20px;
                }

                .es-field {
                    display: block;
                    animation: slideUp 0.6s ease both;
                }

                .es-field:nth-child(1) { animation-delay: 0.10s; }
                .es-field:nth-child(2) { animation-delay: 0.15s; }
                .es-field:nth-child(3) { animation-delay: 0.20s; }
                .es-field:nth-child(4) { animation-delay: 0.25s; }
                .es-field:nth-child(5) { animation-delay: 0.30s; }
                .es-field:nth-child(6) { animation-delay: 0.35s; }
                .es-field.es-full { animation-delay: 0.40s; }

                .es-field.es-full {
                    grid-column: 1 / -1;
                }

                .es-field-label {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 12.5px;
                    font-weight: 600;
                    color: #34321f;
                    margin-bottom: 7px;
                    transition: color 0.3s ease;
                }

                .es-field:focus-within .es-field-label {
                    color: #e29a4d;
                }

                .es-field-label .optional {
                    font-size: 10.5px;
                    font-weight: 400;
                    color: #b0ada2;
                    letter-spacing: 0.02em;
                }

                .es-field-label .required-star {
                    color: #b33a2e;
                    margin-left: 2px;
                }

                .es-input-wrap {
                    position: relative;
                    transition: all 0.3s ease;
                }

                .es-input-wrap .input-ripple {
                    position: absolute;
                    inset: 0;
                    border-radius: 9px;
                    background: rgba(226,154,77,0.05);
                    transform: scale(0);
                    opacity: 0;
                    transition: all 0.4s ease;
                    pointer-events: none;
                }

                .es-field:focus-within .es-input-wrap .input-ripple {
                    transform: scale(1);
                    opacity: 1;
                }

                .es-input-wrap .input-icon {
                    position: absolute;
                    left: 13px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #a8a495;
                    pointer-events: none;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    z-index: 1;
                    font-size: 14px;
                }

                .es-field:focus-within .es-input-wrap .input-icon {
                    color: #e29a4d;
                    transform: translateY(-50%) scale(1.15);
                }

                .es-field input {
                    width: 100%;
                    padding: 11px 12px 11px 38px;
                    font-size: 14px;
                    font-family: 'Inter', sans-serif;
                    border: 1px solid #e0ddd4;
                    border-radius: 9px;
                    background: #ffffff;
                    color: #1c1830;
                    box-sizing: border-box;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    position: relative;
                }

                .es-field input::placeholder {
                    color: #b0ada2;
                    transition: opacity 0.3s ease;
                }

                .es-field input:focus::placeholder {
                    opacity: 0.3;
                }

                .es-field input:focus {
                    outline: none;
                    border-color: #e29a4d;
                    box-shadow: 0 0 0 4px rgba(226, 154, 77, 0.12);
                    transform: translateY(-2px);
                }

                .es-field input:hover:not(:focus) {
                    border-color: #d0cbbc;
                }

                .es-field input:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .es-field input[type="password"] {
                    padding-right: 42px;
                }

                /* Password toggle */
                .es-pw-toggle {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    padding: 6px;
                    cursor: pointer;
                    color: #a8a495;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    border-radius: 8px;
                    z-index: 1;
                }

                .es-pw-toggle:hover {
                    color: #e29a4d;
                    background: rgba(226,154,77,0.06);
                    transform: translateY(-50%) scale(1.1);
                }

                .es-pw-toggle:active {
                    transform: translateY(-50%) scale(0.9);
                }

                .es-pw-toggle svg {
                    transition: transform 0.3s ease;
                }

                .es-pw-toggle:hover svg {
                    transform: rotate(10deg);
                }

                /* ===== SUBMIT BUTTON ===== */
                .es-submit {
                    width: 100%;
                    margin-top: 6px;
                    padding: 13px;
                    border: none;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #1c1830, #2c2648);
                    color: #fff;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    position: relative;
                    overflow: hidden;
                    grid-column: 1 / -1;
                }

                .es-submit::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
                    transform: translateX(-100%);
                    transition: transform 0.8s ease;
                }

                .es-submit:hover:not(:disabled)::before {
                    transform: translateX(100%);
                }

                .es-submit:hover:not(:disabled) {
                    background: linear-gradient(135deg, #2c2648, #1c1830);
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 12px 40px rgba(28,24,48,0.35);
                }

                .es-submit:active:not(:disabled) {
                    transform: translateY(0px) scale(0.97);
                    transition-duration: 0.1s;
                }

                .es-submit:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none !important;
                }

                .es-submit .spinner {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    border: 2px solid rgba(255,255,255,0.15);
                    border-top-color: #ffffff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                    vertical-align: middle;
                    margin-right: 10px;
                }

                .es-submit .btn-icon {
                    font-size: 16px;
                    transition: transform 0.3s ease;
                }

                .es-submit:hover:not(:disabled) .btn-icon {
                    transform: translateX(4px);
                }

                /* ===== DIVIDER ===== */
                .es-divider {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin: 22px 0 18px;
                    grid-column: 1 / -1;
                }

                .es-divider .line {
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #eae7dd, transparent);
                }

                .es-divider .dot {
                    width: 6px;
                    height: 6px;
                    background: #e29a4d;
                    border-radius: 50%;
                    opacity: 0.3;
                    animation: pulseGlow 2s ease-in-out infinite;
                }

                /* ===== SWITCH ===== */
                .es-switch {
                    text-align: center;
                    font-size: 13px;
                    color: #7a7871;
                    margin: 20px 0 0;
                    grid-column: 1 / -1;
                }

                .es-switch a {
                    color: #1c1830;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    position: relative;
                    display: inline-block;
                }

                .es-switch a::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #e29a4d, #f0c27a);
                    transition: width 0.3s ease;
                }

                .es-switch a:hover {
                    color: #e29a4d;
                }

                .es-switch a:hover::after {
                    width: 100%;
                }

                .es-switch .divider {
                    color: #e0ddd4;
                    margin: 0 4px;
                }

                /* ===== RESPONSIVE ===== */
                @media (max-width: 640px) {
                    .es-card {
                        padding: 28px 20px 24px;
                        border-radius: 18px;
                    }

                    .es-card h1 {
                        font-size: 24px;
                    }

                    .es-card .card-icon {
                        width: 44px;
                        height: 44px;
                        font-size: 22px;
                    }

                    .es-topbar {
                        top: 20px;
                        left: 20px;
                        font-size: 14px;
                    }

                    .es-topbar .brand-icon {
                        width: 24px;
                        height: 24px;
                        font-size: 10px;
                    }

                    .es-form-grid {
                        grid-template-columns: 1fr;
                        gap: 14px;
                    }

                    .es-submit {
                        padding: 11px;
                        font-size: 13px;
                    }

                    .es-field input {
                        padding: 10px 12px 10px 36px;
                        font-size: 13px;
                    }

                    .es-bg-shapes circle {
                        display: none;
                    }
                }

                @media (max-width: 380px) {
                    .es-card {
                        padding: 20px 14px 18px;
                    }

                    .es-card h1 {
                        font-size: 20px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation: none !important;
                        transition: none !important;
                    }
                    .es-submit::before {
                        display: none !important;
                    }
                }
            `}</style>

            {/* Background Shapes */}
            <svg className="es-bg-shapes" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
                <circle cx="1220" cy="140" r="180" stroke="#e29a4d" strokeOpacity="0.35" strokeWidth="1.5" />
                <circle cx="130" cy="760" r="150" stroke="#8f89b8" strokeOpacity="0.35" strokeWidth="1.5" />
                <circle cx="1300" cy="720" r="90" stroke="#e29a4d" strokeOpacity="0.3" strokeWidth="1.5" />
                <circle cx="80" cy="120" r="70" stroke="#8f89b8" strokeOpacity="0.3" strokeWidth="1.5" />
                <circle cx="720" cy="450" r="250" stroke="#e29a4d" strokeOpacity="0.04" strokeWidth="1" className="glow-circle" />
            </svg>

            {/* Top Bar */}
            <div className="es-topbar">
                <span className="brand-icon">ES</span>
                Event<span>Sphere</span>
                <span className="brand-dot" />
            </div>

            {/* Register Card */}
            <div className="es-card">
                <div className="card-icon">📝</div>
                <div className="es-eyebrow">✦ JOIN EVENTSPHERE</div>
                <h1>Create your account</h1>
                <p className="subtitle">
                    New registrations are created as participants. An administrator can change roles later.
                </p>

                {error && (
                    <div className="es-alert">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={submit} className="es-form-grid">
                    {/* Full Name */}
                    <label className="es-field">
                        <span className="es-field-label">
                            Full name <span className="required-star">*</span>
                        </span>
                        <div className="es-input-wrap">
                            <div className="input-ripple" />
                            <span className="input-icon">👤</span>
                            <input 
                                required 
                                value={form.name} 
                                onChange={e => set("name", e.target.value)} 
                                onFocus={() => handleFocus('name')}
                                onBlur={() => handleBlur('name')}
                                placeholder="Jane Doe" 
                            />
                        </div>
                    </label>

                    {/* Email */}
                    <label className="es-field">
                        <span className="es-field-label">
                            Email <span className="required-star">*</span>
                        </span>
                        <div className="es-input-wrap">
                            <div className="input-ripple" />
                            <span className="input-icon">✉️</span>
                            <input 
                                required 
                                type="email" 
                                value={form.email} 
                                onChange={e => set("email", e.target.value)}
                                onFocus={() => handleFocus('email')}
                                onBlur={() => handleBlur('email')}
                                placeholder="you@example.com" 
                            />
                        </div>
                    </label>

                    {/* Password */}
                    <label className="es-field">
                        <span className="es-field-label">
                            Password <span className="required-star">*</span>
                            <span className="optional">min. 6 chars</span>
                        </span>
                        <div className="es-input-wrap">
                            <div className="input-ripple" />
                            <span className="input-icon">🔒</span>
                            <input 
                                required 
                                minLength="6" 
                                type={showPassword ? "text" : "password"} 
                                value={form.password} 
                                onChange={e => set("password", e.target.value)}
                                onFocus={() => handleFocus('password')}
                                onBlur={() => handleBlur('password')}
                                placeholder="••••••••" 
                            />
                            <button
                                type="button"
                                className="es-pw-toggle"
                                onClick={() => setShowPassword(s => !s)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a18.6 18.6 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </label>

                    {/* Contact */}
                    <label className="es-field">
                        <span className="es-field-label">
                            Contact <span className="optional">(optional)</span>
                        </span>
                        <div className="es-input-wrap">
                            <div className="input-ripple" />
                            <span className="input-icon">📞</span>
                            <input 
                                value={form.contact} 
                                onChange={e => set("contact", e.target.value)}
                                onFocus={() => handleFocus('contact')}
                                onBlur={() => handleBlur('contact')}
                                placeholder="+1 234 567 890" 
                            />
                        </div>
                    </label>

                    {/* Department */}
                    <label className="es-field">
                        <span className="es-field-label">
                            Department <span className="optional">(optional)</span>
                        </span>
                        <div className="es-input-wrap">
                            <div className="input-ripple" />
                            <span className="input-icon">🏛️</span>
                            <input 
                                value={form.department} 
                                onChange={e => set("department", e.target.value)}
                                onFocus={() => handleFocus('department')}
                                onBlur={() => handleBlur('department')}
                                placeholder="Computer science" 
                            />
                        </div>
                    </label>

                    {/* Enrollment No */}
                    <label className="es-field">
                        <span className="es-field-label">
                            Enrollment no. <span className="optional">(optional)</span>
                        </span>
                        <div className="es-input-wrap">
                            <div className="input-ripple" />
                            <span className="input-icon">🎓</span>
                            <input 
                                value={form.enrollmentNo} 
                                onChange={e => set("enrollmentNo", e.target.value)}
                                onFocus={() => handleFocus('enrollmentNo')}
                                onBlur={() => handleBlur('enrollmentNo')}
                                placeholder="EN-2026-001" 
                            />
                        </div>
                    </label>

                    {/* Divider */}
                    <div className="es-divider">
                        <span className="line" />
                        <span className="dot" />
                        <span className="line" />
                    </div>

                    {/* Submit */}
                    <button className="es-submit" disabled={busy}>
                        {busy ? (
                            <>
                                <span className="spinner" />
                                Creating account…
                            </>
                        ) : (
                            <>
                                <span className="btn-icon">→</span>
                                Create account
                            </>
                        )}
                    </button>

                    {/* Switch */}
                    <p className="es-switch">
                        Already registered? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </main>
    );
}