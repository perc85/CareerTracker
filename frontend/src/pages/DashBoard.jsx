import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { appStatus, jobInformation } from "../api/dashBoard";
import StatCard from "../components/statCard";
import JobCard from "../components/jobCard";
import { useNavigate, useParams } from "react-router-dom";

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

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <div className="dashboard-header">
          <div>
            <h1>Application Dashboard</h1>
            <p>
              Track your application progress and manage your job opportunities
            </p>
          </div>

          <div className="dashboard-badge">
            <span>{applicationData.total}</span>
            <small>Total Applications</small>
          </div>
        </div>

        <div className="dashboard-body">
          <section className="stats-section">
            <div className="stats-grid">
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
          </section>

          <section className="jobs-section">
            <div className="section-header">
              <div>
                <h2>
                  {cardsToShow.charAt(0).toUpperCase() + cardsToShow.slice(1)}{" "}
                  Jobs
                </h2>
                <p>
                  {filteredJobs.length}{" "}
                  {filteredJobs.length === 1 ? "application" : "applications"}
                </p>
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="jobs-empty">
                <h3>No job applications found</h3>
                <p>
                  Try selecting another status or add a new application to get
                  started.
                </p>
              </div>
            ) : (
              <div className="jobs-grid">
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
                  />
                ))}
              </div>
            )}
          </section>

          <div className="add-job-wrapper">
            <button
              name="add-jobs"
              className="add-job-button"
              onClick={() => navigate("/addjob")}
            >
              + Add More Job Applications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
