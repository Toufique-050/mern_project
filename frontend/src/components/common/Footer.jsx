import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');

                /* ===== ANIMATIONS ===== */
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(0.7); }
                }

                @keyframes floatSlow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                }

                /* ===== FOOTER ===== */
                .footer {
                    background: #ffffff;
                    color: #34321f;
                    padding: 64px 24px 28px;
                    border-top: 1px solid #eae7dd;
                    position: relative;
                    overflow: hidden;
                }

                .footer::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, transparent, #e29a4d, #f0c27a, #e29a4d, transparent);
                    background-size: 300% 100%;
                    animation: shimmer 3s linear infinite;
                }

                .footer .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                .footer .footer-grid {
                    display: grid;
                    grid-template-columns: 2.5fr 1fr 1fr 1.2fr;
                    gap: 48px;
                    padding-bottom: 32px;
                    border-bottom: 1px solid #f0eee4;
                    animation: fadeInUp 0.6s ease both;
                }

                /* ===== BRAND ===== */
                .footer .brand {
                    font-family: 'Fraunces', serif;
                    font-size: 22px;
                    font-weight: 700;
                    color: #1c1830;
                    text-decoration: none;
                    letter-spacing: -0.02em;
                    display: inline-flex;
                    align-items: center;
                    gap: 2px;
                    transition: all 0.3s ease;
                    margin-bottom: 14px;
                }

                .footer .brand:hover {
                    opacity: 0.8;
                }

                .footer .brand span {
                    color: #e29a4d;
                    position: relative;
                }

                .footer .brand .brand-dot {
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    background: #e29a4d;
                    border-radius: 50%;
                    margin-left: 2px;
                    animation: pulse 2s ease-in-out infinite;
                }

                .footer .brand-description {
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    color: #6a665a;
                    line-height: 1.7;
                    max-width: 320px;
                    margin: 0 0 20px 0;
                }

                .footer .social-links {
                    display: flex;
                    gap: 8px;
                }

                .footer .social-links a {
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    background: #f7f6f2;
                    border: 1px solid #f0eee4;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #8a8676;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-size: 14px;
                }

                .footer .social-links a:hover {
                    background: #ffffff;
                    border-color: #e29a4d;
                    color: #e29a4d;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(226, 154, 77, 0.12);
                }

                /* ===== LINKS ===== */
                .footer .footer-grid > div:not(:first-child) {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .footer .footer-grid > div:not(:first-child) .heading {
                    font-family: 'Inter', sans-serif;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #a89b78;
                    margin-bottom: 8px;
                }

                .footer .footer-grid > div:not(:first-child) a {
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    color: #6a665a;
                    text-decoration: none;
                    transition: all 0.25s ease;
                    padding: 3px 0;
                    width: fit-content;
                }

                .footer .footer-grid > div:not(:first-child) a:hover {
                    color: #1c1830;
                    transform: translateX(4px);
                }

                .footer .footer-grid > div:not(:first-child) .contact-info {
                    font-family: 'Inter', sans-serif;
                    font-size: 13px;
                    color: #8a8676;
                    margin-top: 4px;
                    line-height: 1.6;
                }

                .footer .footer-grid > div:not(:first-child) .contact-info strong {
                    color: #1c1830;
                    font-weight: 600;
                }

                /* ===== BOTTOM ===== */
                .footer .footer-bottom {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-top: 24px;
                    font-family: 'Inter', sans-serif;
                    font-size: 13px;
                    color: #b5b0a4;
                    animation: fadeInUp 0.6s ease both;
                    animation-delay: 0.1s;
                    flex-wrap: wrap;
                    gap: 12px;
                }

                .footer .footer-bottom .footer-links {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .footer .footer-bottom .footer-links a {
                    color: #b5b0a4;
                    text-decoration: none;
                    font-size: 12px;
                    transition: color 0.25s ease;
                }

                .footer .footer-bottom .footer-links a:hover {
                    color: #1c1830;
                }

                .footer .footer-bottom .footer-links .divider {
                    color: #eae7dd;
                }

                .footer .footer-bottom .footer-version {
                    font-size: 11px;
                    color: #d0cbbc;
                    letter-spacing: 0.04em;
                }

                .footer .footer-bottom .footer-version .dot {
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    background: #3c6b2e;
                    border-radius: 50%;
                    margin-right: 6px;
                    animation: pulse 1.5s ease-in-out infinite;
                }

                /* ===== RESPONSIVE ===== */
                @media (max-width: 820px) {
                    .footer .footer-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 32px;
                    }

                    .footer .footer-grid > div:first-child {
                        grid-column: 1 / -1;
                    }

                    .footer .brand-description {
                        max-width: 100%;
                    }

                    .footer {
                        padding: 44px 20px 24px;
                    }

                    .footer .footer-bottom {
                        flex-direction: column;
                        text-align: center;
                        gap: 8px;
                    }

                    .footer .footer-bottom .footer-links {
                        gap: 14px;
                        flex-wrap: wrap;
                        justify-content: center;
                    }
                }

                @media (max-width: 480px) {
                    .footer .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 24px;
                    }

                    .footer .footer-grid > div:first-child {
                        grid-column: 1;
                    }

                    .footer .brand {
                        font-size: 20px;
                    }

                    .footer .footer-grid > div:not(:first-child) a {
                        font-size: 13px;
                    }

                    .footer .footer-bottom {
                        font-size: 12px;
                    }

                    .footer .footer-bottom .footer-links {
                        gap: 10px;
                    }

                    .footer .footer-bottom .footer-links a {
                        font-size: 11px;
                    }

                    .footer .social-links a {
                        width: 32px;
                        height: 32px;
                        font-size: 12px;
                    }

                    .footer .footer-grid > div:not(:first-child) .heading {
                        font-size: 11px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .footer * {
                        animation: none !important;
                        transition: none !important;
                    }
                    .footer::before {
                        display: none !important;
                    }
                    .footer .brand .brand-dot {
                        animation: none !important;
                    }
                    .footer .footer-bottom .footer-version .dot {
                        animation: none !important;
                    }
                }
            `}</style>

            <div className="container footer-grid">
                {/* Brand Column */}
                <div>
                    <Link className="brand" to="/">
                        Event<span>Sphere</span>
                        <span className="brand-dot" />
                    </Link>
                    <p className="brand-description">
                        One place for discovering, organizing and managing campus events.
                    </p>
                    <div className="social-links">
                        <a href="#" aria-label="Twitter">🐦</a>
                        <a href="#" aria-label="LinkedIn">🔗</a>
                        <a href="#" aria-label="GitHub">🐙</a>
                        <a href="#" aria-label="YouTube">▶️</a>
                        <a href="#" aria-label="Instagram">📸</a>
                    </div>
                </div>

                {/* Explore Column */}
                <div>
                    <span className="heading">Explore</span>
                    <Link to="/events">Events</Link>
                    <Link to="/gallery">Gallery</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                {/* Account Column */}
                <div>
                    <span className="heading">Account</span>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/sitemap">Sitemap</Link>
                </div>

                {/* Support Column */}
                <div>
                    <span className="heading">Support</span>
                    <Link to="/help">Help Center</Link>
                    <Link to="/faq">FAQ</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                    <div className="contact-info">
                        <strong>Email:</strong> support@eventsphere.com
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="container footer-bottom">
                <span>
                    © {new Date().getFullYear()} EventSphere. All rights reserved.
                </span>
                <div className="footer-links">
                    <a href="/privacy">Privacy</a>
                    <span className="divider">·</span>
                    <a href="/terms">Terms</a>
                    <span className="divider">·</span>
                    <a href="/cookies">Cookies</a>
                </div>
                <span className="footer-version">
                    <span className="dot" />
                    v2.0 · Live
                </span>
            </div>
        </footer>
    );
}