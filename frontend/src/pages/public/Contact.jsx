export default function Contact() {
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

                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(30px); }
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

                @keyframes iconFloat {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
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

                /* ===== CONTACT GRID ===== */
                .page .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 48px;
                    align-items: start;
                    animation: fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                /* ===== LEFT CONTENT ===== */
                .page .contact-grid .left-content {
                    animation: slideInLeft 0.6s ease both 0.1s;
                }

                .page .contact-grid .left-content .deco-line {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 16px;
                }

                .page .contact-grid .left-content .deco-line .line {
                    width: 30px;
                    height: 1.5px;
                    background: linear-gradient(90deg, transparent, #e29a4d);
                    border-radius: 2px;
                }

                .page .contact-grid .left-content .deco-line .diamond {
                    width: 6px;
                    height: 6px;
                    background: #e29a4d;
                    transform: rotate(45deg);
                    opacity: 0.5;
                }

                .page .contact-grid .eyebrow {
                    display: inline-block;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: #e29a4d;
                    background: rgba(226, 154, 77, 0.08);
                    padding: 6px 24px;
                    border-radius: 20px;
                    margin-bottom: 16px;
                    border: 1px solid rgba(226, 154, 77, 0.06);
                }

                .page .contact-grid .eyebrow .icon {
                    margin-right: 6px;
                }

                .page .contact-grid h1 {
                    font-family: 'Fraunces', serif;
                    font-size: 40px;
                    font-weight: 700;
                    color: #1c1830;
                    margin: 0 0 12px 0;
                    letter-spacing: -0.03em;
                    line-height: 1.1;
                }

                .page .contact-grid h1 .highlight {
                    color: #e29a4d;
                    position: relative;
                }

                .page .contact-grid h1 .highlight::after {
                    content: '';
                    position: absolute;
                    bottom: 4px;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #e29a4d, #f0c27a);
                    border-radius: 2px;
                }

                .page .contact-grid p {
                    font-size: 16.5px;
                    color: #6a665a;
                    line-height: 1.8;
                    margin: 0 0 20px 0;
                }

                .page .contact-grid .quick-links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 16px;
                }

                .page .contact-grid .quick-links .qlink {
                    font-size: 12px;
                    font-weight: 500;
                    color: #8a8676;
                    background: rgba(255, 255, 255, 0.5);
                    padding: 6px 16px;
                    border-radius: 16px;
                    border: 1px solid #f0eee4;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .page .contact-grid .quick-links .qlink:hover {
                    background: #ffffff;
                    border-color: #e29a4d;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(226,154,77,0.06);
                    color: #1c1830;
                }

                /* ===== CONTACT CARD ===== */
                .page .contact-grid .contact-card {
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(234, 231, 221, 0.3);
                    border-radius: 24px;
                    padding: 36px 32px;
                    box-shadow: 0 4px 24px rgba(28, 24, 48, 0.02), 0 12px 48px -20px rgba(28, 24, 48, 0.06);
                    transition: all 0.4s ease;
                    animation: slideInRight 0.6s ease both 0.15s;
                    animation: borderGlow 3s ease-in-out infinite;
                }

                .page .contact-grid .contact-card:hover {
                    border-color: rgba(226, 154, 77, 0.15);
                    box-shadow: 0 8px 40px rgba(28, 24, 48, 0.04), 0 12px 48px -20px rgba(28, 24, 48, 0.08);
                    transform: translateY(-4px);
                }

                .page .contact-grid .contact-card .card-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 24px;
                    padding-bottom: 16px;
                    border-bottom: 1px solid #f0eee4;
                }

                .page .contact-grid .contact-card .card-header .header-icon {
                    font-size: 28px;
                    animation: iconFloat 3s ease-in-out infinite;
                }

                .page .contact-grid .contact-card .card-header h3 {
                    font-family: 'Fraunces', serif;
                    font-size: 20px;
                    font-weight: 600;
                    color: #1c1830;
                    margin: 0;
                    letter-spacing: -0.01em;
                }

                .page .contact-grid .contact-card .card-header h3 span {
                    color: #e29a4d;
                }

                .page .contact-grid .contact-card .contact-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    padding: 14px 0;
                    border-bottom: 1px solid #f5f3eb;
                    transition: all 0.3s ease;
                }

                .page .contact-grid .contact-card .contact-item:last-of-type {
                    border-bottom: none;
                }

                .page .contact-grid .contact-card .contact-item:hover {
                    transform: translateX(4px);
                }

                .page .contact-grid .contact-card .contact-item .ci-icon {
                    font-size: 20px;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(226, 154, 77, 0.06);
                    border-radius: 10px;
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                }

                .page .contact-grid .contact-card .contact-item:hover .ci-icon {
                    background: rgba(226, 154, 77, 0.12);
                    transform: scale(1.05);
                }

                .page .contact-grid .contact-card .contact-item .ci-content {
                    flex: 1;
                }

                .page .contact-grid .contact-card .contact-item .ci-content span {
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                    color: #a89b78;
                    display: block;
                    margin-bottom: 2px;
                }

                .page .contact-grid .contact-card .contact-item .ci-content strong {
                    font-size: 14.5px;
                    font-weight: 600;
                    color: #1c1830;
                    display: block;
                }

                .page .contact-grid .contact-card .contact-item .ci-content small {
                    font-size: 12.5px;
                    color: #8a8676;
                }

                /* ===== RESPONSIVE ===== */
                @media (max-width: 820px) {
                    .page {
                        padding: 32px 20px 48px;
                    }

                    .page .contact-grid {
                        grid-template-columns: 1fr;
                        gap: 32px;
                    }

                    .page .contact-grid h1 {
                        font-size: 34px;
                    }

                    .page .contact-grid p {
                        font-size: 15.5px;
                    }

                    .page .contact-grid .contact-card {
                        padding: 28px 24px;
                    }

                    .page .contact-grid .contact-card .contact-item .ci-content strong {
                        font-size: 13.5px;
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

                    .page .contact-grid h1 {
                        font-size: 28px;
                    }

                    .page .contact-grid p {
                        font-size: 14.5px;
                    }

                    .page .contact-grid .contact-card {
                        padding: 20px 16px;
                        border-radius: 18px;
                    }

                    .page .contact-grid .contact-card .card-header h3 {
                        font-size: 18px;
                    }

                    .page .contact-grid .contact-card .card-header .header-icon {
                        font-size: 24px;
                    }

                    .page .contact-grid .contact-card .contact-item {
                        padding: 12px 0;
                        gap: 12px;
                    }

                    .page .contact-grid .contact-card .contact-item .ci-icon {
                        width: 34px;
                        height: 34px;
                        font-size: 16px;
                    }

                    .page .contact-grid .contact-card .contact-item .ci-content strong {
                        font-size: 13px;
                    }

                    .page .contact-grid .contact-card .contact-item .ci-content span {
                        font-size: 10px;
                    }

                    .page .contact-grid .quick-links .qlink {
                        font-size: 11px;
                        padding: 4px 12px;
                    }

                    .page .contact-grid .left-content .deco-line .line {
                        width: 16px;
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
                    .page .contact-grid .contact-card {
                        animation: none !important;
                    }
                    .page .contact-grid .contact-card .card-header .header-icon {
                        animation: none !important;
                    }
                }
            `}</style>

            {/* Decorative dots */}
            <div className="deco-dot d1" />
            <div className="deco-dot d2" />
            <div className="deco-dot d3" />
            <div className="deco-dot d4" />

            <div className="container contact-grid">
                {/* Left Content */}
                <div className="left-content">
                    <div className="deco-line">
                        <span className="line" />
                        <span className="diamond" />
                        <span className="line" style={{ background: 'linear-gradient(90deg, #e29a4d, transparent)' }} />
                    </div>

                    <div className="eyebrow">
                        <span className="icon">✉️</span>
                        GET IN TOUCH
                    </div>

                    <h1>
                        Need help with <span className="highlight">EventSphere</span>?
                    </h1>

                    <p>
                        For a real deployment, connect this page to your institution's 
                        support email or help desk.
                    </p>

                    <div className="quick-links">
                        <a href="#" className="qlink">📧 Email Support</a>
                        
                    </div>
                </div>

                {/* Contact Card */}
                <div className="contact-card">
                    <div className="card-header">
                        <span className="header-icon">📬</span>
                        <h3>Contact <span>Information</span></h3>
                    </div>

                    <div className="contact-item">
                        <span className="ci-icon">📧</span>
                        <div className="ci-content">
                            <span>Email</span>
                            <strong>malaikasarfaraz2001@gmail.com</strong>
                            <small>We respond within 24 hours</small>
                        </div>
                    </div>

                    <div className="contact-item">
                        <span className="ci-icon">📍</span>
                        <div className="ci-content">
                            <span>Office Admin</span>
                            <strong>huriyaaslam03@gmail.com</strong>
                            <small>Room 204, Administration Block</small>
                        </div>
                    </div>

                    <div className="contact-item">
                        <span className="ci-icon">🕐</span>
                        <div className="ci-content">
                            <span>Hours</span>
                            <strong>Mon–Fri · 9:00 AM–5:00 PM</strong>
                            <small>Closed on weekends and holidays</small>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}