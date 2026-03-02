import React, { useState } from 'react'
import '../styles/AddJob.css'
import { useNavigate } from 'react-router-dom'

export default function AddJob() {

    const navigate = useNavigate()
    const token = localStorage.getItem("access_token")

    const [formData, setFormData] = useState({
        company: "",
        title: "",
        location: "",
        job_type: "",
        status: "applied",
        salary_range: "",
        notes: "",
        date_applied: ""
    })

    const handleChange = (e) =>{
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://127.0.0.1:5000/jobs/add-job', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        console.log(formData)
        navigate('/dashboard')
    }

  return (
    <div className="addjob-page">
        <div className="addjob-card">
            <div className="addjob-header">
            <h2>Add a Job</h2>
            <p>Track your applications in one place.</p>
            </div>

            <form className="addjob-body" onSubmit={handleSubmit}>
            <div className="addjob-grid">
                <div className="addjob-field">
                <label>Company</label>
                <input
                    className="addjob-input"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                />
                </div>

                <div className="addjob-field">
                <label>Title</label>
                <input
                    className="addjob-input"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                </div>

                <div className="addjob-field">
                <label>Location</label>
                <input
                    className="addjob-input"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
                </div>

                <div className="addjob-field">
                <label>Job Type</label>
                    <select
                    className="addjob-select"
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleChange}
                    >
                        <option value="">Select Job Type</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="internship">Internship</option>
                        <option value="contract">Contract</option>
                        <option value="temporary">Temporary</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>

                <div className="addjob-field">
                <label>Status</label>
                <select
                    className="addjob-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="applied" selected>Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
                </div>

                <div className="addjob-field">
                <label>Salary Range</label>
                <input
                    className="addjob-input"
                    type="text"
                    name="salary_range"
                    value={formData.salary_range}
                    onChange={handleChange}
                />
                </div>

                <div className="addjob-field addjob-span-2">
                <label>Notes</label>
                <textarea
                    className="addjob-textarea"
                    name="notes"
                    maxLength={400}
                    value={formData.notes}
                    onChange={handleChange}
                />
                </div>

                <div className="addjob-field">
                <label>Date Applied</label>
                <input
                    className="addjob-input"
                    type="date"
                    name="date_applied"
                    value={formData.date_applied}
                    onChange={handleChange}
                />
                </div>
            </div>

            <div className="addjob-actions">
                <button className="addjob-btn" type="submit">
                Add Job
                </button>
            </div>
            </form>
        </div>
        </div>
  )
}
