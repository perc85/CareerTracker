import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobDetails from "../api/jobDetail";
import "../styles/JobDetail.css";

export default function JobDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState([]);

  useEffect(() => {
    const fetchJobData = async () => {
      const result = await jobDetails(id);
      setJob(result?.[0] ?? null);
    };
    fetchJobData();
  }, [id]);

  if (!job.company) {
    return (
      <div className="flex justify-center pt-28 pb-8 max-h-full">
        <div className="border w-full max-w-4xl rounded-2xl">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded-t-2xl px-8 py-4">
            <h1 className="font-bold text-3xl">Loading...</h1>
          </div>
          <div className="py-8 px-6">
            <div className="w-full h-10 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 animate-pulse w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex max-h-full justify-center pt-28 pb-8">
      <div className="border w-full max-w-4xl rounded-2xl bg-gray-50 shadow-lg">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded-t-2xl px-8 py-4">
          <h2 className="font-bold text-2xl pb-2">{job.title}</h2>
          <p>{job.company} • {job.location}</p>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 p-6">
          <div className="border px-4 py-2 rounded-2xl w-full">
            <h2 className="font-bold opacity-90 pb-2">Salary Range</h2>
            <h2 className="font-bold">{job.salary_range}</h2>
          </div>
          <div className="border px-4 py-2 rounded-2xl w-full">
            <h2 className="font-bold opacity-90 pb-2">Date Applied</h2>
            <h2 className="font-bold">{job.date_applied}</h2>
          </div>
          <div className="border px-4 py-2 rounded-2xl w-full">
            <h2 className="font-bold opacity-90 pb-2">Job ID</h2>
            <h2 className="font-bold">{job.id}</h2>
          </div>
          <div className="border px-4 py-2 rounded-2xl w-full">
            <h2 className="font-bold opacity-90 pb-2">Location</h2>
            <h2 className="font-bold">{job.location}</h2>
          </div>
          <div className="border rounded-2xl grid-cols-1 md:col-span-2">
            <div className="border-b py-3 px-4 bg-gray-100 rounded-t-2xl opacity-90">
              <h2 className="font-bold">Notes</h2>
            </div>
            <div className="py-4 px-4">
              <p>{job.notes}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end px-6 gap-3 pb-6">
          <button className="border px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-700 text-white font-bold hover:-translate-y-1 transition duration-200 ease-in-out" onClick={() => alert("Edit feature will be added soon")}>
            Edit
          </button>
          <button className="border px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-700 text-white font-bold hover:-translate-y-1 transition duration-200 ease-in-out" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
