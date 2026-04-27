import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/resumeCard.css";

export default function ResumeCard({ resume, onDeleteClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // navigate(`/resume/${resume.id}`);
    alert("Resume detail page will be added soon!")
  };

  return (
    <div className="resume-card" onClick={handleClick}>
      <div className="resume-card-body">
        <button
          className="resume-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick(resume.id);
          }}
        >
          <i className="fas fa-trash"></i>
        </button>

        <p className="resume-card-label">Resume</p>

        <h2 className="resume-card-title">
          {resume.name || "Untitled Resume"}
        </h2>

        <div className="resume-preview">
          <iframe
            src={resume.fileUrl}
            title={resume.name || resume.original_filename}
            className="resume-preview-frame"
          />
        </div>

        <p className="resume-original-name">{resume.original_filename}</p>

        <p className="resume-card-footer">Click to view full resume</p>
      </div>
    </div>
  );
}
