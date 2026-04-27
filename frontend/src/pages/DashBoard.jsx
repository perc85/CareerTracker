import React, { useEffect, useState } from "react";
import { appStatus, jobInformation } from "../api/dashBoard";
import StatCard from "../components/statCard";
import JobCard from "../components/jobCard";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function DashBoard() {
  const navigate = useNavigate();
  const cards = useParams();
  const [cardsToShow, setCardsToShow] = useState("total");

  const [applicationData, setApplicationData] = useState({
    accepted: 0,
    rejected: 0,
    interview: 0,
    offer: 0,
    applied: 0,
    total: 0,
  });
  const [jobInfo, setJobInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectId, setSelectId] = useState(null);

  const statusConfig = [
    { key: "applied", color: "bg-blue-200" },
    { key: "interview", color: "bg-purple-200" },
    { key: "offer", color: "bg-amber-200" },
    { key: "accepted", color: "bg-green-200" },
    { key: "rejected", color: "bg-red-200" },
    { key: "total", color: "bg-gray-200" },
  ];

  useEffect(() => {
    const fetchApplicationData = async () => {
      const result = await appStatus();
      setApplicationData(result);
    };

    const fetchJobInformation = async () => {
      const result = await jobInformation();
      setJobInfo(result);
    };

    fetchApplicationData();
    fetchJobInformation();

    if (Object.keys(cards).length !== 0) {
      setCardsToShow(cards.name);
    }
  }, [cards]);

  const filteredJobs = jobInfo.filter((job) => {
    return (
      cardsToShow.toLowerCase() === "total" ||
      cardsToShow.toLowerCase() === job.status.toLowerCase()
    );
  });

  const handleDeleteClick = (id) => {
    setSelectId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/jobs/${selectId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`response status: ${response.status}`);
    }

    const jobToDelete = jobInfo.find((job) => job.id === selectId);
    if (!jobToDelete) {
      return;
    }
    setApplicationData((prev) => ({
      ...prev,
      total: prev["total"] - 1,
      [jobToDelete["status"]]: prev[jobToDelete["status"]] - 1,
    }));
    setJobInfo((prev) => prev.filter((job) => job.id !== selectId));
  };

  return (
    <div className="max-h-full px-4 pb-8 pt-28 flex justify-center">
      <div className="border bg-gray-50 w-full max-w-7xl rounded-2xl shadow-lg">
        <div className="md:flex justify-between mb-8 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded-t-2xl">
          <div>
            <h2 className="font-bold text-2xl">Application Dashboard</h2>
            <p className="font-semibold pt-4 pb-2 md:pb-0">
              Track and manage your job search
            </p>
          </div>
          <div className="border rounded-2xl p-2 text-center bg-white/10">
            <h2
              className="font-bold text-2xl"
            >
              {applicationData["total"]}
            </h2>
            <p>Applications</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 px-4 md:px-8 pb-6">
          {statusConfig.map((status) => (
            <StatCard
              key={status.key}
              title={status.key}
              color={status.color}
              value={applicationData[status.key]}
              setCardsToShow={setCardsToShow}
            />
          ))}
        </div>
        <div className="px-4 md:px-8 pb-6">
          <h2 className="font-extrabold text-lg">
            {cardsToShow.charAt(0).toUpperCase() + cardsToShow.slice(1) + " "}{" "}
            Jobs
          </h2>
          <p className="font-light">
            {filteredJobs.length}{" "}
            {filteredJobs.length === 1 ? "Application" : "Applications"}
          </p>
        </div>
        {filteredJobs.length > 0 ? (
          <div
            className="grid gap-4
         grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-8 pb-8"
          >
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                name={job.company}
                title={job.title}
                date={job.date_applied ? job.date_applied : "---"}
                type={job.job_type}
                location={job.location}
                status={job.status}
                salary={job.salary_range}
                notes={job.notes}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="text-center px-16 py-12 bg-gray-100 w-full mx-8 mb-8 rounded-2xl border border-dashed border-gray-400">
              <h2 className="font-bold pb-2 text-lg">No job applications found</h2>
              <p className="font-light">
                Try selecting another status or add a new application to get
                started.
              </p>
            </div>
          </div>
        )}
        <div className="flex justify-center mb-4">
          <button
            className="border px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-700 text-white font-bold hover:-translate-y-1 transition duration-200 ease-in-out"
            onClick={() => navigate("/addjob")}
          >
            + Add More Job Applications
          </button>
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Job"
        message="Are you sure you want to delete this job application?"
      />
    </div>
  );
}
