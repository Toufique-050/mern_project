import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvents } from "../../services/eventService";
import EventCard from "../../components/events/EventCard";
import Loader from "../../components/common/Loader";

export default function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEvents({ status: "approved" })
            .then(d => setEvents(d.events?.slice(0, 3) || []))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700;800&display=swap');

                /* ===== ANIMATIONS ===== */
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(50px) scale(0.96); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.85) rotate(-2deg); }
                    to { opacity: 1; transform: scale(1) rotate(0deg); }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-18px) rotate(3deg); }
                }

                @keyframes floatSlow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes pulseGlow {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(1.3); }
                }

                @keyframes shimmer {
                    0% { background-position: -300% 0; }
                    100% { background-position: 300% 0; }
                }

                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(-40px) scale(0.95); }
                    to { opacity: 1; transform: translateX(0) scale(1); }
                }

                @keyframes orbit {
                    0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
                    100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
                }

                @keyframes orbitReverse {
                    0% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
                    100% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
                }

                @keyframes orbitSlow {
                    0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
                    100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
                }

                @keyframes cardGlow {
                    0%, 100% { box-shadow: 0 1px 2px rgba(28,24,48,0.03), 0 8px 24px -16px rgba(28,24,48,0.08); }
                    50% { box-shadow: 0 8px 40px rgba(226,154,77,0.08), 0 12px 40px -20px rgba(28,24,48,0.12); }
                }

                @keyframes borderPulse {
                    0%, 100% { border-color: #eae7dd; }
                    50% { border-color: rgba(226,154,77,0.3); }
                }

                @keyframes textGlow {
                    0%, 100% { text-shadow: 0 0 20px rgba(226,154,77,0); }
                    50% { text-shadow: 0 0 40px rgba(226,154,77,0.1); }
                }

                @keyframes countUp {
                    from { opacity: 0; transform: translateY(30px) scale(0.8); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                @keyframes rotateIn {
                    from { opacity: 0; transform: rotate(-10deg) scale(0.9); }
                    to { opacity: 1; transform: rotate(0deg) scale(1); }
                }

                @keyframes shimmerGold {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                @keyframes bounceIn {
                    0% { opacity: 0; transform: scale(0.3); }
                    50% { opacity: 1; transform: scale(1.05); }
                    70% { transform: scale(0.9); }
                    100% { transform: scale(1); }
                }

                @keyframes wiggle {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-3deg); }
                    75% { transform: rotate(3deg); }
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(60px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* ===== GLOBAL ===== */
                * {
                    box-sizing: border-box;
                }

                /* ===== HERO SECTION ===== */
                .hero-section {
                    background: linear-gradient(160deg, #f7f6f2 0%, #eae6dc 35%, #f7f6f2 65%, #eae6dc 100%);
                    background-size: 400% 400%;
                    animation: gradientMove 15s ease-in-out infinite;
                    padding: 80px 24px 88px;
                    border-bottom: 1px solid #eae7dd;
                    position: relative;
                    overflow: hidden;
                }

                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .hero-section::before {
                    content: '';
                    position: absolute;
                    top: -30%;
                    right: -8%;
                    width: 800px;
                    height: 800px;
                    background: radial-gradient(circle, rgba(226,154,77,0.06) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: float 10s ease-in-out infinite;
                    pointer-events: none;
                }

                .hero-section::after {
                    content: '';
                    position: absolute;
                    bottom: -25%;
                    left: -5%;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(226,154,77,0.03) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: floatSlow 12s ease-in-out infinite 1.5s;
                    pointer-events: none;
                }

                .hero-section .bg-grid {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(226,154,77,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(226,154,77,0.02) 1px, transparent 1px);
                    background-size: 60px 60px;
                    pointer-events: none;
                    z-index: 0;
                }

                .hero-section .particle {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1;
                    animation: particleFloat 8s ease-in-out infinite;
                }

                @keyframes particleFloat {
                    0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
                    25% { transform: translateY(-25px) translateX(12px) scale(1.2); }
                    50% { transform: translateY(12px) translateX(-12px) scale(0.8); }
                    75% { transform: translateY(-12px) translateX(18px) scale(1.1); }
                }

                .hero-section .particle.p1 {
                    width: 6px;
                    height: 6px;
                    background: rgba(226,154,77,0.2);
                    top: 10%;
                    left: 15%;
                    animation-delay: 0s;
                }

                .hero-section .particle.p2 {
                    width: 8px;
                    height: 8px;
                    background: rgba(226,154,77,0.15);
                    top: 25%;
                    right: 20%;
                    animation-delay: 1s;
                }

                .hero-section .particle.p3 {
                    width: 4px;
                    height: 4px;
                    background: rgba(226,154,77,0.18);
                    bottom: 30%;
                    left: 10%;
                    animation-delay: 2s;
                }

                .hero-section .particle.p4 {
                    width: 10px;
                    height: 10px;
                    background: rgba(226,154,77,0.1);
                    bottom: 15%;
                    right: 15%;
                    animation-delay: 0.5s;
                }

                .hero-section .deco-dot {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1;
                }

                .hero-section .deco-dot.d1 {
                    width: 14px;
                    height: 14px;
                    background: #e29a4d;
                    top: 12%;
                    left: 6%;
                    opacity: 0.12;
                    animation: float 4.5s ease-in-out infinite;
                }

                .hero-section .deco-dot.d2 {
                    width: 8px;
                    height: 8px;
                    background: #e29a4d;
                    bottom: 20%;
                    right: 10%;
                    opacity: 0.08;
                    animation: float 5.5s ease-in-out infinite 1s;
                }

                .hero-section .deco-dot.d3 {
                    width: 20px;
                    height: 20px;
                    background: #e29a4d;
                    top: 40%;
                    right: 4%;
                    opacity: 0.06;
                    animation: float 6.5s ease-in-out infinite 0.5s;
                }

                .hero-section .deco-dot.d4 {
                    width: 10px;
                    height: 10px;
                    background: #e29a4d;
                    bottom: 35%;
                    left: 12%;
                    opacity: 0.08;
                    animation: float 5s ease-in-out infinite 1.5s;
                }

                .hero-section .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 64px;
                    align-items: center;
                    position: relative;
                    z-index: 2;
                }

                .hero-section .eyebrow {
                    display: inline-block;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: #e29a4d;
                    background: rgba(226,154,77,0.08);
                    padding: 6px 18px;
                    border-radius: 20px;
                    margin-bottom: 18px;
                    animation: fadeInUp 0.6s ease both;
                    border: 1px solid rgba(226,154,77,0.06);
                    transition: all 0.3s ease;
                }

                .hero-section .eyebrow:hover {
                    transform: scale(1.02) rotate(-1deg);
                    background: rgba(226,154,77,0.12);
                }

                .hero-section h1 {
                    font-family: 'Fraunces', serif;
                    font-size: 54px;
                    font-weight: 700;
                    color: #1c1830;
                    line-height: 1.08;
                    margin: 0 0 20px 0;
                    animation: fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                    animation-delay: 0.08s;
                    letter-spacing: -0.02em;
                }

                .hero-section h1 .highlight {
                    color: #e29a4d;
                    position: relative;
                    display: inline-block;
                    animation: textGlow 3s ease-in-out infinite;
                }

                .hero-section h1 .highlight::after {
                    content: '';
                    position: absolute;
                    bottom: 2px;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #e29a4d, #e8b06a, #e29a4d);
                    background-size: 200% 100%;
                    border-radius: 2px;
                    animation: shimmerGold 3s linear infinite;
                }

                .hero-section h1 .highlight::before {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: -6px;
                    right: -6px;
                    height: 2px;
                    background: rgba(226,154,77,0.12);
                    border-radius: 2px;
                    filter: blur(6px);
                }

                .hero-section p {
                    font-size: 17.5px;
                    color: #5a564a;
                    line-height: 1.8;
                    max-width: 480px;
                    margin: 0 0 32px 0;
                    animation: fadeInUp 0.7s ease both;
                    animation-delay: 0.16s;
                    font-weight: 400;
                }

                .hero-actions {
                    display: flex;
                    gap: 14px;
                    flex-wrap: wrap;
                    margin-bottom: 36px;
                    animation: fadeInUp 0.7s ease both;
                    animation-delay: 0.24s;
                }

                .hero-actions .btn {
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    font-weight: 600;
                    padding: 14px 34px;
                    border-radius: 12px;
                    border: 1px solid transparent;
                    cursor: pointer;
                    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    position: relative;
                    overflow: hidden;
                }

                .hero-actions .btn-primary {
                    background: #1c1830;
                    color: #ffffff;
                    border-color: #1c1830;
                }

                .hero-actions .btn-primary::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
                    transform: translateX(-100%);
                    transition: transform 0.8s;
                }

                .hero-actions .btn-primary:hover::after {
                    transform: translateX(100%);
                }

                .hero-actions .btn-primary:hover {
                    background: #2c2648;
                    border-color: #2c2648;
                    transform: translateY(-5px) scale(1.03);
                    box-shadow: 0 20px 60px rgba(28,24,48,0.30);
                }

                .hero-actions .btn-light {
                    background: rgba(255,255,255,0.85);
                    backdrop-filter: blur(12px);
                    color: #1c1830;
                    border-color: #e0ddd4;
                }

                .hero-actions .btn-light:hover {
                    background: #ffffff;
                    border-color: #d0cbbc;
                    transform: translateY(-5px) scale(1.03);
                    box-shadow: 0 20px 50px rgba(28,24,48,0.06);
                }

                .hero-actions .btn:active {
                    transform: scale(0.95);
                    transition-duration: 0.1s;
                }

                .hero-actions .btn .arrow {
                    transition: transform 0.3s ease;
                }

                .hero-actions .btn:hover .arrow {
                    transform: translateX(6px);
                }

                .hero-points {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 24px 36px;
                    animation: fadeInUp 0.7s ease both;
                    animation-delay: 0.32s;
                }

                .hero-points span {
                    font-size: 13px;
                    color: #5a564a;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 500;
                    animation: slideInRight 0.5s ease both;
                }

                .hero-points span:nth-child(1) { animation-delay: 0.34s; }
                .hero-points span:nth-child(2) { animation-delay: 0.38s; }
                .hero-points span:nth-child(3) { animation-delay: 0.42s; }

                .hero-points span .check {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 20px;
                    height: 20px;
                    background: #e8f0e6;
                    border-radius: 50%;
                    color: #3c6b2e;
                    font-size: 11px;
                    font-weight: 700;
                    flex-shrink: 0;
                    transition: all 0.4s ease;
                }

                .hero-points span:hover .check {
                    transform: scale(1.2) rotate(15deg);
                    background: #d4e6cc;
                }

                /* ===== HERO VISUAL ===== */
                .hero-visual {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    animation: fadeInScale 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                    animation-delay: 0.2s;
                    position: relative;
                }

                .hero-visual .orbit-ring {
                    position: absolute;
                    border: 1px dashed rgba(226,154,77,0.12);
                    border-radius: 50%;
                    pointer-events: none;
                }

                .hero-visual .orbit-ring.r1 {
                    width: 340px;
                    height: 340px;
                    animation: orbit 22s linear infinite;
                }

                .hero-visual .orbit-ring.r2 {
                    width: 260px;
                    height: 260px;
                    animation: orbitReverse 16s linear infinite;
                }

                .hero-visual .orbit-ring.r3 {
                    width: 420px;
                    height: 420px;
                    border-color: rgba(226,154,77,0.06);
                    animation: orbitSlow 30s linear infinite;
                }

                .hero-panel {
                    background: rgba(255,255,255,0.97);
                    backdrop-filter: blur(24px);
                    border: 1px solid #eae7dd;
                    border-radius: 28px;
                    padding: 40px 44px;
                    box-shadow: 0 40px 100px rgba(28,24,48,0.06), 0 8px 24px rgba(28,24,48,0.03);
                    position: relative;
                    width: 100%;
                    max-width: 420px;
                    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                    z-index: 2;
                    animation: cardGlow 4s ease-in-out infinite;
                }

                .hero-panel:hover {
                    transform: translateY(-12px) scale(1.02);
                    box-shadow: 0 60px 140px rgba(28,24,48,0.10);
                    border-color: #d6d0bf;
                }

                .hero-panel .live-pill {
                    display: inline-flex;
                    align-items: center;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #3c6b2e;
                    background: #e8f0e6;
                    padding: 5px 18px;
                    border-radius: 20px;
                    margin-bottom: 16px;
                    border: 1px solid #d4e6cc;
                }

                .hero-panel .live-pill .dot {
                    display: inline-block;
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #3c6b2e;
                    margin-right: 8px;
                    animation: pulseGlow 1.5s ease-in-out infinite;
                }

                .hero-panel h3 {
                    font-family: 'Fraunces', serif;
                    font-size: 26px;
                    font-weight: 600;
                    color: #1c1830;
                    margin: 0 0 20px 0;
                    letter-spacing: -0.01em;
                }

                .hero-mini {
                    display: flex;
                    gap: 32px;
                    padding: 18px 0;
                    border-top: 1px solid #f0eee4;
                    border-bottom: 1px solid #f0eee4;
                    margin-bottom: 20px;
                }

                .hero-mini div {
                    display: flex;
                    flex-direction: column;
                    transition: all 0.3s ease;
                }

                .hero-mini div:hover {
                    transform: translateY(-3px) scale(1.02);
                }

                .hero-mini strong {
                    font-size: 26px;
                    font-weight: 700;
                    color: #1c1830;
                    letter-spacing: -0.01em;
                }

                .hero-mini strong .accent {
                    color: #e29a4d;
                }

                .hero-mini small {
                    font-size: 12px;
                    color: #8a8676;
                    font-weight: 500;
                    margin-top: 1px;
                }

                .hero-ticket {
                    background: linear-gradient(135deg, #faf8f2, #f5f3eb);
                    border-radius: 14px;
                    padding: 16px 20px;
                    border-left: 4px solid #e29a4d;
                    transition: all 0.4s ease;
                }

                .hero-ticket:hover {
                    border-left-color: #d48a3a;
                    background: #f7f5ed;
                    transform: translateX(4px);
                }

                .hero-ticket .label {
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    color: #e29a4d;
                    text-transform: uppercase;
                    display: block;
                }

                .hero-ticket strong {
                    font-size: 15px;
                    font-weight: 600;
                    color: #1c1830;
                    display: block;
                    margin: 4px 0 2px;
                }

                .hero-ticket small {
                    font-size: 12px;
                    color: #8a8676;
                }

                /* ===== STATS SECTION ===== */
                .stats-section {
                    padding: 60px 24px;
                    background: #ffffff;
                    border-bottom: 1px solid #eae7dd;
                }

                .stats-section .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .stats-section .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                }

                .stats-section .stats-grid .stat-item {
                    text-align: center;
                    padding: 24px 16px;
                    border-radius: 16px;
                    border: 1px solid #f0eee4;
                    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                    animation: fadeInUp 0.5s ease both;
                    animation: borderPulse 3s ease-in-out infinite;
                    position: relative;
                    overflow: hidden;
                }

                .stats-section .stats-grid .stat-item::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #e29a4d, #f0c27a, #e29a4d);
                    background-size: 200% 100%;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }

                .stats-section .stats-grid .stat-item:hover::before {
                    opacity: 1;
                    animation: shimmerGold 2s linear infinite;
                }

                .stats-section .stats-grid .stat-item:nth-child(1) { animation-delay: 0.05s; }
                .stats-section .stats-grid .stat-item:nth-child(2) { animation-delay: 0.10s; }
                .stats-section .stats-grid .stat-item:nth-child(3) { animation-delay: 0.15s; }
                .stats-section .stats-grid .stat-item:nth-child(4) { animation-delay: 0.20s; }

                .stats-section .stats-grid .stat-item:hover {
                    transform: translateY(-8px) scale(1.02);
                    border-color: #e29a4d;
                    box-shadow: 0 8px 32px rgba(226,154,77,0.06);
                }

                .stats-section .stats-grid .stat-item .stat-icon {
                    font-size: 32px;
                    display: block;
                    margin-bottom: 8px;
                    animation: float 3s ease-in-out infinite;
                }

                .stats-section .stats-grid .stat-item .stat-number {
                    font-family: 'Fraunces', serif;
                    font-size: 34px;
                    font-weight: 700;
                    color: #1c1830;
                    display: block;
                    animation: countUp 0.8s ease both 0.3s;
                }

                .stats-section .stats-grid .stat-item .stat-number .accent {
                    color: #e29a4d;
                }

                .stats-section .stats-grid .stat-item .stat-label {
                    font-size: 14px;
                    color: #8a8676;
                    font-weight: 500;
                    margin-top: 4px;
                    display: block;
                }

                /* ===== SECTION ===== */
                .section {
                    padding: 80px 24px;
                    position: relative;
                }

                .section .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .section-head {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    margin-bottom: 40px;
                    gap: 16px;
                }

                .section-head .eyebrow {
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: #e29a4d;
                    margin-bottom: 6px;
                    display: inline-block;
                    background: rgba(226,154,77,0.08);
                    padding: 4px 16px;
                    border-radius: 16px;
                    animation: fadeInUp 0.5s ease both;
                }

                .section-head h2 {
                    font-family: 'Fraunces', serif;
                    font-size: 34px;
                    font-weight: 600;
                    color: #1c1830;
                    margin: 4px 0 0 0;
                    letter-spacing: -0.02em;
                    animation: fadeInUp 0.5s ease both 0.05s;
                }

                .section-head .text-link {
                    font-size: 14px;
                    font-weight: 500;
                    color: #e29a4d;
                    text-decoration: none;
                    transition: all 0.4s ease;
                    padding: 6px 14px;
                    border-radius: 8px;
                    white-space: nowrap;
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    animation: fadeInUp 0.5s ease both 0.1s;
                }

                .section-head .text-link:hover {
                    background: rgba(226,154,77,0.08);
                    transform: translateX(6px) scale(1.02);
                }

                .section-head .text-link .arrow {
                    transition: transform 0.3s ease;
                }

                .section-head .text-link:hover .arrow {
                    transform: translateX(6px);
                }

                /* ===== ENHANCED EVENT CARDS ===== */
                .event-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 32px;
                }

                .event-grid > * {
                    animation: fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                .event-grid > *:nth-child(1) { animation-delay: 0.10s; }
                .event-grid > *:nth-child(2) { animation-delay: 0.18s; }
                .event-grid > *:nth-child(3) { animation-delay: 0.26s; }

                .event-grid .event-card-wrapper {
                    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                    border-radius: 18px;
                    position: relative;
                    background: #ffffff;
                    border: 1px solid #eae7dd;
                    overflow: hidden;
                    box-shadow: 0 1px 2px rgba(28,24,48,0.03), 0 8px 24px -16px rgba(28,24,48,0.08);
                    animation: cardGlow 4s ease-in-out infinite;
                    transform-style: preserve-3d;
                    perspective: 800px;
                }

                .event-grid .event-card-wrapper::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #e29a4d, #e8b06a, #d48a3a, #e8b06a, #e29a4d);
                    background-size: 300% 100%;
                    opacity: 0;
                    transition: opacity 0.6s ease;
                    z-index: 2;
                    border-radius: 18px 18px 0 0;
                }

                .event-grid .event-card-wrapper:hover::before {
                    opacity: 1;
                    animation: shimmerGold 2.5s linear infinite;
                }

                .event-grid .event-card-wrapper:hover {
                    transform: translateY(-14px) scale(1.02) rotateX(2deg) rotateY(2deg);
                    box-shadow: 0 35px 90px rgba(28,24,48,0.12), 0 8px 24px rgba(28,24,48,0.05);
                    border-color: #e8b06a;
                }

                .event-grid .event-card-wrapper::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 18px;
                    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(226,154,77,0.06), transparent 60%);
                    opacity: 0;
                    transition: opacity 0.6s ease;
                    pointer-events: none;
                    z-index: 1;
                }

                .event-grid .event-card-wrapper:hover::after {
                    opacity: 1;
                }

                .event-grid .event-card-wrapper:active {
                    transform: translateY(-5px) scale(0.98);
                    transition-duration: 0.1s;
                }

                .event-grid .event-card-wrapper .shimmer-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        105deg,
                        transparent 30%,
                        rgba(255,215,180,0.05) 50%,
                        transparent 70%
                    );
                    transform: translateX(-100%);
                    transition: transform 0.8s ease;
                    pointer-events: none;
                    z-index: 1;
                }

                .event-grid .event-card-wrapper:hover .shimmer-overlay {
                    transform: translateX(100%);
                }

                .event-grid .event-card-wrapper .card-badge {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: #ffffff;
                    background: linear-gradient(135deg, #e29a4d, #d48a3a);
                    padding: 4px 16px;
                    border-radius: 12px;
                    z-index: 3;
                    opacity: 0;
                    transform: scale(0.8) translateY(-8px) rotate(-10deg);
                    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow: 0 4px 16px rgba(226,154,77,0.25);
                }

                .event-grid .event-card-wrapper:hover .card-badge {
                    opacity: 1;
                    transform: scale(1) translateY(0) rotate(0deg);
                }

                /* ===== BUTTONS INSIDE CARDS - GOLD THEME ===== */
                .event-grid .event-card-wrapper .btn,
                .event-grid .event-card-wrapper button,
                .event-grid .event-card-wrapper a.btn {
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                    border-radius: 10px;
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                    border: none;
                    padding: 8px 22px;
                    font-size: 13px;
                }

                .event-grid .event-card-wrapper .btn-primary,
                .event-grid .event-card-wrapper .btn.btn-primary {
                    background: linear-gradient(135deg, #e29a4d, #d48a3a, #c47a2a);
                    background-size: 200% 200%;
                    color: #ffffff;
                    box-shadow: 0 2px 16px rgba(226,154,77,0.25);
                    animation: btnPulse 3s ease-in-out infinite;
                }

                @keyframes btnPulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(226,154,77,0.2); }
                    50% { box-shadow: 0 0 20px 8px rgba(226,154,77,0.08); }
                }

                .event-grid .event-card-wrapper .btn-primary:hover,
                .event-grid .event-card-wrapper .btn.btn-primary:hover {
                    background: linear-gradient(135deg, #f0c27a, #e29a4d, #d48a3a);
                    background-size: 200% 200%;
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 8px 32px rgba(226,154,77,0.35);
                }

                .event-grid .event-card-wrapper .btn-primary::after,
                .event-grid .event-card-wrapper .btn.btn-primary::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
                    transform: translateX(-100%);
                    transition: transform 0.6s ease;
                    pointer-events: none;
                }

                .event-grid .event-card-wrapper .btn-primary:hover::after,
                .event-grid .event-card-wrapper .btn.btn-primary:hover::after {
                    transform: translateX(100%);
                }

                .event-grid .event-card-wrapper .btn-primary:active,
                .event-grid .event-card-wrapper .btn.btn-primary:active {
                    transform: translateY(0px) scale(0.95);
                }

                .event-grid .event-card-wrapper .btn-secondary,
                .event-grid .event-card-wrapper .btn-outline {
                    background: transparent;
                    color: #e29a4d;
                    border: 1.5px solid #e29a4d;
                }

                .event-grid .event-card-wrapper .btn-secondary:hover,
                .event-grid .event-card-wrapper .btn-outline:hover {
                    background: rgba(226,154,77,0.08);
                    border-color: #d48a3a;
                    color: #d48a3a;
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 4px 20px rgba(226,154,77,0.15);
                }

                .event-grid .event-card-wrapper .btn-light {
                    background: rgba(226,154,77,0.08);
                    color: #b8873a;
                    border: 1px solid rgba(226,154,77,0.15);
                }

                .event-grid .event-card-wrapper .btn-light:hover {
                    background: rgba(226,154,77,0.15);
                    border-color: rgba(226,154,77,0.3);
                    color: #a87a30;
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 4px 16px rgba(226,154,77,0.10);
                }

                .event-grid .event-card-wrapper .btn-success {
                    background: #e8f0e6;
                    color: #3c6b2e;
                    border: 1px solid #d4e6cc;
                }

                .event-grid .event-card-wrapper .btn-success:hover {
                    background: #dce8d8;
                    border-color: #b8d4ac;
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 4px 20px rgba(60,107,46,0.15);
                }

                .event-grid .event-card-wrapper .btn-danger {
                    background: #fdf2f0;
                    color: #b33a2e;
                    border: 1px solid #f5d6d0;
                }

                .event-grid .event-card-wrapper .btn-danger:hover {
                    background: #fce8e5;
                    border-color: #ecc0b8;
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 4px 20px rgba(179,58,46,0.15);
                }

                /* ===== TESTIMONIALS SECTION ===== */
                .testimonial-section {
                    padding: 80px 24px;
                    background: linear-gradient(160deg, #f7f6f2 0%, #f0ede4 100%);
                    border-top: 1px solid #eae7dd;
                    border-bottom: 1px solid #eae7dd;
                }

                .testimonial-section .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .testimonial-section .testimonial-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    margin-top: 32px;
                }

                .testimonial-section .testimonial-grid .testimonial-item {
                    background: #ffffff;
                    border: 1px solid #eae7dd;
                    border-radius: 16px;
                    padding: 28px 24px;
                    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                    animation: slideUp 0.6s ease both;
                    position: relative;
                    overflow: hidden;
                }

                .testimonial-section .testimonial-grid .testimonial-item::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #e29a4d, #f0c27a, #e29a4d);
                    background-size: 200% 100%;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }

                .testimonial-section .testimonial-grid .testimonial-item:hover::before {
                    opacity: 1;
                    animation: shimmerGold 2s linear infinite;
                }

                .testimonial-section .testimonial-grid .testimonial-item:nth-child(1) { animation-delay: 0.05s; }
                .testimonial-section .testimonial-grid .testimonial-item:nth-child(2) { animation-delay: 0.10s; }
                .testimonial-section .testimonial-grid .testimonial-item:nth-child(3) { animation-delay: 0.15s; }

                .testimonial-section .testimonial-grid .testimonial-item:hover {
                    transform: translateY(-8px) scale(1.01);
                    border-color: #e8b06a;
                    box-shadow: 0 8px 32px rgba(226,154,77,0.06);
                }

                .testimonial-section .testimonial-grid .testimonial-item .quote {
                    font-size: 14px;
                    color: #5a564a;
                    line-height: 1.7;
                    font-style: italic;
                    margin: 0 0 12px 0;
                }

                .testimonial-section .testimonial-grid .testimonial-item .quote::before {
                    content: '"';
                    font-size: 28px;
                    color: #e29a4d;
                    opacity: 0.3;
                    margin-right: 2px;
                }

                .testimonial-section .testimonial-grid .testimonial-item .quote::after {
                    content: '"';
                    font-size: 28px;
                    color: #e29a4d;
                    opacity: 0.3;
                    margin-left: 2px;
                }

                .testimonial-section .testimonial-grid .testimonial-item .author {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-top: 12px;
                    padding-top: 12px;
                    border-top: 1px solid #f0eee4;
                }

                .testimonial-section .testimonial-grid .testimonial-item .author .avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #e29a4d, #d48a3a);
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    font-size: 16px;
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                }

                .testimonial-section .testimonial-grid .testimonial-item:hover .author .avatar {
                    transform: scale(1.1) rotate(-5deg);
                }

                .testimonial-section .testimonial-grid .testimonial-item .author .info strong {
                    font-size: 13px;
                    color: #1c1830;
                    display: block;
                }

                .testimonial-section .testimonial-grid .testimonial-item .author .info span {
                    font-size: 12px;
                    color: #8a8676;
                }

                /* ===== FEATURE SECTION ===== */
                .soft-section {
                    background: linear-gradient(160deg, #f0ede4 0%, #e8e4d8 100%);
                    border-top: 1px solid #eae7dd;
                    border-bottom: 1px solid #eae7dd;
                    position: relative;
                    overflow: hidden;
                }

                .soft-section::before {
                    content: '';
                    position: absolute;
                    top: -30%;
                    right: -10%;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(226,154,77,0.03) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: float 10s ease-in-out infinite;
                    pointer-events: none;
                }

                .soft-section::after {
                    content: '';
                    position: absolute;
                    bottom: -20%;
                    left: -5%;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(226,154,77,0.02) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: floatSlow 12s ease-in-out infinite 1.5s;
                    pointer-events: none;
                }

                .feature-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 64px;
                    align-items: start;
                    position: relative;
                    z-index: 1;
                }

                .feature-copy .eyebrow {
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: #e29a4d;
                    display: inline-block;
                    background: rgba(226,154,77,0.08);
                    padding: 4px 16px;
                    border-radius: 16px;
                    margin-bottom: 12px;
                    animation: fadeInUp 0.5s ease both;
                }

                .feature-copy h2 {
                    font-family: 'Fraunces', serif;
                    font-size: 34px;
                    font-weight: 600;
                    color: #1c1830;
                    margin: 0 0 16px 0;
                    letter-spacing: -0.02em;
                    line-height: 1.15;
                    animation: fadeInUp 0.5s ease both 0.05s;
                }

                .feature-copy p {
                    font-size: 16.5px;
                    color: #5a564a;
                    line-height: 1.8;
                    animation: fadeInUp 0.5s ease both 0.1s;
                }

                .feature-list {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .feature-list > div {
                    background: rgba(255,255,255,0.9);
                    backdrop-filter: blur(12px);
                    border: 1px solid #eae7dd;
                    border-radius: 18px;
                    padding: 24px 30px;
                    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                    animation: slideInRight 0.6s ease both;
                    position: relative;
                    overflow: hidden;
                }

                .feature-list > div::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    width: 4px;
                    background: linear-gradient(180deg, #e29a4d, #e8b06a);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }

                .feature-list > div:hover::before {
                    opacity: 1;
                }

                .feature-list > div:nth-child(1) { animation-delay: 0.12s; }
                .feature-list > div:nth-child(2) { animation-delay: 0.20s; }
                .feature-list > div:nth-child(3) { animation-delay: 0.28s; }

                .feature-list > div:hover {
                    transform: translateX(12px) translateY(-6px);
                    border-color: #e8b06a;
                    box-shadow: 0 20px 60px rgba(28,24,48,0.06);
                }

                .feature-list > div .num {
                    font-size: 12px;
                    font-weight: 700;
                    color: #e29a4d;
                    letter-spacing: 0.08em;
                    display: inline-block;
                    background: rgba(226,154,77,0.08);
                    padding: 3px 14px;
                    border-radius: 12px;
                    margin-bottom: 8px;
                    transition: all 0.3s ease;
                }

                .feature-list > div:hover .num {
                    background: rgba(226,154,77,0.15);
                    transform: scale(1.05);
                }

                .feature-list > div strong {
                    font-size: 18px;
                    font-weight: 600;
                    color: #1c1830;
                    display: block;
                }

                .feature-list > div p {
                    font-size: 13.5px;
                    color: #8a8676;
                    margin: 6px 0 0 0;
                    line-height: 1.6;
                }

                /* ===== CTA SECTION ===== */
                .cta-section {
                    padding: 80px 24px;
                    background: linear-gradient(160deg, #1c1830 0%, #2c2648 100%);
                    position: relative;
                    overflow: hidden;
                }

                .cta-section::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -20%;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(226,154,77,0.06) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: float 10s ease-in-out infinite;
                    pointer-events: none;
                }

                .cta-section::after {
                    content: '';
                    position: absolute;
                    bottom: -50%;
                    left: -20%;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(226,154,77,0.04) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: floatSlow 12s ease-in-out infinite 1.5s;
                    pointer-events: none;
                }

                .cta-section .container {
                    max-width: 900px;
                    margin: 0 auto;
                    text-align: center;
                    position: relative;
                    z-index: 1;
                }

                .cta-section .gold-line {
                    width: 60px;
                    height: 3px;
                    background: linear-gradient(90deg, #e29a4d, #f0c27a);
                    margin: 0 auto 16px;
                    border-radius: 2px;
                    animation: shimmerGold 2s linear infinite;
                }

                .cta-section h2 {
                    font-family: 'Fraunces', serif;
                    font-size: 38px;
                    font-weight: 700;
                    color: #ffffff;
                    margin: 0 0 12px 0;
                    letter-spacing: -0.02em;
                    animation: fadeInUp 0.6s ease both;
                }

                .cta-section p {
                    font-size: 17px;
                    color: rgba(255,255,255,0.6);
                    line-height: 1.7;
                    max-width: 600px;
                    margin: 0 auto 28px;
                    animation: fadeInUp 0.6s ease both 0.1s;
                }

                .cta-section .btn {
                    font-family: 'Inter', sans-serif;
                    font-size: 16px;
                    font-weight: 600;
                    padding: 16px 40px;
                    border-radius: 12px;
                    border: 1px solid transparent;
                    cursor: pointer;
                    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: linear-gradient(135deg, #e29a4d, #d48a3a);
                    color: #ffffff;
                    box-shadow: 0 4px 20px rgba(226,154,77,0.25);
                    animation: bounceIn 0.8s ease both 0.3s;
                }

                .cta-section .btn:hover {
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 16px 48px rgba(226,154,77,0.35);
                }

                .cta-section .btn .arrow {
                    transition: transform 0.3s ease;
                }

                .cta-section .btn:hover .arrow {
                    transform: translateX(6px);
                }

                /* ===== RESPONSIVE ===== */
                @media (max-width: 820px) {
                    .hero-section .container {
                        grid-template-columns: 1fr;
                        gap: 44px;
                    }

                    .hero-section h1 {
                        font-size: 40px;
                    }

                    .hero-section p {
                        font-size: 16px;
                    }

                    .hero-visual {
                        order: -1;
                    }

                    .hero-panel {
                        max-width: 100%;
                        padding: 30px 26px;
                    }

                    .stats-section .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 16px;
                    }

                    .testimonial-section .testimonial-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 20px;
                    }

                    .feature-grid {
                        grid-template-columns: 1fr;
                        gap: 40px;
                    }

                    .section-head {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .section {
                        padding: 56px 20px;
                    }

                    .hero-section {
                        padding: 48px 20px 64px;
                    }

                    .event-grid {
                        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
                        gap: 24px;
                    }

                    .cta-section h2 {
                        font-size: 30px;
                    }

                    .hero-section .deco-dot.d3,
                    .hero-section .deco-dot.d4 {
                        display: none;
                    }

                    .hero-visual .orbit-ring.r3 {
                        display: none;
                    }
                }

                @media (max-width: 480px) {
                    .hero-section h1 {
                        font-size: 32px;
                    }

                    .hero-actions .btn {
                        font-size: 13px;
                        padding: 12px 24px;
                        width: 100%;
                        justify-content: center;
                    }

                    .hero-actions {
                        flex-direction: column;
                    }

                    .hero-points {
                        flex-direction: column;
                        gap: 12px;
                    }

                    .hero-panel {
                        padding: 22px 18px;
                        border-radius: 20px;
                    }

                    .stats-section .stats-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 12px;
                    }

                    .stats-section .stats-grid .stat-item .stat-number {
                        font-size: 26px;
                    }

                    .testimonial-section .testimonial-grid {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }

                    .cta-section h2 {
                        font-size: 26px;
                    }

                    .cta-section p {
                        font-size: 15px;
                    }

                    .cta-section .btn {
                        font-size: 14px;
                        padding: 14px 28px;
                    }

                    .feature-copy h2 {
                        font-size: 26px;
                    }

                    .section-head h2 {
                        font-size: 26px;
                    }

                    .event-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }

                    .feature-list > div {
                        padding: 18px 20px;
                    }

                    .hero-section .deco-dot {
                        display: none;
                    }

                    .hero-visual .orbit-ring {
                        display: none;
                    }

                    .hero-section .bg-grid {
                        display: none;
                    }

                    .hero-section .particle {
                        display: none;
                    }

                    .event-grid .event-card-wrapper:hover {
                        transform: translateY(-5px) scale(1.005);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation: none !important;
                        transition: none !important;
                    }
                    .hero-actions .btn-primary::after {
                        display: none !important;
                    }
                    .event-grid .event-card-wrapper {
                        animation: none !important;
                    }
                    .event-grid .event-card-wrapper::before {
                        display: none !important;
                    }
                    .event-grid .event-card-wrapper::after {
                        display: none !important;
                    }
                    .event-grid .event-card-wrapper .shimmer-overlay {
                        display: none !important;
                    }
                    .event-grid .event-card-wrapper .btn-primary {
                        animation: none !important;
                    }
                    .feature-list > div::before {
                        display: none !important;
                    }
                    .hero-section {
                        animation: none !important;
                    }
                    .stats-section .stats-grid .stat-item {
                        animation: none !important;
                    }
                }
            `}</style>

            {/* ===== HERO SECTION ===== */}
            <section className="hero-section">
                <div className="bg-grid" />
                <div className="particle p1" />
                <div className="particle p2" />
                <div className="particle p3" />
                <div className="particle p4" />
                <div className="deco-dot d1" />
                <div className="deco-dot d2" />
                <div className="deco-dot d3" />
                <div className="deco-dot d4" />

                <div className="container hero-grid">
                    <div>
                        <div className="eyebrow">✦ Smart Campus Events</div>
                        <h1>
                            Bring every event together<br />
                            in one <span className="highlight">simple place.</span>
                        </h1>
                        <p>
                            EventSphere helps students discover events, organizers manage 
                            registrations and admins keep the whole campus experience organized.
                        </p>
                        <div className="hero-actions">
                            <Link className="btn btn-primary btn-lg" to="/events">
                                Explore events <span className="arrow">→</span>
                            </Link>
                            <Link className="btn btn-light btn-lg" to="/register">
                                Create an account
                            </Link>
                        </div>
                        <div className="hero-points">
                            <span>
                                <span className="check">✓</span>
                                Real-time registrations
                            </span>
                            <span>
                                <span className="check">✓</span>
                                Attendance &amp; certificates
                            </span>
                            <span>
                                <span className="check">✓</span>
                                Role-based dashboards
                            </span>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="orbit-ring r1" />
                        <div className="orbit-ring r2" />
                        <div className="orbit-ring r3" />

                        <div className="hero-panel">
                            <span className="live-pill">
                                <span className="dot" />
                                LIVE SYSTEM
                            </span>
                            <h3>Campus Event Hub</h3>
                            <div className="hero-mini">
                                <div>
                                    <strong>24</strong>
                                    <small>Events</small>
                                </div>
                                <div>
                                    <strong>1.2<span className="accent">k</span></strong>
                                    <small>Students</small>
                                </div>
                                <div>
                                    <strong>98<span className="accent">%</span></strong>
                                    <small>Happy</small>
                                </div>
                            </div>
                            <div className="hero-ticket">
                                <span className="label">★ Upcoming</span>
                                <strong>Tech Innovation Summit</strong>
                                <small>10:00 AM · Main Auditorium</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

     

            {/* ===== EVENTS SECTION ===== */}
            <section className="section">
                <div className="container">
                    <div className="section-head">
                        <div>
                            <div className="eyebrow">📅 Upcoming</div>
                            <h2>Events worth showing up for.</h2>
                        </div>
                        <Link className="text-link" to="/events">
                            View all <span className="arrow">→</span>
                        </Link>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="event-grid">
                            {events.map(e => (
                                <div key={e._id} className="event-card-wrapper">
                                    <div className="shimmer-overlay" />
                                    <EventCard event={e} />
                                    <span className="card-badge">Featured</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ===== TESTIMONIALS SECTION ===== */}
            <section className="testimonial-section">
                <div className="container">
                    <div className="section-head">
                        <div>
                            <div className="eyebrow">💬 Testimonials</div>
                            <h2>What our community says.</h2>
                        </div>
                    </div>
                    <div className="testimonial-grid">
                        <div className="testimonial-item">
                            <p className="quote">EventSphere made it so easy to register for events and track my participation. I never miss a campus event now!</p>
                            <div className="author">
                                <div className="avatar">A</div>
                                <div className="info">
                                    <strong>Ahmed Khan</strong>
                                    <span>Student · Computer Science</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-item">
                            <p className="quote">Managing events used to be chaotic. EventSphere streamlined everything - from registration to certificates.</p>
                            <div className="author">
                                <div className="avatar">S</div>
                                <div className="info">
                                    <strong>Sarah Ahmed</strong>
                                    <span>Event Organizer</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-item">
                            <p className="quote">The admin dashboard gives me complete control. Approving events and managing users has never been easier.</p>
                            <div className="author">
                                <div className="avatar">M</div>
                                <div className="info">
                                    <strong>Muhammad Ali</strong>
                                    <span>System Administrator</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FEATURE SECTION ===== */}
            <section className="section soft-section">
                <div className="container feature-grid">
                    <div className="feature-copy">
                        <div className="eyebrow">✦ Why EventSphere</div>
                        <h2>Designed around how campus events actually work.</h2>
                        <p>
                            From the first event idea to the final certificate, each role 
                            gets the tools it needs without clutter.
                        </p>
                    </div>

                    <div className="feature-list">
                        <div>
                            <span className="num">01</span>
                            <strong>Discover</strong>
                            <p>Students can browse approved events and register in seconds.</p>
                        </div>
                        <div>
                            <span className="num">02</span>
                            <strong>Organize</strong>
                            <p>Organizers manage events, participants, attendance and gallery media.</p>
                        </div>
                        <div>
                            <span className="num">03</span>
                            <strong>Verify</strong>
                            <p>Attendance turns into downloadable participation certificates.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="cta-section">
                <div className="container">
                    <div className="gold-line" />
                    <h2>Ready to get started?</h2>
                    <p>
                        Join thousands of students and organizers making campus events 
                        more engaging and organized.
                    </p>
                    <Link className="btn" to="/register">
                        Create your account <span className="arrow">→</span>
                    </Link>
                </div>
            </section>
        </>
    );
}