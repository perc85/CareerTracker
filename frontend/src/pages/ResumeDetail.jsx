import React, { useEffect, useState } from "react";
import { fetchResume, reviewResume } from "../api/resume";
import { useParams, useNavigate } from "react-router-dom";
import Typewriter from "../components/Typewriter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBrain,
  faCalendarDays,
  faClockRotateLeft,
  faDownload,
  faFileLines,
  faTriangleExclamation,
  faWandMagicSparkles,
  faClipboardList,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";

export default function ResumeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resumeDetail, setResumeDetail] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [aiFeedback, setAiFeedback] = useState({ feedback: "" });
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState("");
  const [reviewMode, setReviewMode] = useState("general");
  const [jobDescription, setJobDescription] = useState("");

  const formatDate = (date) => {
    if (!date) {
      return "---";
    }

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchResumeDetails = async () => {
      const result = await fetchResume(id);
      setResumeDetail(result);
    };

    fetchResumeDetails();
  }, [id]);

  const handleReviewModeChange = (mode) => {
    setReviewMode(mode);
    setAiFeedback({ feedback: "" });
    setAiError("");
    setShowFeedback(false);
  };

  const handleGetFeedback = async () => {
    if (reviewMode === "tailored" && jobDescription.trim().length < 50) {
      setShowFeedback(true);
      setAiError("Please paste a longer job description before requesting tailored feedback.");
      return;
    }

    if (aiFeedback.feedback !== "") {
      setShowFeedback(true);
      return;
    }

    setShowFeedback(true);
    setLoadingAI(true);
    setAiError("");

    try {
      const aiResponse = await reviewResume(
        id,
        reviewMode === "tailored" ? jobDescription : "",
      );

      setAiFeedback(aiResponse);
    } catch (err) {
      if (err?.response?.status === 429 || err?.status === 429) {
        setAiError("You have used all of your AI resume reviews for this month.");
      }  else {
        console.log(err)
        setAiError("Something went wrong while generating feedback.");
      }
    } finally {
      setLoadingAI(false);
    }
  };

  if (!resumeDetail) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 pb-10 pt-28">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-2xl border bg-white p-10 text-center shadow-md">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-700">
              <FontAwesomeIcon icon={faFileLines} />
            </div>
            <h2 className="text-2xl font-extrabold">Loading resume...</h2>
            <p className="mt-2 text-sm text-gray-500">
              Please wait while we load your resume details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-10 pt-28">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-700 px-6 py-6 text-white shadow-lg md:flex md:items-center md:justify-between md:px-8">
          <div>
            <button
              className="mb-4 rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-bold text-white transition duration-200 hover:bg-white/20"
              onClick={() => navigate("/resume")}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back to Resumes
            </button>

            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-white/80">
              Resume Detail
            </p>

            <h1 className="text-3xl font-extrabold">{resumeDetail.name}</h1>

            <p className="mt-2 max-w-2xl font-medium text-white/90">
              View your uploaded resume and generate AI-powered feedback.
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-0">
            <a
              href={resumeDetail.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/30 bg-white px-5 py-3 text-center font-bold text-purple-700 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              Open Resume
            </a>

            <button
              onClick={handleGetFeedback}
              disabled={loadingAI}
              className={`rounded-xl border border-white/30 px-5 py-3 font-bold text-white transition duration-200 ${
                loadingAI
                  ? "cursor-not-allowed bg-white/10 opacity-70"
                  : "bg-white/10 hover:-translate-y-1 hover:bg-white/20"
              }`}
            >
              <FontAwesomeIcon icon={faBrain} className="mr-2" />
              {loadingAI ? "Reviewing..." : "AI Feedback"}
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
                  Original File
                </p>
                <h2 className="break-all text-lg font-extrabold">
                  {resumeDetail.original_filename || "Resume file"}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                <FontAwesomeIcon icon={faCalendarDays} />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">Uploaded</p>
                <h2 className="text-2xl font-extrabold">
                  {formatDate(resumeDetail.created_at)}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                <FontAwesomeIcon icon={faClockRotateLeft} />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">Updated</p>
                <h2 className="text-2xl font-extrabold">
                  {formatDate(resumeDetail.updated_at)}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[2fr_0.95fr]">
          <div className="rounded-2xl border bg-white p-5 shadow-md md:p-6">
            <div className="mb-5 flex flex-col gap-3 border-b pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold">Resume Preview</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Preview the uploaded PDF or open it in a new tab.
                </p>
              </div>

              <a
                href={resumeDetail.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-700 px-5 py-3 text-center font-bold text-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Open PDF
              </a>
            </div>

            <div className="hidden h-[760px] w-full overflow-hidden rounded-2xl border bg-gray-50 md:block">
              <iframe
                src={resumeDetail.file_url}
                title={resumeDetail.name}
                className="h-full w-full"
              ></iframe>
            </div>

            <div className="block rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center md:hidden">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                <FontAwesomeIcon icon={faFileLines} />
              </div>

              <h2 className="text-xl font-extrabold">
                PDF preview unavailable
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                Mobile browsers do not always display embedded PDFs well. Open
                the file in a new tab to view it.
              </p>

              <a
                href={resumeDetail.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-xl bg-gradient-to-r from-indigo-500 to-purple-700 px-6 py-3 font-bold text-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Open Resume PDF
              </a>
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border bg-white p-6 shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                  <FontAwesomeIcon icon={faWandMagicSparkles} />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold">AI Resume Review</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get ATS-focused feedback and improvement ideas.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1">
                <button
                  onClick={() => handleReviewModeChange("general")}
                  className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                    reviewMode === "general"
                      ? "bg-white text-purple-700 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <FontAwesomeIcon icon={faBrain} className="mr-2" />
                  General
                </button>

                <button
                  onClick={() => handleReviewModeChange("tailored")}
                  className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                    reviewMode === "tailored"
                      ? "bg-white text-purple-700 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <FontAwesomeIcon icon={faBullseye} className="mr-2" />
                  Tailored
                </button>
              </div>

              {reviewMode === "tailored" && (
                <div className="mt-5">
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Job Description
                  </label>

                  <textarea
                    value={jobDescription}
                    onChange={(e) => {
                      setJobDescription(e.target.value);
                      setAiFeedback({ feedback: "" });
                      setAiError("");
                      setShowFeedback(false);
                    }}
                    rows="8"
                    placeholder="Paste the job description here..."
                    className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  ></textarea>

                  <div className="mt-2 flex justify-between gap-3 text-xs text-gray-500">
                    <span>Use the full job posting for better feedback.</span>
                    <span>{jobDescription.trim().length} characters</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleGetFeedback}
                disabled={
                  loadingAI ||
                  (reviewMode === "tailored" &&
                    jobDescription.trim().length < 50)
                }
                className={`mt-5 w-full rounded-xl px-5 py-3 font-bold text-white transition duration-200 ${
                  loadingAI ||
                  (reviewMode === "tailored" &&
                    jobDescription.trim().length < 50)
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-gradient-to-r from-indigo-500 to-purple-700 hover:-translate-y-1"
                }`}
              >
                <FontAwesomeIcon icon={faBrain} className="mr-2" />
                {loadingAI
                  ? "Generating Feedback..."
                  : reviewMode === "tailored"
                    ? "Generate Tailored Feedback"
                    : "Generate General Feedback"}
              </button>

              <div className="mt-4 rounded-xl bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-purple-700">
                    <FontAwesomeIcon icon={faClipboardList} />
                  </div>

                  <div>
                    <p className="font-bold text-gray-800">
                      {reviewMode === "tailored"
                        ? "Tailored review"
                        : "General review"}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      {reviewMode === "tailored"
                        ? "The AI will compare your resume against the pasted job description and suggest targeted improvements."
                        : "The AI will review your resume for ATS score, strengths, weaknesses, missing keywords, bullet improvements, and final recommendations."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {showFeedback && (
              <div className="rounded-2xl border bg-white shadow-md">
                <div className="border-b px-6 py-4">
                  <h2 className="text-2xl font-extrabold">
                    {reviewMode === "tailored"
                      ? "Tailored Resume Feedback"
                      : "Resume Feedback"}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {reviewMode === "tailored"
                      ? "AI-generated review based on this resume and job description."
                      : "AI-generated review for this resume."}
                  </p>
                </div>

                {loadingAI ? (
                  <div className="px-6 py-5">
                    <div className="rounded-xl bg-gray-50 p-4">
                      <Typewriter
                        text={
                          reviewMode === "tailored"
                            ? "Comparing your resume to the job description..."
                            : "Generating feedback..."
                        }
                      />
                    </div>
                  </div>
                ) : aiError ? (
                  <div className="px-6 py-5">
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-red-600">
                          <FontAwesomeIcon icon={faTriangleExclamation} />
                        </div>

                        <div>
                          <p className="font-bold text-red-700">
                            AI review unavailable
                          </p>
                          <p className="mt-1 text-sm leading-6 text-red-600">
                            {aiError}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : aiFeedback?.feedback ? (
                  <div className="max-h-[360px] overflow-y-auto px-6 py-5 md:max-h-[460px] lg:max-h-[460px]">
                    <div className="whitespace-pre-line rounded-xl bg-gray-50 p-4 text-sm leading-7 text-gray-700">
                      <Typewriter text={aiFeedback.feedback} />
                    </div>
                  </div>
                ) : (
                  <div className="px-6 py-5">
                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-sm text-gray-500">
                        Click generate feedback to review this resume.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!showFeedback && (
              <div className="rounded-2xl border bg-white p-6 shadow-md">
                <h3 className="text-xl font-extrabold">Resume Review Tip</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Use tailored feedback after pasting a specific job
                  description. It helps the AI check your resume against the
                  exact skills, tools, and responsibilities the company wants.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}