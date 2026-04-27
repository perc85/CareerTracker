import React, { useEffect, useState } from "react";
import { fetchResumes } from "../api/resume";
import ResumeCard from "../components/resumeCard";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function Resume() {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };
  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/resume/${selectedId}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`response status: ${response.status}`);
    }
    setResumes((prev) => prev.filter(prev => prev.id !== selectedId));
  };

  useEffect(() => {
    const fetchAllResumes = async () => {
      setResumes(await fetchResumes());
    };
    fetchAllResumes();
  }, []);

  return (
    <div className="flex justify-center max-h-full pt-28 pb-8 px-4">
      <div className=" bg-gray-50 w-full max-w-7xl rounded-2xl border shadow-lg">
        <div className="md:flex justify-between bg-gradient-to-r from-indigo-500 to-purple-700 rounded-t-2xl text-white py-3 px-8 mb-8">
          <div>
            <h2 className="font-bold text-2xl pb-3">My Resumes</h2>
            <p>View and manage the resumes you have uploaded</p>
          </div>
          <div className="pt-2 md:pt-0">
            <div className="border rounded-2xl p-2 text-center bg-white/10">
              <h2 className="font-bold text-2xl">{resumes.length}</h2>
              <p>Resumes</p>
            </div>
          </div>
        </div>
        {resumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-center gap-4 justify-items-center px-4 md:px-8 mb-8">
            {resumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </div>
          ) : (
            <div className="flex justify-center">
              <div className="text-center px-16 py-12 bg-gray-100 w-full mx-8 mb-8 rounded-2xl border border-dashed border-gray-400">
                <h2 className="font-bold pb-2 text-lg">No resumes yet</h2>
                <p className="font-light">
                  Your uploaded resumes will show up here once you add one.
                </p>
              </div>
            </div>
          )
        }
        <div className="flex justify-center mb-6">
          <button
            className="border px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-700 text-white font-bold hover:-translate-y-1 transition duration-200 ease-in-out"
            onClick={() => navigate("/addresume")}
          >
            + Add Resume
          </button>
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Resume"
        message = "Are you sure you want to delete this resume?"
      />
    </div>
  );
}
