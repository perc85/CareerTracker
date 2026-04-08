import React, { useState } from "react";
import "../styles/AddResume.css";
import { addResume } from "../api/resume.js";
import { useNavigate } from "react-router-dom";

export default function AddResume() {
  const navigate = useNavigate();
  const [resumeName, setResumeName] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [notes, setNotes] = useState(null);

  const [resumeFormData, setResumeFormData] = useState({
    resumeName: "",
    category: "",
    selectedFile: null,
    notes: "",
  });

  const handleChange = (e) => {
    setResumeFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFormData((prev) => ({ ...prev, selectedFile: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addResume(resumeFormData);
    navigate("/resume");
  };

  return (
    <div className="addresume-page">
      <div className="addresume-card">
        <div className="addresume-header">
          <h2>Add Resume</h2>
          <p>Upload and organize resumes for your applications</p>
        </div>

        <div className="addresume-body">
          <form>
            <div className="addresume-grid">
              <div className="addresume-field">
                <label htmlFor="resume-name">Resume Name</label>
                <input
                  id="resume-name"
                  name="resumeName"
                  type="text"
                  className="input input-bordered w-full addresume-input"
                  placeholder="Ex: Software Engineer Resume"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>

              <div className="addresume-field">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  className="select select-bordered w-full addresume-select"
                  onChange={(e) => handleChange(e)}
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option>General</option>
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Full Stack</option>
                  <option>Internship</option>
                </select>
              </div>

              <div className="addresume-field addresume-span-2">
                <label htmlFor="file">Upload Resume</label>
                <input
                  id="file"
                  name="selectedFile"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="file-input file-input-bordered w-full addresume-file"
                  onChange={(e) => handleFileChange(e)}
                  required
                />
                <p className="text-sm opacity-70 mt-1">
                  Accepted: PDF, DOC, DOCX
                </p>
              </div>

              <div className="addresume-filename">
                {resumeFormData.selectedFile
                  ? resumeFormData.selectedFile.name
                  : "No file selected"}
              </div>

              <div className="addresume-field addresume-span-2">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  className="textarea textarea-bordered w-full addresume-textarea"
                  placeholder="Optional notes about this resume..."
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>

            <div className="addresume-actions">
              <button
                type="submit"
                className="btn bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none"
                onClick={(e) => handleSubmit(e)}
              >
                Upload Resume
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
