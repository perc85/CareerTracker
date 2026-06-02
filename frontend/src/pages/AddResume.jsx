import React, { useState } from "react";
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
    <div className="max-h-full px-4 pb-8 pt-28 flex justify-center">
      <div className="w-full max-w-3xl bg-grey-50 border shadow-lg rounded-2xl">
        <div className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded-t-2xl">
          <h2 className="font-bold text-2xl pb-2">Add Resume</h2>
          <p>Upload and organize resumes for your applications</p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 pt-6 pb-4">
              <div className="flex flex-col">
                <label className="font-bold pb-2">Resume Name</label>
                <input
                  type="text"
                  className="border rounded-2xl py-3 px-3"
                  placeholder="Ex: Software Engineer Resume"
                  name="resumeName"
                  value={resumeFormData.resumeName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold pb-2">Category</label>
                <select
                  className="border rounded-2xl py-3 px-3"
                  name="category"
                  value={resumeFormData.category}
                  onChange={handleChange}
                >
                  <option value="">Select category</option>
                  <option value="general">General</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="full-stack">Full Stack</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 px-8">
              <div className="flex flex-col">
                <label className="block font-bold pb-2">Upload Resume</label>
                <input
                  type="file"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm file:mr-4 file:rounded-lg file:border-0 file:bg-purple-600 file:px-4 file:py-2 file:font-bold file:text-white hover:file:bg-purple-700"
                  name="selectedFile"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <p className="text-sm opacity-70 mt-1">
                  Accepted: PDF, DOC, DOCX
                </p>
              </div>
              {resumeFormData.selectedFile ? (
                <div className="border rounded-2xl px-4 py-3 font-semibold">
                  {resumeFormData.selectedFile.name}
                </div>
              ) : (
                <div className="border rounded-2xl px-4 py-3 font-semibold">
                  No File Selected
                </div>
              )}
              <div className="flex flex-col">
                <label className="font-bold pb-2">Notes</label>
                <textarea
                  name="notes"
                  value={resumeFormData.notes}
                  placeholder="Optional notes about this resume..."
                  className="border rounded-2xl py-4 px-4"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end px-8 py-6">
              <button
                type="submit"
                className="border px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-700 text-white font-bold hover:-translate-y-1 transition duration-200 ease-in-out"
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
