import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddJob() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const { id } = useParams();

  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    job_type: "",
    status: "",
    salary_range: "",
    notes: "",
    date_applied: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/add-job`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log(formData);
    navigate("/dashboard");
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/jobs/get-job/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        setFormData(data[0]);
      };
      fetchData();
    }
  }, [id, token]);

  return (
    <div className="flex justify-center max-h-full pt-28 pb-8 px-4">
      <div className="w-full max-w-3xl bg-gray-50 rounded-2xl border shadow-lg">
        <div className=" px-8 py-4 mb-8 text-white bg-gradient-to-r from-indigo-500 to-purple-700 rounded-t-2xl">
          <h2 className="font-bold text-2xl">
            Add a Job
          </h2>
          <p className="pt-2">
            Track your applications in one place
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 px-6 grid-cols-2 pb-4">
              <div className="w-full">
                <label className="font-bold">Company</label>
                <div className="pt-2">
                  <input type="text" className="border border-gray-300 w-full rounded-2xl p-3" name="company" value={formData.company} onChange={handleChange}/>
                </div>
              </div>
              <div className="w-full">
                <label className="font-bold">Title</label>
                <div className="pt-2">
                  <input type="text" className="border border-gray-300 w-full rounded-2xl p-3" name="title" value={formData.title} onChange={handleChange}/>
                </div>
              </div>
              <div className="w-full">
                <label className="font-bold">Location</label>
                <div className="pt-2">
                  <input type="text" className="border border-gray-300 w-full rounded-2xl p-3" name="location" value={formData.location} onChange={handleChange}/>
                </div>
              </div>
              <div className="w-full">
                <label className="font-bold">Job Type</label>
                <div className="pt-2">
                  <select className="border border-gray-300 w-full rounded-2xl p-3" name="job_type" value={formData.job_type} onChange={handleChange}>
                    <option value="">Select job type</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                    <option value="temporary">Temporary</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <div className="w-full">
                <label className="font-bold">Status</label>
                <div className="pt-2">
                  <select className="border border-gray-300 w-full rounded-2xl p-3" name="status" value={formData.status} onChange={handleChange}>
                    <option value="">Select status</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div className="w-full">
                <label className="font-bold">Salary Range</label>
                <div className="pt-2">
                  <input type="text" className="border border-gray-300 w-full rounded-2xl p-3" name="salary_range" value={formData.salary_range} onChange={handleChange}/>
                </div>
              </div>
            </div>
            <div className="grid">
              <div className="w-full px-6">
                <label className="font-bold">Notes</label>
                <div className="pt-2">
                  <textarea className="border border-gray-300 w-full rounded-2xl p-3 h-28" name="notes" value={formData.notes} onChange={handleChange}></textarea>
                </div>
              </div>
            </div>
            <div className="grid gap-4 grid-cols-2 px-6 pt-4">
              <div className="w-full">
                <label className="font-bold">Date Applied</label>
                <div className="pt-2">
                  <input type="date" className="border border-gray-300 w-full rounded-2xl p-3" name="date_applied" value={formData.date_applied} onChange={handleChange}/>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-6">
              <button type="submit" className="border px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-700 text-white font-bold hover:-translate-y-1 transition duration-200 ease-in-out">Add Job</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
