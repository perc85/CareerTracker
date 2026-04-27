import React, { useEffect, useState } from "react";
import { fetchResume, reviewResume } from "../api/resume";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ResumeDetail.css";

export default function ResumeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resumeDetail, setResumeDetail] = useState(null);

  const [showFeedback, setShowFeedback] = useState(false);
  const [aiFeedback, setAiFeedback] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    const fetchResumeDetails = async () => {
      const result = await fetchResume(id);
      setResumeDetail(result);
    };

    fetchResumeDetails();
  }, [id]);

  const handleGetFeedback = async () => {
    if(aiFeedback){
        return;
    }
    setShowFeedback(true);
    setLoadingAI(true);

    try {
      const aiResponse = await reviewResume(id);
      setAiFeedback(aiResponse["feedback"]);
      setLoadingAI(false);
    } catch (err) {
      setAiFeedback("Something went wrong.");
      setLoadingAI(false);
    }
  };

  if (!resumeDetail) {
    return (
      <div className="resumedetail-page">
        <div className="resumedetail-card">
          <div className="resumedetail-header">
            <h2>Resume Details</h2>
            <p>Loading…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="resumedetail-page resumedetail-layout">
      <div className="resumedetail-card">
        <div className="resumedetail-header">
          <div>
            <h2>{resumeDetail.name || "Untitled Resume"}</h2>
            <p className="resumedetail-subtitle">
              {resumeDetail.original_filename}
            </p>
          </div>

          <button
            className="resumedetail-ai-btn"
            type="button"
            onClick={handleGetFeedback}
          >
            Get AI Feedback
          </button>
        </div>

        <div className="resumedetail-body">
          <div className="resumedetail-info-grid">
            <div className="resumedetail-field">
              <span className="resumedetail-label">Resume ID</span>
              <span className="resumedetail-value">#{resumeDetail.id}</span>
            </div>

            <div className="resumedetail-field">
              <span className="resumedetail-label">Uploaded</span>
              <span className="resumedetail-value">
                {resumeDetail.created_at
                  ? new Date(resumeDetail.created_at).toLocaleDateString()
                  : "—"}
              </span>
            </div>
          </div>

          <div className="resumedetail-preview-section">
            <div className="resumedetail-preview-header">
              <h3>Resume Preview</h3>
              <a
                href={resumeDetail.file_url}
                target="_blank"
                rel="noreferrer"
                className="resumedetail-open-link"
              >
                Open PDF
              </a>
            </div>

            <iframe
              src={resumeDetail.file_url}
              title={resumeDetail.original_filename}
              className="resumedetail-frame"
            />
          </div>

          <div className="resumedetail-actions">
            <button
              className="btn btn-sm btn-outline"
              type="button"
              onClick={() => navigate("/resume")}
            >
              Back
            </button>
          </div>
        </div>
      </div>

      {showFeedback && (
        <div className="resumedetail-feedback-panel">
          <h3>AI Resume Feedback</h3>

          {loadingAI ? (
            <p>Analyzing your resume...</p>
          ) : (
            <pre className="resumedetail-feedback-text">{aiFeedback}</pre>
          )}
        </div>
      )}
    </div>
  );
}
