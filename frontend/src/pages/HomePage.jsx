import React from "react";
import { Link } from "react-router-dom";
import dashboardImg from "../assets/DashBoard.png";
import addJobImg from "../assets/AddingJob.png";
import resumePageImg from "../assets/ResumePage.png";
import resumeDetailImg from "../assets/ResumeDetailPage.png";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gray-100 pt-14 text-gray-900">
      <section className="px-6 pb-16 pt-14 md:pb-24 md:pt-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-sm font-extrabold uppercase tracking-wide text-purple-700">
              Job search organization made simple
            </p>

            <h1 className="text-4xl font-black leading-tight text-gray-950 md:text-6xl">
              Track your job search and improve every application.
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-gray-600">
              Career Tracker helps you manage applications, store different
              resume versions, track interviews and offers, and generate
              ATS-focused resume feedback from one clean dashboard.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/signup"
                className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-700 px-7 py-4 text-center font-extrabold text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              >
                Get Started
              </Link>

              <a
                href="#preview"
                className="rounded-xl border border-gray-300 bg-white px-7 py-4 text-center font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                View Preview
              </a>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <p className="text-2xl font-black text-purple-700">5</p>
                <p className="text-sm font-bold text-gray-500">
                  Applications
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <p className="text-2xl font-black text-purple-700">3</p>
                <p className="text-sm font-bold text-gray-500">Resumes</p>
              </div>

              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <p className="text-2xl font-black text-purple-700">AI</p>
                <p className="text-sm font-bold text-gray-500">Feedback</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-3 shadow-2xl">
            <img
              src={dashboardImg}
              alt="Career Tracker application dashboard"
              className="w-full rounded-2xl border border-gray-200 object-cover"
            />
          </div>
        </div>
      </section>

      <section id="features" className="px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-wide text-purple-700">
              Features
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Everything you need to stay organized.
            </h2>

            <p className="mt-4 text-lg font-medium leading-8 text-gray-600">
              Instead of keeping job links, resume versions, and notes scattered
              everywhere, Career Tracker puts everything in one place.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-3xl border bg-white p-7 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl text-blue-700">
                <i className="fa-solid fa-clipboard-list"></i>
              </div>

              <h3 className="text-xl font-black">Track Applications</h3>

              <p className="mt-3 leading-7 text-gray-600">
                Save job titles, companies, locations, salary ranges, statuses,
                notes, and application dates.
              </p>
            </div>

            <div className="rounded-3xl border bg-white p-7 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-xl text-purple-700">
                <i className="fa-solid fa-file-lines"></i>
              </div>

              <h3 className="text-xl font-black">Manage Resumes</h3>

              <p className="mt-3 leading-7 text-gray-600">
                Upload multiple resume versions for frontend, backend,
                full-stack, internship, or company-specific applications.
              </p>
            </div>

            <div className="rounded-3xl border bg-white p-7 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl text-green-700">
                <i className="fa-solid fa-brain"></i>
              </div>

              <h3 className="text-xl font-black">AI Resume Feedback</h3>

              <p className="mt-3 leading-7 text-gray-600">
                Generate ATS-focused feedback with a score, summary, strengths,
                weaknesses, keywords, and bullet improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="preview" className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-extrabold uppercase tracking-wide text-purple-700">
              Product Preview
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              See how Career Tracker works.
            </h2>
          </div>

          <div className="grid items-center gap-10 py-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-wide text-purple-700">
                Application Dashboard
              </p>

              <h3 className="mt-3 text-3xl font-black">
                View your job search progress at a glance.
              </h3>

              <p className="mt-4 text-lg leading-8 text-gray-600">
                Track how many applications are applied, interviewing, offered,
                accepted, or rejected. The dashboard gives users a quick
                overview of where they stand.
              </p>
            </div>

            <div className="rounded-3xl border bg-white p-3 shadow-xl">
              <img
                src={dashboardImg}
                alt="Application dashboard showing job statuses and progress"
                className="w-full rounded-2xl border object-cover"
              />
            </div>
          </div>

          <div className="grid items-center gap-10 py-10 lg:grid-cols-2">
            <div className="order-2 rounded-3xl border bg-white p-3 shadow-xl lg:order-1">
              <img
                src={addJobImg}
                alt="Add job form"
                className="w-full rounded-2xl border object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-sm font-extrabold uppercase tracking-wide text-purple-700">
                Add Applications
              </p>

              <h3 className="mt-3 text-3xl font-black">
                Save the important details for every role.
              </h3>

              <p className="mt-4 text-lg leading-8 text-gray-600">
                Add the company, job title, location, salary range, status,
                notes, and date applied. This makes it easier to follow up and
                remember what each role requires.
              </p>
            </div>
          </div>

          <div className="grid items-center gap-10 py-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-wide text-purple-700">
                Resume Library
              </p>

              <h3 className="mt-3 text-3xl font-black">
                Keep different resume versions organized.
              </h3>

              <p className="mt-4 text-lg leading-8 text-gray-600">
                Store resumes for different job types, view uploaded files, and
                keep track of which version is best for each application.
              </p>
            </div>

            <div className="rounded-3xl border bg-white p-3 shadow-xl">
              <img
                src={resumePageImg}
                alt="Resume library with multiple uploaded resumes"
                className="w-full rounded-2xl border object-cover"
              />
            </div>
          </div>

          <div className="grid items-center gap-10 py-10 lg:grid-cols-2">
            <div className="order-2 rounded-3xl border bg-white p-3 shadow-xl lg:order-1">
              <img
                src={resumeDetailImg}
                alt="Resume detail page with PDF preview and AI review panel"
                className="w-full rounded-2xl border object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-sm font-extrabold uppercase tracking-wide text-purple-700">
                AI Resume Review
              </p>

              <h3 className="mt-3 text-3xl font-black">
                Get feedback before you apply.
              </h3>

              <p className="mt-4 text-lg leading-8 text-gray-600">
                Preview your uploaded resume and generate feedback focused on
                ATS score, strengths, weaknesses, missing keywords, bullet
                improvements, and final recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-700 p-8 text-white shadow-xl md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-wide text-white/80">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Start organizing your job search in minutes.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
              <p className="text-4xl font-black">1</p>
              <h3 className="mt-4 text-xl font-black">Create an account</h3>
              <p className="mt-2 leading-7 text-white/85">
                Sign in and start tracking your applications in one place.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
              <p className="text-4xl font-black">2</p>
              <h3 className="mt-4 text-xl font-black">
                Add jobs and resumes
              </h3>
              <p className="mt-2 leading-7 text-white/85">
                Save job details, upload resume versions, and add notes for each
                application.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
              <p className="text-4xl font-black">3</p>
              <h3 className="mt-4 text-xl font-black">Improve and follow up</h3>
              <p className="mt-2 leading-7 text-white/85">
                Use progress tracking and AI feedback to stay consistent and
                improve each application.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border bg-white p-8 text-center shadow-xl md:p-12">
          <h2 className="text-3xl font-black md:text-5xl">
            Ready to organize your job search?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            Keep your applications, resumes, notes, and feedback together so you
            can apply with more confidence.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/signup"
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-700 px-7 py-4 font-extrabold text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
            >
              Create Account
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-gray-300 bg-white px-7 py-4 font-extrabold text-gray-800 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="font-extrabold text-gray-900">Career Tracker</p>

          <p className="text-sm font-medium text-gray-500">
            Track applications, manage resumes, and improve your job search.
          </p>
        </div>
      </footer>
    </div>
  );
}