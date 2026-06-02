import React, { useEffect, useState } from "react";
import { fetchResumes } from "../api/resume";
import ResumeCard from "../components/resumeCard";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faPlus,
  faBrain,
  faChartSimple,
  faUpload,
  faWandMagicSparkles,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

export default function Resume() {
  const [resumes, setResumes] = useState([]);
  const [aiUsage, setAiUsage] = useState(0);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const reviewLimit = 5;
  const reviewsLeft = Math.max(reviewLimit - aiUsage, 0);
  const usagePercent =
    aiUsage === 0
      ? 0
      : Math.min(Math.round((aiUsage / reviewLimit) * 100), 100);

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
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`response status: ${response.status}`);
    }

    setResumes((prev) => prev.filter((resume) => resume.id !== selectedId));
    setShowModal(false);
    setSelectedId(null);
  };

  useEffect(() => {
    const fetchAllResumes = async () => {
      const data = await fetchResumes();
      setResumes(data.resumes);
      setAiUsage(data.ai_usage);
    };

    fetchAllResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-10 pt-28">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-700 px-6 py-6 text-white shadow-lg md:flex md:items-center md:justify-between md:px-8">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-white/80">
              Resume Center
            </p>
            <h1 className="text-3xl font-extrabold">My Resumes</h1>
            <p className="mt-2 max-w-2xl font-medium text-white/90">
              Upload, manage, and review your resumes for different job
              applications.
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-0">
            <button
              className="rounded-xl border border-white/30 bg-white px-5 py-3 font-bold text-purple-700 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              onClick={() => navigate("/addresume")}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Resume
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                <FontAwesomeIcon icon={faFileLines} />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Total Resumes
                </p>
                <h2 className="text-3xl font-extrabold">{resumes.length}</h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                <FontAwesomeIcon icon={faBrain} />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  AI Reviews Used
                </p>
                <h2 className="text-3xl font-extrabold">
                  {aiUsage} / {reviewLimit}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                <FontAwesomeIcon icon={faChartSimple} />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Reviews Left
                </p>
                <h2 className="text-3xl font-extrabold">{reviewsLeft}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_0.9fr]">
          <div className="rounded-2xl border bg-white p-5 shadow-md md:p-6">
            <div className="mb-5 flex flex-col gap-3 border-b pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold">Resume Library</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Showing {resumes.length}{" "}
                  {resumes.length === 1 ? "resume" : "resumes"}
                </p>
              </div>

              <button
                className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-700 px-5 py-3 font-bold text-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                onClick={() => navigate("/addresume")}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Resume
              </button>
            </div>

            {resumes.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 lg:max-h-[620px] lg:overflow-y-auto lg:pr-2">
                {resumes.map((resume) => (
                  <ResumeCard
                    key={resume.id}
                    resume={resume}
                    onDeleteClick={handleDeleteClick}
                    aiUsage={aiUsage}
                    reviewLimit={reviewLimit}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-2xl text-purple-700">
                  <FontAwesomeIcon icon={faFileLines} />
                </div>

                <h2 className="text-xl font-extrabold">No resumes yet</h2>

                <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                  Upload a resume to start tracking different versions for your
                  job applications.
                </p>

                <button
                  className="mt-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-700 px-6 py-3 font-bold text-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                  onClick={() => navigate("/addresume")}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add Resume
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border bg-white p-6 shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                  <FontAwesomeIcon icon={faBrain} />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold">AI Review Usage</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Monthly limit: {reviewLimit} reviews
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm font-bold">
                  <span>{aiUsage} used</span>
                  <span>{usagePercent}%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-700"
                    style={{ width: `${usagePercent}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-gray-50 p-4">
                {reviewsLeft > 0 ? (
                  <>
                    <p className="font-bold text-gray-800">
                      You have {reviewsLeft}{" "}
                      {reviewsLeft === 1 ? "review" : "reviews"} left
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Use AI reviews on resumes you are actively tailoring for a
                      job.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-gray-800">
                      Review limit reached
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      You have used all {reviewLimit} AI resume reviews for this
                      month.
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                  <FontAwesomeIcon icon={faWandMagicSparkles} />
                </div>

                <h3 className="text-xl font-extrabold">Resume Strategy</h3>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="font-bold text-gray-800">Match each job type</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Keep separate resumes for software, AI, frontend, backend,
                    and internship roles.
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="font-bold text-gray-800">
                    Use PDF when possible
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    PDF files usually preserve your formatting better when
                    applying online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-md">
            <h3 className="text-xl font-extrabold">Quick Actions</h3>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-700 px-5 py-3 font-bold text-white transition duration-200 hover:-translate-y-1"
                onClick={() => navigate("/addresume")}
              >
                <FontAwesomeIcon icon={faUpload} className="mr-2" />
                Upload Resume
              </button>

              <button
                className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 font-bold text-gray-700 transition duration-200 hover:bg-gray-100"
                onClick={() => navigate("/addjob")}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Job
              </button>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>

              <h3 className="text-xl font-extrabold">Resume Tip</h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Try naming resumes based on the company or role you are targeting.
              That makes it easier to remember which version you used for each
              application.
            </p>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Resume"
        message="Are you sure you want to delete this resume?"
      />
    </div>
  );
}
