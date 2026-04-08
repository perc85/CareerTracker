import React, { useEffect, useState } from "react";
import { fetchResumes } from "../api/resume";
import ResumeCard from "../components/resumeCard";
import { useNavigate } from "react-router-dom";
import "../styles/Resume.css";

export default function Resume() {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllResumes = async () => {
      setResumes(await fetchResumes());
    };
    fetchAllResumes();
  }, []);

  return (
    <div className="resume-page">
      <div className="resume-shell">
        <div className="resume-header">
          <div>
            <h2>My Resumes</h2>
            <p>View and manage the resumes you have uploaded</p>
          </div>
          <div className="resume-count">
            <span>{resumes.length}</span>
            <small>{resumes.length === 1 ? "Resume" : "Resumes"}</small>
          </div>
        </div>

        <div className="resume-body">
          {resumes.length === 0 ? (
            <div className="resume-empty">
              <h3>No resumes yet</h3>
              <p>Your uploaded resumes will show up here once you add one.</p>
            </div>
          ) : (
            <div className="resume-grid">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          )}

          <div className="resume-actions">
            <button
              className="add-resume-button"
              onClick={() => navigate("/addresume")}
            >
              + Add Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
