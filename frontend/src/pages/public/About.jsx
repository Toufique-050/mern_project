export default function About() {
    return (
        <main className="page">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700;800&display=swap');

                /* ===== ANIMATIONS ===== */
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.92); }
                    to { opacity: 1; transform: scale(1); }
                }

                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-12px) rotate(2deg); }
                }

                @keyframes floatSlow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(0.8); }
                }

                @keyframes borderGlow {
                    0%, 100% { border-color: rgba(226,154,77,0.1); }
                    50% { border-color: rgba(226,154,77,0.3); }
                }

                @keyframes countUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes textReveal {
                    0% { clip-path: inset(0 100% 0 0); }
                    100% { clip-path: inset(0 0 0 0); }
                }

                /* ===== PAGE ===== */
                .page {
                    min-height: 100vh;
                    background: linear-gradient(160deg, #f7f6f2 0%, #f0ede4 35%, #f7f6f2 65%, #f0ede4 100%);
                    background-size: 300% 300%;
                    animation: gradientMove 15s ease-in-out infinite;
                    font-family: 'Inter', sans-serif;
                    padding: 44px 24px 64px;
                    position: relative;
                    overflow: hidden;
                }

                .page::before {
                    content: '';
                    position: absolute;
                    top: -20%;
                    right: -10%;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(226,154,77,0.04) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: float 10s ease-in-out infinite;
                    pointer-events: none;
                }

                .page::after {
                    content: '';
                    position: absolute;
                    bottom: -20%;
                    left: -10%;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(226,154,77,0.02) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: floatSlow 12s ease-in-out infinite 1.5s;
                    pointer-events: none;
                }

                .page .container {
                    max-width: 900px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                /* ===== DECORATIVE DOTS ===== */
                .page .deco-dot {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 0;
                }

                .page .deco-dot.d1 {
                    width: 14px;
                    height: 14px;
                    background: rgba(226,154,77,0.06);
                    top: 15%;
                    left: 3%;
                    animation: float 6s ease-in-out infinite;
                }

                .page .deco-dot.d2 {
                    width: 8px;
                    height: 8px;
                    background: rgba(28,24,48,0.03);
                    bottom: 25%;
                    right: 5%;
                    animation: float 7s ease-in-out infinite 1.5s;
                }

                .page .deco-dot.d3 {
                    width: 18px;
                    height: 18px;
                    background: rgba(226,154,77,0.04);
                    top: 50%;
                    left: 2%;
                    animation: float 5s ease-in-out infinite 0.5s;
                }

                .page .deco-dot.d4 {
                    width: 10px;
                    height: 10px;
                    background: rgba(226,154,77,0.05);
                    top: 30%;
                    right: 4%;
                    animation: float 8s ease-in-out infinite 1s;
                }

                /* ===== ENHANCED PAGE INTRO ===== */
                .page .page-intro {
                    text-align: center;
                    margin-bottom: 52px;
                    animation: fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                    position: relative;
                }

                /* Decorative line above eyebrow */
                .page .page-intro .deco-line {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin-bottom: 16px;
                }

                .page .page-intro .deco-line .line {
                    width: 40px;
                    height: 1.5px;
                    background: linear-gradient(90deg, transparent, #e29a4d);
                    border-radius: 2px;
                }

                .page .page-intro .deco-line .line:last-child {
                    background: linear-gradient(90deg, #e29a4d, transparent);
                }

                .page .page-intro .deco-line .diamond {
                    width: 6px;
                    height: 6px;
                    background: #e29a4d;
                    transform: rotate(45deg);
                    opacity: 0.5;
                }

                .page .page-intro .eyebrow {
                    display: inline-block;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: #e29a4d;
                    background: rgba(226, 154, 77, 0.08);
                    padding: 6px 24px;
                    border-radius: 20px;
                    margin-bottom: 20px;
                    border: 1px solid rgba(226, 154, 77, 0.06);
                    animation: slideInLeft 0.6s ease both 0.1s;
                    transition: all 0.3s ease;
                }

                .page .page-intro .eyebrow:hover {
                    background: rgba(226, 154, 77, 0.12);
                    transform: scale(1.02);
                }

                .page .page-intro .eyebrow .icon {
                    margin-right: 6px;
                }

                .page .page-intro h1 {
                    font-family: 'Fraunces', serif;
                    font-size: 52px;
                    font-weight: 700;
                    color: #1c1830;
                    margin: 0 0 10px 0;
                    letter-spacing: -0.03em;
                    line-height: 1.05;
                }

                .page .page-intro h1 .highlight {
                    color: #e29a4d;
                    position: relative;
                    display: inline-block;
                }

                .page .page-intro h1 .highlight::after {
                    content: '';
                    position: absolute;
                    bottom: 6px;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #e29a4d, #f0c27a, #e29a4d);
                    background-size: 200% 100%;
                    border-radius: 2px;
                    animation: shimmer 3s linear infinite;
                }

                .page .page-intro h1 .highlight::before {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: -6px;
                    right: -6px;
                    height: 2px;
                    background: rgba(226,154,77,0.1);
                    border-radius: 2px;
                    filter: blur(6px);
                }

                .page .page-intro .subtitle {
                    font-size: 18px;
                    color: #6a665a;
                    line-height: 1.8;
                    max-width: 620px;
                    margin: 0 auto 8px;
                }

                .page .page-intro .subtitle strong {
                    color: #1c1830;
                    font-weight: 600;
                }

                .page .page-intro .tagline {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    flex-wrap: wrap;
                    margin-top: 12px;
                }

                .page .page-intro .tagline .tag {
                    font-size: 12px;
                    font-weight: 500;
                    color: #8a8676;
                    background: rgba(255, 255, 255, 0.5);
                    padding: 4px 16px;
                    border-radius: 16px;
                    border: 1px solid #f0eee4;
                    transition: all 0.3s ease;
                }

                .page .page-intro .tagline .tag:hover {
                    background: #ffffff;
                    border-color: #e29a4d;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(226,154,77,0.06);
                }

                .page .page-intro .tagline .tag .t-icon {
                    margin-right: 4px;
                }

                .page .page-intro .tagline .separator {
                    color: #eae7dd;
                    font-size: 14px;
                }

                /* ===== STATS BAR ===== */
                .page .stats-bar {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                    margin: 36px 0 44px;
                    animation: fadeInUp 0.6s ease both 0.15s;
                }

                .page .stats-bar .stat-item {
                    background: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(234, 231, 221, 0.3);
                    border-radius: 14px;
                    padding: 20px 12px;
                    text-align: center;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    animation: borderGlow 3s ease-in-out infinite;
                    cursor: default;
                }

                .page .stats-bar .stat-item:hover {
                    transform: translateY(-6px) scale(1.03);
                    border-color: rgba(226, 154, 77, 0.2);
                    box-shadow: 0 12px 32px rgba(28, 24, 48, 0.04);
                    background: rgba(255, 255, 255, 0.85);
                }

                .page .stats-bar .stat-item:active {
                    transform: translateY(-2px) scale(0.97);
                }

                .page .stats-bar .stat-item .stat-number {
                    font-family: 'Fraunces', serif;
                    font-size: 32px;
                    font-weight: 700;
                    color: #1c1830;
                    display: block;
                    line-height: 1.2;
                    animation: countUp 0.8s ease both 0.3s;
                }

                .page .stats-bar .stat-item .stat-number .accent {
                    color: #e29a4d;
                }

                .page .stats-bar .stat-item .stat-label {
                    font-size: 11px;
                    font-weight: 500;
                    color: #8a8676;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    margin-top: 4px;
                }

                .page .stats-bar .stat-item .stat-icon {
                    font-size: 20px;
                    display: block;
                    margin-bottom: 4px;
                }

                /* ===== PROSE CONTENT ===== */
                .page .prose {
                    animation: fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both 0.1s;
                }

                .page .prose .content-card {
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(234, 231, 221, 0.3);
                    border-radius: 24px;
                    padding: 44px 48px;
                    box-shadow: 0 4px 24px rgba(28, 24, 48, 0.02), 0 12px 48px -20px rgba(28, 24, 48, 0.06);
                    transition: all 0.4s ease;
                }

                .page .prose .content-card:hover {
                    border-color: rgba(226, 154, 77, 0.12);
                    box-shadow: 0 8px 40px rgba(28, 24, 48, 0.04), 0 12px 48px -20px rgba(28, 24, 48, 0.08);
                }

                .page .prose .content-card .section-icon {
                    font-size: 36px;
                    display: block;
                    margin-bottom: 14px;
                }

                .page .prose h2 {
                    font-family: 'Fraunces', serif;
                    font-size: 28px;
                    font-weight: 600;
                    color: #1c1830;
                    margin: 0 0 14px 0;
                    letter-spacing: -0.02em;
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .page .prose h2 .h2-icon {
                    font-size: 30px;
                }

                .page .prose p {
                    font-size: 16px;
                    color: #5a564a;
                    line-height: 1.9;
                    margin: 0 0 20px 0;
                }

                .page .prose p:last-child {
                    margin-bottom: 0;
                }

                /* ===== FEATURE GRID ===== */
                .page .prose .feature-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 14px;
                    margin: 24px 0 0 0;
                }

                .page .prose .feature-grid .feature-item {
                    background: rgba(255, 255, 255, 0.4);
                    border: 1px solid #f0eee4;
                    border-radius: 14px;
                    padding: 18px 16px;
                    text-align: center;
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    position: relative;
                    overflow: hidden;
                }

                .page .prose .feature-grid .feature-item::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #e29a4d, #f0c27a);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .page .prose .feature-grid .feature-item:hover::before {
                    opacity: 1;
                }

                .page .prose .feature-grid .feature-item:hover {
                    transform: translateY(-6px) scale(1.02);
                    border-color: rgba(226, 154, 77, 0.15);
                    box-shadow: 0 8px 28px rgba(226, 154, 77, 0.06);
                    background: rgba(255, 255, 255, 0.7);
                }

                .page .prose .feature-grid .feature-item:active {
                    transform: translateY(-2px) scale(0.98);
                }

                .page .prose .feature-grid .feature-item .fi-icon {
                    font-size: 30px;
                    display: block;
                    margin-bottom: 8px;
                }

                .page .prose .feature-grid .feature-item .fi-label {
                    font-size: 13px;
                    font-weight: 600;
                    color: #1c1830;
                    letter-spacing: 0.02em;
                    display: block;
                }

                .page .prose .feature-grid .feature-item .fi-desc {
                    font-size: 11px;
                    color: #8a8676;
                    margin-top: 3px;
                    display: block;
                }

                /* ===== DIVIDER ===== */
                .page .prose .divider {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin: 28px 0;
                }

                .page .prose .divider .line {
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #eae7dd, transparent);
                }

                .page .prose .divider .dot {
                    width: 8px;
                    height: 8px;
                    background: linear-gradient(135deg, #e29a4d, #f0c27a);
                    border-radius: 50%;
                    opacity: 0.4;
                    animation: pulse 2s ease-in-out infinite;
                }

                /* ===== RESPONSIVE ===== */
                @media (max-width: 820px) {
                    .page {
                        padding: 32px 20px 48px;
                    }

                    .page .page-intro h1 {
                        font-size: 40px;
                    }

                    .page .page-intro .subtitle {
                        font-size: 16.5px;
                    }

                    .page .page-intro .tagline .tag {
                        font-size: 11px;
                        padding: 3px 12px;
                    }

                    .page .stats-bar {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 12px;
                    }

                    .page .stats-bar .stat-item .stat-number {
                        font-size: 28px;
                    }

                    .page .prose .content-card {
                        padding: 32px 28px;
                        border-radius: 20px;
                    }

                    .page .prose h2 {
                        font-size: 24px;
                    }

                    .page .prose p {
                        font-size: 15px;
                    }

                    .page .prose .feature-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 12px;
                    }

                    .page .prose .feature-grid .feature-item {
                        padding: 14px 12px;
                    }

                    .page .prose .feature-grid .feature-item .fi-icon {
                        font-size: 24px;
                    }
                }

                @media (max-width: 480px) {
                    .page {
                        padding: 24px 14px 36px;
                    }

                    .page::before, .page::after {
                        display: none;
                    }

                    .page .deco-dot {
                        display: none;
                    }

                    .page .page-intro h1 {
                        font-size: 32px;
                    }

                    .page .page-intro .subtitle {
                        font-size: 15px;
                    }

                    .page .page-intro .tagline {
                        flex-direction: column;
                        gap: 6px;
                    }

                    .page .page-intro .tagline .separator {
                        display: none;
                    }

                    .page .page-intro .deco-line .line {
                        width: 20px;
                    }

                    .page .stats-bar {
                        grid-template-columns: 1fr 1fr;
                        gap: 10px;
                        margin: 24px 0 32px;
                    }

                    .page .stats-bar .stat-item {
                        padding: 14px 10px;
                        border-radius: 12px;
                    }

                    .page .stats-bar .stat-item .stat-number {
                        font-size: 24px;
                    }

                    .page .stats-bar .stat-item .stat-label {
                        font-size: 10px;
                    }

                    .page .stats-bar .stat-item .stat-icon {
                        font-size: 18px;
                    }

                    .page .prose .content-card {
                        padding: 22px 16px;
                        border-radius: 16px;
                    }

                    .page .prose .content-card .section-icon {
                        font-size: 28px;
                    }

                    .page .prose h2 {
                        font-size: 20px;
                    }

                    .page .prose h2 .h2-icon {
                        font-size: 22px;
                    }

                    .page .prose p {
                        font-size: 14px;
                        line-height: 1.7;
                    }

                    .page .prose .feature-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 10px;
                    }

                    .page .prose .feature-grid .feature-item {
                        padding: 12px 10px;
                        border-radius: 12px;
                    }

                    .page .prose .feature-grid .feature-item .fi-icon {
                        font-size: 22px;
                    }

                    .page .prose .feature-grid .feature-item .fi-label {
                        font-size: 12px;
                    }

                    .page .prose .feature-grid .feature-item .fi-desc {
                        font-size: 10px;
                    }

                    .page .prose .divider {
                        margin: 18px 0;
                    }

                    .page .prose .divider .dot {
                        width: 6px;
                        height: 6px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .page * {
                        animation: none !important;
                        transition: none !important;
                    }
                    .page {
                        animation: none !important;
                    }
                    .page .page-intro h1 .highlight::after {
                        animation: none !important;
                    }
                    .page .stats-bar .stat-item {
                        animation: none !important;
                    }
                    .page .prose .divider .dot {
                        animation: none !important;
                    }
                }
            `}</style>

            {/* Decorative dots */}
            <div className="deco-dot d1" />
            <div className="deco-dot d2" />
            <div className="deco-dot d3" />
            <div className="deco-dot d4" />

            <div className="container narrow">
                {/* ===== ENHANCED PAGE INTRO ===== */}
                <div className="page-intro">
                    <div className="deco-line">
                        <span className="line" />
                        <span className="diamond" />
                        <span className="line" />
                    </div>

                    <div className="eyebrow">
                        <span className="icon">✦</span>
                        ABOUT EVENTSPHERE
                    </div>

                    <h1>
                        Less admin work.<br />
                        <span className="highlight">Better campus events.</span>
                    </h1>

                    <p className="subtitle">
                        EventSphere is a role-based event management system built for 
                        colleges and student communities by <strong>students, for students</strong>.
                    </p>

                    <div className="tagline">
                        <span className="tag">
                            <span className="t-icon">🎯</span> 
                            Role-based
                        </span>
                        <span className="separator">·</span>
                        <span className="tag">
                            <span className="t-icon">⚡</span> 
                            Real-time
                        </span>
                        <span className="separator">·</span>
                        <span className="tag">
                            <span className="t-icon">🔒</span> 
                            Secure
                        </span>
                        <span className="separator">·</span>
                        <span className="tag">
                            <span className="t-icon">📱</span> 
                            Accessible
                        </span>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="stats-bar">
                    <div className="stat-item">
                        <span className="stat-icon">👥</span>
                        <span className="stat-number">3<span className="accent">+</span></span>
                        <span className="stat-label">User Roles</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-icon">📅</span>
                        <span className="stat-number">100<span className="accent">+</span></span>
                        <span className="stat-label">Events Managed</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-icon">🎓</span>
                        <span className="stat-number">1k<span className="accent">+</span></span>
                        <span className="stat-label">Students</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-icon">⭐</span>
                        <span className="stat-number">98<span className="accent">%</span></span>
                        <span className="stat-label">Satisfaction</span>
                    </div>
                </div>

                {/* Content */}
                <div className="prose">
                    <div className="content-card">
                        <span className="section-icon">🎯</span>
                        <h2>
                            <span className="h2-icon">✨</span>
                            What it does
                        </h2>
                        <p>
                            Participants discover approved events, register, keep track of their registrations, 
                            view certificates and submit feedback after attendance. Organizers create and manage 
                            events, review registrations, mark attendance, issue certificates and curate event media. 
                            Administrators approve events and manage users, feedback and system-level reporting.
                        </p>

                        <div className="divider">
                            <span className="line" />
                            <span className="dot" />
                            <span className="line" />
                        </div>

                        <span className="section-icon">🔗</span>
                        <h2>
                            <span className="h2-icon">⚡</span>
                            Built to stay connected
                        </h2>
                        <p>
                            The frontend talks to the existing EventSphere REST API, while MongoDB remains 
                            the source of truth for users, events, registrations, attendance, certificates, 
                            feedback and gallery records.
                        </p>

                        {/* Feature Grid */}
                        <div className="feature-grid">
                            <div className="feature-item">
                                <span className="fi-icon">📅</span>
                                <span className="fi-label">Events</span>
                                <span className="fi-desc">Discover & manage</span>
                            </div>
                            <div className="feature-item">
                                <span className="fi-icon">📋</span>
                                <span className="fi-label">Registrations</span>
                                <span className="fi-desc">Track & manage</span>
                            </div>
                            <div className="feature-item">
                                <span className="fi-icon">📜</span>
                                <span className="fi-label">Certificates</span>
                                <span className="fi-desc">Issue & download</span>
                            </div>
                            <div className="feature-item">
                                <span className="fi-icon">⭐</span>
                                <span className="fi-label">Feedback</span>
                                <span className="fi-desc">Collect & review</span>
                            </div>
                            <div className="feature-item">
                                <span className="fi-icon">🎨</span>
                                <span className="fi-label">Gallery</span>
                                <span className="fi-desc">Share memories</span>
                            </div>
                            <div className="feature-item">
                                <span className="fi-icon">👥</span>
                                <span className="fi-label">Roles</span>
                                <span className="fi-desc">Admin · Organizer · Participant</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}