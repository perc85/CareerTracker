import React, { useEffect, useState } from "react";
import { appStatus, jobInformation } from "../api/dashBoard";
import StatCard from "../components/statCard";
import JobCard from "../components/jobCard";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faFileLines,
  faPaperPlane,
  faEnvelope,
  faWandMagicSparkles,
  faPlus,
  faUser,
  faBullseye,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

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
    { key: "applied", label: "Applied", color: "bg-blue-200" },
    { key: "interview", label: "Interview", color: "bg-purple-200" },
    { key: "offer", label: "Offer", color: "bg-amber-200" },
    { key: "accepted", label: "Accepted", color: "bg-green-200" },
    { key: "rejected", label: "Rejected", color: "bg-red-200" },
    { key: "total", label: "Total", color: "bg-gray-200" },
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
      total: prev.total - 1,
      [jobToDelete.status]: prev[jobToDelete.status] - 1,
    }));

    setJobInfo((prev) => prev.filter((job) => job.id !== selectId));
    setShowModal(false);
    setSelectId(null);
  };

  const selectedStatusLabel =
    cardsToShow.charAt(0).toUpperCase() + cardsToShow.slice(1);

  const applicationGoal = 10;
  const progressPercent =
    applicationData.total === 0
      ? 0
      : Math.min(
          Math.round((applicationData.total / applicationGoal) * 100),
          100,
        );

  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-10 pt-28">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-700 px-6 py-6 text-white shadow-lg md:flex md:items-center md:justify-between md:px-8">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-white/80">
              Career Tracker
            </p>
            <h1 className="text-3xl font-extrabold">Application Dashboard</h1>
            <p className="mt-2 max-w-2xl font-medium text-white/90">
              Track your applications, interviews, offers, and follow-ups in one
              place.
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-0">
            <button
              className="rounded-xl border border-white/30 bg-white px-5 py-3 font-bold text-purple-700 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              onClick={() => navigate("/addjob")}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Job
            </button>

            <button
              className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-bold text-white transition duration-200 hover:-translate-y-1 hover:bg-white/20"
              onClick={() => navigate("/resume")}
            >
              <FontAwesomeIcon icon={faFileLines} className="mr-2" />
              Review Resume
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {statusConfig.map((status) => (
            <StatCard
              key={status.key}
              title={status.label}
              color={status.color}
              value={applicationData[status.key]}
              setCardsToShow={() => setCardsToShow(status.key)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_0.9fr]">
          <div>
            <div className="rounded-2xl border bg-white p-5 shadow-md md:p-6">
              <div className="mb-5 flex flex-col gap-3 border-b pb-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold">
                    {selectedStatusLabel} Jobs
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Showing {filteredJobs.length}{" "}
                    {filteredJobs.length === 1 ? "application" : "applications"}
                  </p>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
                  {statusConfig.map((status) => (
                    <button
                      key={status.key}
                      onClick={() => setCardsToShow(status.key)}
                      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold capitalize transition duration-200 ${
                        cardsToShow === status.key
                          ? "border-purple-600 bg-purple-600 text-white"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 lg:max-h-[620px] lg:overflow-y-auto lg:pr-2">
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
                <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-2xl text-purple-700">
                    <FontAwesomeIcon icon={faBriefcase} />
                  </div>
                  <h2 className="text-xl font-extrabold">
                    No job applications found
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                    Try selecting another status or add a new application to get
                    started.
                  </p>
                  <button
                    className="mt-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-700 px-6 py-3 font-bold text-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => navigate("/addjob")}
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add Job Application
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 rounded-2xl border bg-white p-6 shadow-md">
              <h3 className="text-xl font-extrabold">Suggested Next Steps</h3>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </div>
                  <p className="font-bold text-gray-800">Keep applying</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adding a few targeted applications each week.
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <p className="font-bold text-gray-800">Follow up</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Follow up around 7 days after applying.
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                    <FontAwesomeIcon icon={faWandMagicSparkles} />
                  </div>
                  <p className="font-bold text-gray-800">Improve resume</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Review your resume for each job type.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border bg-white p-6 shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                  <FontAwesomeIcon icon={faBullseye} />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold">
                    Job Search Progress
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Goal: {applicationGoal} applications
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm font-bold">
                  <span>{applicationData.total} submitted</span>
                  <span>{progressPercent}%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-700"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-2xl font-extrabold text-blue-700">
                    {applicationData.applied}
                  </p>
                  <p className="text-sm font-semibold text-gray-600">Applied</p>
                </div>

                <div className="rounded-xl bg-purple-50 p-4">
                  <p className="text-2xl font-extrabold text-purple-700">
                    {applicationData.interview}
                  </p>
                  <p className="text-sm font-semibold text-gray-600">
                    Interviews
                  </p>
                </div>

                <div className="rounded-xl bg-amber-50 p-4">
                  <p className="text-2xl font-extrabold text-amber-700">
                    {applicationData.offer}
                  </p>
                  <p className="text-sm font-semibold text-gray-600">Offers</p>
                </div>

                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-2xl font-extrabold text-green-700">
                    {applicationData.accepted}
                  </p>
                  <p className="text-sm font-semibold text-gray-600">
                    Accepted
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <h3 className="text-xl font-extrabold">Follow-Up Reminder</h3>
              </div>

              {applicationData.total > 0 ? (
                <div className="mt-4 rounded-xl bg-gray-50 p-4">
                  <p className="font-bold text-gray-800">
                    Stay consistent with follow-ups
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    If you applied more than 7 days ago, consider sending a
                    short follow-up message.
                  </p>
                </div>
              ) : (
                <div className="mt-4 rounded-xl bg-gray-50 p-4">
                  <p className="font-bold text-gray-800">No follow-ups yet</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Add applications first, then track your follow-up timing.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-md">
            <h3 className="text-xl font-extrabold">Quick Actions</h3>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-700 px-5 py-3 font-bold text-white transition duration-200 hover:-translate-y-1"
                onClick={() => navigate("/addjob")}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Job
              </button>

              <button
                className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 font-bold text-gray-700 transition duration-200 hover:bg-gray-100"
                onClick={() => navigate("/resume")}
              >
                <FontAwesomeIcon icon={faFileLines} className="mr-2" />
                Resume Page
              </button>

              <button
                className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 font-bold text-gray-700 transition duration-200 hover:bg-gray-100"
                onClick={() => navigate("/profile")}
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Profile
              </button>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <h3 className="text-xl font-extrabold">Job Search Tip</h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Try tracking where each application came from, like LinkedIn,
              company website, recruiter, or referral. That helps you see which
              source is actually working.
            </p>
          </div>
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
