import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const dashboard = (role) => {
  if (role === "admin") return "/admin";
  if (role === "organizer") return "/organizer";
  return "/participant";
};

const roleLabel = (role) => {
  if (role === "admin") return "ADMIN";
  if (role === "organizer") return "ORGANIZER";
  return "PARTICIPANT";
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');

        /* ===== ANIMATIONS ===== */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(226,154,77,0.1); }
          50% { box-shadow: 0 0 40px rgba(226,154,77,0.2); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }

        /* ===== NAVBAR ===== */
        .navbar {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(234, 231, 221, 0.3);
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 1000;
          animation: slideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          box-shadow: 0 1px 4px rgba(28, 24, 48, 0.02), 0 8px 24px rgba(28, 24, 48, 0.02);
          transition: box-shadow 0.3s ease;
        }

        .navbar.scrolled {
          box-shadow: 0 1px 4px rgba(28, 24, 48, 0.04), 0 8px 32px rgba(28, 24, 48, 0.06);
          background: rgba(255, 255, 255, 0.92);
        }

        .navbar .container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 74px;
        }

        /* ===== BRAND ===== */
        .navbar .brand {
          font-family: 'Fraunces', serif;
          font-size: 24px;
          font-weight: 700;
          color: #1c1830;
          text-decoration: none;
          letter-spacing: -0.03em;
          display: flex;
          align-items: center;
          gap: 2px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          flex-shrink: 0;
          position: relative;
        }

        .navbar .brand:hover {
          transform: scale(1.03);
        }

        .navbar .brand .brand-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #e29a4d, #d48a3a);
          border-radius: 8px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 800;
          margin-right: 6px;
          box-shadow: 0 4px 12px rgba(226, 154, 77, 0.25);
          transition: all 0.4s ease;
        }

        .navbar .brand:hover .brand-icon {
          transform: rotate(-8deg) scale(1.05);
          box-shadow: 0 6px 20px rgba(226, 154, 77, 0.35);
        }

        .navbar .brand span {
          color: #e29a4d;
          position: relative;
        }

        .navbar .brand span::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #e29a4d, #e8b06a);
          border-radius: 2px;
          opacity: 0.6;
        }

        .navbar .brand .brand-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          background: #e29a4d;
          border-radius: 50%;
          margin-left: 2px;
          animation: pulse 2s ease-in-out infinite;
        }

        /* ===== NAV LINKS ===== */
        .navbar .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          margin: 0 24px;
        }

        .navbar .nav-links a {
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: #6a665a;
          text-decoration: none;
          padding: 7px 16px;
          border-radius: 10px;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }

        .navbar .nav-links a::before {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          width: 0;
          height: 2.5px;
          background: linear-gradient(90deg, #e29a4d, #e8b06a);
          border-radius: 2px;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform: translateX(-50%);
          opacity: 0;
        }

        .navbar .nav-links a:hover::before,
        .navbar .nav-links a.active::before {
          width: 60%;
          opacity: 1;
        }

        .navbar .nav-links a:hover {
          color: #1c1830;
          background: rgba(226, 154, 77, 0.05);
          transform: translateY(-1px);
        }

        .navbar .nav-links a.active {
          color: #1c1830;
          font-weight: 600;
          background: rgba(226, 154, 77, 0.07);
        }

        .navbar .nav-links a .nav-icon {
          margin-right: 6px;
          font-size: 13px;
        }

        /* ===== NAV ACTIONS ===== */
        .navbar .nav-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        /* ===== USER ROLE ===== */
        .navbar .user-role {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-right: 12px;
          margin-right: 6px;
          border-right: 1px solid rgba(234, 231, 221, 0.5);
        }

        .navbar .user-role .user-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          flex-shrink: 0;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #1c1830, #2c2648);
          box-shadow: 0 2px 8px rgba(28, 24, 48, 0.12);
        }

        .navbar .user-role .user-avatar.admin {
          background: linear-gradient(135deg, #b33a2e, #d94f3f);
        }

        .navbar .user-role .user-avatar.organizer {
          background: linear-gradient(135deg, #b8873a, #d4a24a);
        }

        .navbar .user-role .user-avatar.participant {
          background: linear-gradient(135deg, #3c6b2e, #4f8a3d);
        }

        .navbar .user-role .user-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .navbar .user-role .user-info .user-name {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #1c1830;
          line-height: 1.2;
        }

        .navbar .user-role .user-info .role-badge {
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 1px 10px;
          border-radius: 8px;
          display: inline-block;
          width: fit-content;
        }

        .navbar .user-role .user-info .role-badge.role-admin {
          background: #fdf2f0;
          color: #b33a2e;
          border: 1px solid #f5d6d0;
        }

        .navbar .user-role .user-info .role-badge.role-organizer {
          background: #fdf6ed;
          color: #b8873a;
          border: 1px solid #f5e8d0;
        }

        .navbar .user-role .user-info .role-badge.role-participant {
          background: #e8f0e6;
          color: #3c6b2e;
          border: 1px solid #d4e6cc;
        }

        /* ===== BUTTONS ===== */
        .navbar .btn {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 20px;
          border-radius: 10px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
        }

        /* Ghost Button */
        .navbar .btn-ghost {
          background: transparent;
          color: #6a665a;
          border-color: transparent;
        }

        .navbar .btn-ghost:hover {
          color: #1c1830;
          background: rgba(226, 154, 77, 0.06);
          transform: translateY(-2px);
        }

        .navbar .btn-ghost::after {
          display: none;
        }

        /* Dark Button */
        .navbar .btn-dark {
          background: #1c1830;
          color: #ffffff;
          border-color: #1c1830;
        }

        .navbar .btn-dark::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }

        .navbar .btn-dark:hover::after {
          transform: translateX(100%);
        }

        .navbar .btn-dark:hover {
          background: #2c2648;
          border-color: #2c2648;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 24px rgba(28, 24, 48, 0.25);
        }

        .navbar .btn-dark:active {
          transform: translateY(0px) scale(0.97);
        }

        /* Primary Button */
        .navbar .btn-primary {
          background: linear-gradient(135deg, #e29a4d, #d48a3a);
          color: #ffffff;
          border-color: #e29a4d;
          box-shadow: 0 2px 12px rgba(226, 154, 77, 0.25);
          animation: glow 3s ease-in-out infinite;
        }

        .navbar .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }

        .navbar .btn-primary:hover::after {
          transform: translateX(100%);
        }

        .navbar .btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 32px rgba(226, 154, 77, 0.35);
        }

        .navbar .btn-primary:active {
          transform: translateY(0px) scale(0.97);
        }

        .navbar .btn .btn-icon {
          font-size: 14px;
          line-height: 1;
        }

        .navbar .btn .logout-arrow {
          transition: transform 0.3s ease;
        }

        .navbar .btn-dark:hover .logout-arrow {
          transform: translateX(3px);
        }

        /* ===== MOBILE TOGGLE ===== */
        .navbar .mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
          border: none;
          background: transparent;
          width: 32px;
          height: 28px;
          justify-content: center;
          border-radius: 6px;
          transition: background 0.3s ease;
        }

        .navbar .mobile-toggle:hover {
          background: rgba(226, 154, 77, 0.06);
        }

        .navbar .mobile-toggle span {
          display: block;
          height: 2px;
          background: #1c1830;
          border-radius: 2px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          width: 100%;
          transform-origin: center;
        }

        .navbar .mobile-toggle span:nth-child(2) {
          width: 75%;
          transition-delay: 0.05s;
        }

        .navbar .mobile-toggle:hover span:nth-child(2) {
          width: 100%;
        }

        .navbar .mobile-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .navbar .mobile-toggle.active span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
          width: 0;
        }

        .navbar .mobile-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 820px) {
          .navbar .mobile-toggle {
            display: flex;
          }

          .navbar .nav-links {
            position: absolute;
            top: 74px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 20px 24px 28px;
            gap: 2px;
            border-bottom: 1px solid rgba(234, 231, 221, 0.3);
            opacity: 0;
            transform: translateY(-12px) scale(0.98);
            pointer-events: none;
            transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
            margin: 0;
            box-shadow: 0 24px 48px rgba(28, 24, 48, 0.06);
            border-radius: 0 0 16px 16px;
          }

          .navbar .nav-links.open {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: all;
          }

          .navbar .nav-links a {
            padding: 12px 18px;
            width: 100%;
            text-align: center;
            font-size: 14.5px;
            border-radius: 8px;
          }

          .navbar .nav-links a::before {
            display: none;
          }

          .navbar .nav-links a.active {
            background: rgba(226, 154, 77, 0.08);
          }

          .navbar .container {
            height: 66px;
          }

          .navbar {
            padding: 0 16px;
          }

          .navbar .brand {
            font-size: 20px;
          }

          .navbar .brand .brand-icon {
            width: 28px;
            height: 28px;
            font-size: 12px;
          }

          .navbar .nav-actions .btn {
            font-size: 12px;
            padding: 6px 14px;
          }

          .navbar .user-role .user-avatar {
            width: 30px;
            height: 30px;
            font-size: 12px;
          }

          .navbar .user-role .user-info .user-name {
            font-size: 12px;
          }

          .navbar .user-role .user-info .role-badge {
            font-size: 7.5px;
            padding: 1px 8px;
          }

          .navbar .user-role {
            gap: 8px;
            padding-right: 8px;
          }

          .navbar .nav-links {
            top: 66px;
          }
        }

        @media (max-width: 480px) {
          .navbar .brand {
            font-size: 17px;
          }

          .navbar .brand .brand-icon {
            width: 24px;
            height: 24px;
            font-size: 10px;
            margin-right: 4px;
          }

          .navbar .nav-actions .btn {
            font-size: 11px;
            padding: 5px 12px;
            border-radius: 8px;
          }

          .navbar .user-role {
            gap: 6px;
            padding-right: 6px;
          }

          .navbar .user-role .user-avatar {
            width: 26px;
            height: 26px;
            font-size: 10px;
          }

          .navbar .user-role .user-info .user-name {
            font-size: 11px;
          }

          .navbar .user-role .user-info .role-badge {
            font-size: 7px;
            padding: 0px 6px;
          }

          .navbar .container {
            height: 58px;
          }

          .navbar .nav-links {
            top: 58px;
            padding: 16px 16px 22px;
          }

          .navbar .nav-links a {
            font-size: 13.5px;
            padding: 10px 16px;
          }

          .navbar .btn .btn-icon {
            font-size: 12px;
          }

          .navbar .btn-primary {
            box-shadow: none;
            animation: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .navbar * {
            animation: none !important;
            transition: none !important;
          }
          .navbar .btn-primary {
            animation: none !important;
          }
          .navbar .btn::after {
            display: none !important;
          }
        }
      `}</style>

      <div className="container nav-inner">
        {/* Brand */}
        <Link className="brand" to="/">
          <span className="brand-icon">ES</span>
          Event<span>Sphere</span>
          <span className="brand-dot" />
        </Link>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={(e) => {
          const nav = e.currentTarget.parentElement.querySelector('.nav-links');
          const toggle = e.currentTarget;
          nav.classList.toggle('open');
          toggle.classList.toggle('active');
        }}>
          <span />
          <span />
          <span />
        </button>

        {/* Public Navigation */}
        <nav className="nav-links">
          <NavLink to="/" onClick={(e) => {
            const nav = e.currentTarget.closest('.nav-links');
            nav.classList.remove('open');
            nav.parentElement.querySelector('.mobile-toggle').classList.remove('active');
          }}>
            <span className="nav-icon">🏠</span>
            Home
          </NavLink>
          <NavLink to="/events" onClick={(e) => {
            const nav = e.currentTarget.closest('.nav-links');
            nav.classList.remove('open');
            nav.parentElement.querySelector('.mobile-toggle').classList.remove('active');
          }}>
            <span className="nav-icon">📅</span>
            Events
          </NavLink>
          <NavLink to="/gallery" onClick={(e) => {
            const nav = e.currentTarget.closest('.nav-links');
            nav.classList.remove('open');
            nav.parentElement.querySelector('.mobile-toggle').classList.remove('active');
          }}>
            <span className="nav-icon">🖼️</span>
            Gallery
          </NavLink>
          <NavLink to="/about" onClick={(e) => {
            const nav = e.currentTarget.closest('.nav-links');
            nav.classList.remove('open');
            nav.parentElement.querySelector('.mobile-toggle').classList.remove('active');
          }}>
            <span className="nav-icon">ℹ️</span>
            About
          </NavLink>
          <NavLink to="/contact" onClick={(e) => {
            const nav = e.currentTarget.closest('.nav-links');
            nav.classList.remove('open');
            nav.parentElement.querySelector('.mobile-toggle').classList.remove('active');
          }}>
            <span className="nav-icon">✉️</span>
            Contact
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="nav-actions">
          {user ? (
            <>
              <div className="user-role">
                <span className={`user-avatar ${user.role}`}>
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
                <div className="user-info">
                  <span className="user-name">
                    {user.name || "User"}
                  </span>
                  <span className={`role-badge role-${user.role}`}>
                    {roleLabel(user.role)}
                  </span>
                </div>
              </div>

              <Link
                className="btn btn-ghost"
                to={dashboard(user.role)}
              >
                Dashboard
              </Link>

              <button
                className="btn btn-dark"
                onClick={handleLogout}
              >
                <span className="btn-icon logout-arrow">→</span>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-ghost" to="/login">
                Login
              </Link>

              <Link className="btn btn-primary" to="/register">
                <span className="btn-icon">✨</span>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}