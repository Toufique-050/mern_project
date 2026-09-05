import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Loader from "../../components/common/Loader";
import Rating from "../../components/feedback/Rating";
import { getAdminFeedback } from "../../services/adminService";
import { updateFeedbackVisibility } from "../../services/feedbackService";
import { formatDate, errorMessage } from "../../utils/helpers";

export default function ManageFeedback() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");

  const loadFeedback = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminFeedback();

      setItems(data.feedback || []);
    } catch (error) {
      console.error("Admin feedback error:", error);
      setError(errorMessage(error, "Unable to load feedback."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const toggleVisibility = async (feedback) => {
    try {
      setBusy(feedback._id);

      await updateFeedbackVisibility(
        feedback._id,
        !feedback.isVisible
      );

      await loadFeedback();
    } catch (error) {
      console.error("Feedback visibility error:", error);
      alert(errorMessage(error));
    } finally {
      setBusy("");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="dashboard-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .dashboard-page {
          min-height: 100vh;
          background: #f7f6f2;
          font-family: 'Inter', sans-serif;
          padding: 44px 24px 64px;
        }

        .dashboard-page .container {
          max-width: 880px;
          margin: 0 auto;
        }

        .dashboard-page .dash-header-wrap {
          animation: fadeInUp 0.4s ease both;
        }

        .dashboard-page .alert {
          margin-top: 24px;
          padding: 14px 20px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          animation: slideIn 0.3s ease both;
        }

        .dashboard-page .alert.error {
          background: #fdf2f0;
          border: 1px solid #f5d6d0;
          color: #b33a2e;
        }

        .dashboard-page .empty-state {
          margin-top: 40px;
          text-align: center;
          padding: 56px 32px;
          background: #ffffff;
          border: 1px solid #eae7dd;
          border-radius: 16px;
          font-size: 13.5px;
          color: #8a8676;
          line-height: 1.6;
          animation: fadeInUp 0.4s ease both;
        }

        .dashboard-page .empty-state::before {
          content: "💬";
          display: block;
          font-size: 36px;
          margin-bottom: 12px;
          opacity: 0.5;
        }

        .dashboard-page .feedback-list {
          margin-top: 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .dashboard-page .feedback-admin {
          background: #ffffff;
          border: 1px solid #eae7dd;
          border-radius: 14px;
          padding: 20px 24px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          transition: all 0.25s ease;
          animation: fadeInUp 0.4s ease both;
          box-shadow: 0 1px 2px rgba(28,24,48,0.03);
        }

        .dashboard-page .feedback-admin:nth-child(1) { animation-delay: 0.05s; }
        .dashboard-page .feedback-admin:nth-child(2) { animation-delay: 0.08s; }
        .dashboard-page .feedback-admin:nth-child(3) { animation-delay: 0.11s; }
        .dashboard-page .feedback-admin:nth-child(4) { animation-delay: 0.14s; }
        .dashboard-page .feedback-admin:nth-child(5) { animation-delay: 0.17s; }
        .dashboard-page .feedback-admin:nth-child(6) { animation-delay: 0.20s; }
        .dashboard-page .feedback-admin:nth-child(7) { animation-delay: 0.23s; }
        .dashboard-page .feedback-admin:nth-child(8) { animation-delay: 0.26s; }
        .dashboard-page .feedback-admin:nth-child(9) { animation-delay: 0.29s; }
        .dashboard-page .feedback-admin:nth-child(10) { animation-delay: 0.32s; }

        .dashboard-page .feedback-admin:hover {
          border-color: #d6d0bf;
          box-shadow: 0 4px 16px rgba(28,24,48,0.07);
          transform: translateY(-2px);
        }

        .dashboard-page .feedback-admin:active {
          transform: translateY(0px) scale(0.998);
        }

        .dashboard-page .feedback-admin-content {
          flex: 1;
          min-width: 0;
        }

        .dashboard-page .panel-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }

        .dashboard-page .panel-head h3 {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #1c1830;
          margin: 0 0 4px 0;
          letter-spacing: -0.01em;
        }

        .dashboard-page .panel-head span {
          font-size: 12.5px;
          color: #8a8676;
        }

        .dashboard-page .panel-head .rating-wrap {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .dashboard-page .feedback-admin-content > p {
          font-size: 13.5px;
          color: #34321f;
          line-height: 1.6;
          margin: 0 0 12px 0;
          padding: 10px 14px;
          background: #faf8f2;
          border-radius: 8px;
          border-left: 3px solid #e29a4d;
        }

        .dashboard-page .feedback-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 16px;
        }

        .dashboard-page .feedback-meta span {
          font-size: 12px;
          color: #8a8676;
          background: #f7f6f2;
          padding: 3px 10px;
          border-radius: 12px;
          border: 1px solid #f0eee4;
        }

        .dashboard-page .feedback-meta span::before {
          content: "★";
          color: #e29a4d;
          margin-right: 4px;
          font-size: 11px;
        }

        .dashboard-page .btn {
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          padding: 8px 20px;
          border: 1px solid #e0ddd4;
          border-radius: 8px;
          background: #ffffff;
          color: #1c1830;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .dashboard-page .btn:hover:not(:disabled) {
          border-color: #d0cbbc;
          background: #faf8f2;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(28,24,48,0.06);
        }

        .dashboard-page .btn:active:not(:disabled) {
          transform: translateY(0px) scale(0.97);
        }

        .dashboard-page .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .dashboard-page .btn .spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid #e0ddd4;
          border-top-color: #e29a4d;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .dashboard-page .feedback-admin.hidden {
          opacity: 0.5;
          border-color: #eeeadd;
        }

        .dashboard-page .feedback-admin.hidden .panel-head h3 {
          color: #8a8676;
        }

        .dashboard-page .feedback-admin.hidden > p {
          opacity: 0.6;
        }

        @media (max-width: 640px) {
          .dashboard-page {
            padding: 24px 16px 40px;
          }

          .dashboard-page .feedback-admin {
            flex-direction: column;
            padding: 16px 18px;
          }

          .dashboard-page .btn {
            width: 100%;
            text-align: center;
            margin-top: 8px;
          }

          .dashboard-page .panel-head {
            flex-direction: column;
            align-items: flex-start;
          }

          .dashboard-page .panel-head .rating-wrap {
            align-self: flex-start;
          }

          .dashboard-page .feedback-meta {
            gap: 4px 10px;
          }

          .dashboard-page .feedback-meta span {
            font-size: 11px;
            padding: 2px 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dashboard-page * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="container">
        <div className="dash-header-wrap">
          <DashboardHeader
            eyebrow="ADMIN"
            title="Manage feedback"
            description="Review participant feedback and control its visibility."
          />
        </div>

        {error && (
          <div className="alert error">
            {error}
          </div>
        )}

        {!error && items.length === 0 && (
          <div className="empty-state">
            No feedback records found.
          </div>
        )}

        <div className="feedback-list">
          {items.map((feedback) => (
            <div
              className={`panel feedback-admin ${!feedback.isVisible ? 'hidden' : ''}`}
              key={feedback._id}
            >
              <div className="feedback-admin-content">
                <div className="panel-head">
                  <div>
                    <h3>
                      {feedback.event?.title || "Event"}
                    </h3>
                    <span>
                      {feedback.student?.name || "Participant"}
                      {" · "}
                      {formatDate(feedback.createdAt)}
                    </span>
                  </div>
                  <div className="rating-wrap">
                    <Rating
                      value={feedback.rating || 0}
                      readOnly
                    />
                  </div>
                </div>

                <p>
                  {feedback.comment || "No written comment."}
                </p>

                <div className="feedback-meta">
                  {feedback.venueRating > 0 && (
                    <span>
                      Venue: {feedback.venueRating}/5
                    </span>
                  )}

                  {feedback.coordinationRating > 0 && (
                    <span>
                      Coordination: {feedback.coordinationRating}/5
                    </span>
                  )}

                  {feedback.technicalRating > 0 && (
                    <span>
                      Technical: {feedback.technicalRating}/5
                    </span>
                  )}

                  {feedback.hospitalityRating > 0 && (
                    <span>
                      Hospitality: {feedback.hospitalityRating}/5
                    </span>
                  )}
                </div>
              </div>

              <button
                className="btn"
                disabled={busy === feedback._id}
                onClick={() => toggleVisibility(feedback)}
              >
                {busy === feedback._id ? (
                  <span className="spinner" />
                ) : feedback.isVisible ? (
                  "Hide"
                ) : (
                  "Show"
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}