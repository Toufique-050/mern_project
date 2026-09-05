import { useEffect, useState } from "react";
import EventCard from "../../components/events/EventCard";
import EventFilter from "../../components/events/EventFilter";
import Loader from "../../components/common/Loader";
import { getEvents } from "../../services/eventService";
import { errorMessage } from "../../utils/helpers";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filters, setFilters] = useState({
        search: "",
        category: "",
        status: "approved"
    });

    useEffect(() => {
        let active = true;
        setLoading(true);
        getEvents(filters)
            .then(d => active && setEvents(d.events || []))
            .catch(e => active && setError(errorMessage(e)))
            .finally(() => active && setLoading(false));
        return () => { active = false }
    }, [filters.search, filters.category, filters.status]);

    return (
        <main className="page">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700;800&display=swap');

                /* ===== KEYFRAMES ===== */
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px) scale(0.96); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.88) rotate(-1deg); }
                    to { opacity: 1; transform: scale(1) rotate(0deg); }
                }

                @keyframes shimmer {
                    0% { background-position: -300% 0; }
                    100% { background-position: 300% 0; }
                }

                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(3deg); }
                }

                @keyframes floatSlow {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-15px) scale(1.02); }
                }

                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes tiltIn {
                    0% { opacity: 0; transform: perspective(600px) rotateX(-10deg) translateY(30px); }
                    100% { opacity: 1; transform: perspective(600px) rotateX(0deg) translateY(0); }
                }

                @keyframes glowPulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(226,154,77,0); }
                    50% { box-shadow: 0 0 30px 5px rgba(226,154,77,0.05); }
                }

                @keyframes btnPulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(226,154,77,0.3); }
                    50% { box-shadow: 0 0 20px 5px rgba(226,154,77,0.1); }
                }

                /* ===== BASE ===== */
                .page {
                    min-height: 100vh;
                    background: linear-gradient(160deg, #f7f6f2 0%, #f0ede4 40%, #f7f6f2 80%, #f0ede4 100%);
                    background-size: 300% 300%;
                    animation: gradientMove 12s ease-in-out infinite;
                    font-family: 'Inter', sans-serif;
                    padding: 44px 24px 64px;
                    position: relative;
                    overflow: hidden;
                }

                .page::before {
                    content: '';
                    position: absolute;
                    top: -10%;
                    right: -5%;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(226,154,77,0.05) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: float 8s ease-in-out infinite;
                    pointer-events: none;
                }

                .page::after {
                    content: '';
                    position: absolute;
                    bottom: -10%;
                    left: -5%;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(226,154,77,0.03) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: floatSlow 10s ease-in-out infinite 1s;
                    pointer-events: none;
                }

                .page .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                /* Floating dots */
                .page .floating-dot {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 0;
                }

                .page .floating-dot.d1 {
                    width: 12px;
                    height: 12px;
                    background: rgba(226,154,77,0.08);
                    top: 15%;
                    left: 8%;
                    animation: float 6s ease-in-out infinite;
                }

                .page .floating-dot.d2 {
                    width: 8px;
                    height: 8px;
                    background: rgba(28,24,48,0.05);
                    bottom: 20%;
                    right: 12%;
                    animation: float 7s ease-in-out infinite 1.5s;
                }

                .page .floating-dot.d3 {
                    width: 16px;
                    height: 16px;
                    background: rgba(226,154,77,0.06);
                    top: 45%;
                    right: 6%;
                    animation: float 5s ease-in-out infinite 0.5s;
                }

                /* ===== PAGE INTRO ===== */
                .page .page-intro {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    margin-bottom: 32px;
                    animation: fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                .page .page-intro .eyebrow {
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #e29a4d;
                    background: rgba(226, 154, 77, 0.08);
                    padding: 4px 16px;
                    border-radius: 16px;
                    display: inline-block;
                    margin-bottom: 8px;
                    animation: slideInLeft 0.6s ease both 0.2s;
                }

                .page .page-intro h1 {
                    font-family: 'Fraunces', serif;
                    font-size: 38px;
                    font-weight: 600;
                    color: #1c1830;
                    margin: 0 0 6px 0;
                    letter-spacing: -0.02em;
                    animation: tiltIn 0.8s ease both 0.3s;
                }

                .page .page-intro p {
                    font-size: 15.5px;
                    color: #6a665a;
                    line-height: 1.6;
                    margin: 0;
                    animation: slideInLeft 0.6s ease both 0.4s;
                }

                .page .page-intro .results-count {
                    font-size: 13px;
                    color: #8a8676;
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(8px);
                    padding: 6px 18px;
                    border-radius: 20px;
                    border: 1px solid #eae7dd;
                    white-space: nowrap;
                    margin-top: 8px;
                    animation: slideInLeft 0.6s ease both 0.5s;
                    transition: all 0.3s ease;
                }

                .page .page-intro .results-count:hover {
                    background: #ffffff;
                    border-color: #d6d0bf;
                    transform: scale(1.02);
                }

                .page .page-intro .results-count strong {
                    color: #1c1830;
                    font-weight: 600;
                }

                /* ===== ALERT ===== */
                .page .alert {
                    margin-top: 20px;
                    padding: 14px 20px;
                    border-radius: 10px;
                    font-size: 13.5px;
                    font-weight: 500;
                    animation: slideInLeft 0.4s ease both;
                }

                .page .alert.error {
                    background: #fdf2f0;
                    border: 1px solid #f5d6d0;
                    color: #b33a2e;
                }

                /* ===== FILTER BAR ANIMATION ===== */
                .page .filter-wrapper {
                    animation: slideInLeft 0.6s ease both 0.6s;
                }

                /* ===== ENHANCED EVENT CARDS ===== */
                .page .event-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 28px;
                    margin-top: 28px;
                }

                .page .event-grid > * {
                    animation: fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                .page .event-grid > *:nth-child(1) { animation-delay: 0.10s; }
                .page .event-grid > *:nth-child(2) { animation-delay: 0.16s; }
                .page .event-grid > *:nth-child(3) { animation-delay: 0.22s; }
                .page .event-grid > *:nth-child(4) { animation-delay: 0.28s; }
                .page .event-grid > *:nth-child(5) { animation-delay: 0.34s; }
                .page .event-grid > *:nth-child(6) { animation-delay: 0.40s; }
                .page .event-grid > *:nth-child(7) { animation-delay: 0.46s; }
                .page .event-grid > *:nth-child(8) { animation-delay: 0.52s; }

                /* EventCard wrapper */
                .page .event-grid .event-card-wrapper {
                    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                    border-radius: 18px;
                    position: relative;
                    background: #ffffff;
                    border: 1px solid #eae7dd;
                    overflow: hidden;
                    box-shadow: 0 1px 2px rgba(28, 24, 48, 0.03), 0 8px 24px -16px rgba(28, 24, 48, 0.08);
                    transform-style: preserve-3d;
                    perspective: 800px;
                    animation: glowPulse 4s ease-in-out infinite;
                }

                /* Top gradient border */
                .page .event-grid .event-card-wrapper::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #e29a4d, #f0c27a, #e8b06a, #f0c27a, #e29a4d);
                    background-size: 300% 100%;
                    opacity: 0;
                    transition: opacity 0.5s ease;
                    z-index: 2;
                    border-radius: 18px 18px 0 0;
                }

                .page .event-grid .event-card-wrapper:hover::before {
                    opacity: 1;
                    animation: shimmer 2.5s linear infinite;
                }

                .page .event-grid .event-card-wrapper:hover {
                    transform: translateY(-14px) scale(1.025) rotateX(2deg) rotateY(2deg);
                    box-shadow: 0 30px 80px rgba(226, 154, 77, 0.10), 0 15px 40px rgba(226, 154, 77, 0.06);
                    border-color: #e8b06a;
                    background: linear-gradient(180deg, #ffffff 0%, #fdfaf5 100%);
                }

                .page .event-grid .event-card-wrapper:active {
                    transform: translateY(-4px) scale(0.98);
                    transition-duration: 0.1s;
                }

                /* Mouse-follow glow overlay */
                .page .event-grid .event-card-wrapper::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(
                        circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                        rgba(226, 154, 77, 0.06) 0%,
                        rgba(226, 154, 77, 0.02) 40%,
                        transparent 70%
                    );
                    opacity: 0;
                    transition: opacity 0.6s ease;
                    pointer-events: none;
                    z-index: 1;
                    border-radius: 18px;
                }

                .page .event-grid .event-card-wrapper:hover::after {
                    opacity: 1;
                }

                /* Shine effect */
                .page .event-grid .event-card-wrapper .shine {
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(
                        45deg,
                        transparent 30%,
                        rgba(255, 255, 255, 0.03) 50%,
                        transparent 70%
                    );
                    transform: rotate(35deg) translateX(-100%);
                    transition: transform 0.8s ease;
                    pointer-events: none;
                    z-index: 1;
                }

                .page .event-grid .event-card-wrapper:hover .shine {
                    transform: rotate(35deg) translateX(100%);
                }

                /* Status indicator */
                .page .event-grid .event-card-wrapper .status-indicator {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(8px);
                    padding: 4px 12px 4px 8px;
                    border-radius: 20px;
                    border: 1px solid #f0eee4;
                    z-index: 3;
                    font-size: 10px;
                    font-weight: 600;
                    color: #8a8676;
                    letter-spacing: 0.04em;
                    transition: all 0.3s ease;
                    opacity: 0;
                    transform: scale(0.8);
                }

                .page .event-grid .event-card-wrapper:hover .status-indicator {
                    opacity: 1;
                    transform: scale(1);
                }

                .page .event-grid .event-card-wrapper .status-indicator .dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    animation: float 2s ease-in-out infinite;
                }

                .page .event-grid .event-card-wrapper .status-indicator .dot.live {
                    background: #3c6b2e;
                }

                .page .event-grid .event-card-wrapper .status-indicator .dot.upcoming {
                    background: #e29a4d;
                }

                .page .event-grid .event-card-wrapper .status-indicator .dot.ended {
                    background: #8a8676;
                }

                /* ===== ENHANCED BUTTON STYLES ===== */
                /* Target buttons inside EventCard */
                .page .event-grid .event-card-wrapper .btn,
                .page .event-grid .event-card-wrapper button,
                .page .event-grid .event-card-wrapper a.btn {
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                    border-radius: 10px;
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                    border: none;
                }

                /* Primary button - Gold gradient */
                .page .event-grid .event-card-wrapper .btn-primary,
                .page .event-grid .event-card-wrapper .btn.btn-primary {
                    background: linear-gradient(135deg, #e29a4d, #d48a3a, #c47a2a);
                    background-size: 200% 200%;
                    color: #ffffff;
                    padding: 8px 22px;
                    font-size: 13px;
                    box-shadow: 0 2px 12px rgba(226, 154, 77, 0.25);
                    animation: btnPulse 3s ease-in-out infinite;
                }

                .page .event-grid .event-card-wrapper .btn-primary:hover,
                .page .event-grid .event-card-wrapper .btn.btn-primary:hover {
                    background: linear-gradient(135deg, #f0c27a, #e29a4d, #d48a3a);
                    background-size: 200% 200%;
                    transform: translateY(-2px) scale(1.02);
                    box-shadow: 0 6px 24px rgba(226, 154, 77, 0.35);
                }

                .page .event-grid .event-card-wrapper .btn-primary:active,
                .page .event-grid .event-card-wrapper .btn.btn-primary:active {
                    transform: translateY(0px) scale(0.96);
                }

                .page .event-grid .event-card-wrapper .btn-primary::after,
                .page .event-grid .event-card-wrapper .btn.btn-primary::after {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(
                        45deg,
                        transparent 40%,
                        rgba(255, 255, 255, 0.1) 50%,
                        transparent 60%
                    );
                    transform: rotate(35deg) translateX(-100%);
                    transition: transform 0.6s ease;
                    pointer-events: none;
                }

                .page .event-grid .event-card-wrapper .btn-primary:hover::after,
                .page .event-grid .event-card-wrapper .btn.btn-primary:hover::after {
                    transform: rotate(35deg) translateX(100%);
                }

                /* Secondary button - Gold outline */
                .page .event-grid .event-card-wrapper .btn-secondary,
                .page .event-grid .event-card-wrapper .btn-outline {
                    background: transparent;
                    color: #e29a4d;
                    border: 1.5px solid #e29a4d;
                    padding: 8px 22px;
                    font-size: 13px;
                    transition: all 0.3s ease;
                }

                .page .event-grid .event-card-wrapper .btn-secondary:hover,
                .page .event-grid .event-card-wrapper .btn-outline:hover {
                    background: rgba(226, 154, 77, 0.06);
                    border-color: #d48a3a;
                    color: #d48a3a;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(226, 154, 77, 0.12);
                }

                /* Light button - Soft gold */
                .page .event-grid .event-card-wrapper .btn-light {
                    background: rgba(226, 154, 77, 0.06);
                    color: #b8873a;
                    border: 1px solid rgba(226, 154, 77, 0.15);
                    padding: 8px 22px;
                    font-size: 13px;
                }

                .page .event-grid .event-card-wrapper .btn-light:hover {
                    background: rgba(226, 154, 77, 0.12);
                    border-color: rgba(226, 154, 77, 0.25);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(226, 154, 77, 0.08);
                }

                /* Danger button - Warm red */
                .page .event-grid .event-card-wrapper .btn-danger {
                    background: #fdf2f0;
                    color: #b33a2e;
                    border: 1px solid #f5d6d0;
                    padding: 8px 22px;
                    font-size: 13px;
                }

                .page .event-grid .event-card-wrapper .btn-danger:hover {
                    background: #fce8e5;
                    border-color: #ecc0b8;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(179, 58, 46, 0.12);
                }

                /* Dark button - Deep color */
                .page .event-grid .event-card-wrapper .btn-dark {
                    background: #1c1830;
                    color: #ffffff;
                    border: 1px solid #1c1830;
                    padding: 8px 22px;
                    font-size: 13px;
                }

                .page .event-grid .event-card-wrapper .btn-dark:hover {
                    background: #2c2648;
                    border-color: #2c2648;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(28, 24, 48, 0.15);
                }

                /* ===== EMPTY STATE ===== */
                .page .empty-state {
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 64px 32px;
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(8px);
                    border: 1px solid #eae7dd;
                    border-radius: 16px;
                    font-size: 14px;
                    color: #8a8676;
                    line-height: 1.7;
                    animation: fadeInUp 0.6s ease both;
                    transition: all 0.3s ease;
                }

                .page .empty-state:hover {
                    border-color: #d6d0bf;
                    background: #ffffff;
                }

                .page .empty-state::before {
                    content: "🔍";
                    display: block;
                    font-size: 40px;
                    margin-bottom: 14px;
                    opacity: 0.4;
                    animation: float 3s ease-in-out infinite;
                }

                .page .empty-state .empty-hint {
                    font-size: 13px;
                    color: #b5b0a4;
                    margin-top: 4px;
                }

                /* ===== RESPONSIVE ===== */
                @media (max-width: 820px) {
                    .page {
                        padding: 32px 16px 48px;
                    }

                    .page .page-intro {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 12px;
                    }

                    .page .page-intro h1 {
                        font-size: 32px;
                    }

                    .page .page-intro .results-count {
                        align-self: flex-start;
                    }

                    .page .event-grid {
                        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                        gap: 20px;
                    }

                    .page .event-grid .event-card-wrapper:hover {
                        transform: translateY(-8px) scale(1.01);
                    }

                    .page::before, .page::after {
                        display: none;
                    }

                    .page .event-grid .event-card-wrapper .status-indicator {
                        display: none;
                    }
                }

                @media (max-width: 480px) {
                    .page {
                        padding: 24px 12px 36px;
                    }

                    .page .page-intro h1 {
                        font-size: 26px;
                    }

                    .page .page-intro p {
                        font-size: 14px;
                    }

                    .page .event-grid {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }

                    .page .event-grid .event-card-wrapper:hover {
                        transform: translateY(-5px) scale(1.005);
                    }

                    .page .empty-state {
                        padding: 40px 20px;
                        font-size: 13px;
                    }

                    .page .empty-state::before {
                        font-size: 32px;
                    }

                    .page .floating-dot {
                        display: none;
                    }

                    .page .event-grid .event-card-wrapper .shine {
                        display: none;
                    }

                    .page .event-grid .event-card-wrapper .btn-primary,
                    .page .event-grid .event-card-wrapper .btn-secondary,
                    .page .event-grid .event-card-wrapper .btn-light,
                    .page .event-grid .event-card-wrapper .btn-danger,
                    .page .event-grid .event-card-wrapper .btn-dark {
                        font-size: 12px;
                        padding: 6px 16px;
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
                    .page .event-grid .event-card-wrapper {
                        animation: none !important;
                    }
                    .page .event-grid .event-card-wrapper::before {
                        display: none !important;
                    }
                    .page .event-grid .event-card-wrapper::after {
                        display: none !important;
                    }
                    .page .event-grid .event-card-wrapper .shine {
                        display: none !important;
                    }
                    .page .event-grid .event-card-wrapper .btn-primary {
                        animation: none !important;
                    }
                    .page .event-grid .event-card-wrapper .btn-primary::after {
                        display: none !important;
                    }
                }
            `}</style>

            {/* Decorative floating dots */}
            <div className="floating-dot d1" />
            <div className="floating-dot d2" />
            <div className="floating-dot d3" />

            <div className="container">
                {/* Page Intro */}
                <div className="page-intro">
                    <div>
                        <div className="eyebrow">📅 EVENT DIRECTORY</div>
                        <h1>Find your next event.</h1>
                        <p>Browse approved events, check availability and register from the event page.</p>
                    </div>
                    {!loading && !error && (
                        <div className="results-count">
                            <strong>{events.length}</strong> event{events.length !== 1 ? 's' : ''} found
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="filter-wrapper">
                    <EventFilter filters={filters} setFilters={setFilters} />
                </div>

                {/* Error */}
                {error && (
                    <div className="alert error">
                        {error}
                    </div>
                )}

                {/* Content */}
                {loading ? (
                    <Loader />
                ) : (
                    <div className="event-grid">
                        {events.map(e => (
                            <div key={e._id} className="event-card-wrapper">
                                <div className="shine" />
                                <div className="status-indicator">
                                    <span className={`dot ${e.status === 'approved' ? 'live' : e.status === 'pending' ? 'upcoming' : 'ended'}`} />
                                    {e.status || 'Live'}
                                </div>
                                <EventCard event={e} />
                            </div>
                        ))}
                        {!events.length && (
                            <div className="empty-state">
                                <div>No events match your filters.</div>
                                <div className="empty-hint">Try adjusting your search or category.</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}