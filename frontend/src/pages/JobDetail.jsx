import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import jobDetails from '../api/jobDetail'
import '../styles/JobDetail.css'

export default function JobDetail() {

    const navigate = useNavigate()
    const { id } = useParams()
    const [job, setJob] = useState([])
    
    useEffect(() => {
        const fetchJobData = async () => {
            const result = await jobDetails(id)
            setJob(result?.[0] ?? null)
        }
        fetchJobData()        
    }, [id])


      if (!job) {
        return (
        <div className="jobdetail-page">
            <div className="jobdetail-card">
            <div className="jobdetail-header">
                <h2>Job Details</h2>
                <p>Loading…</p>
            </div>
            <div className="jobdetail-body">
                <div className="skeleton h-6 w-3/4 mb-3"></div>
                <div className="skeleton h-24 w-full"></div>
            </div>
            </div>
        </div>
        );
    }

    return (
        <div className="jobdetail-page">
            <div className="jobdetail-card">
                <div className="jobdetail-header">
                <div>
                    <h2>{job.title}</h2>
                    <p className="jobdetail-subtitle">{job.company} • {job.location}</p>
                </div>

                <div className="jobdetail-badges">
                    <span className={`badge jobdetail-badge jobdetail-status-${job.status}`}>
                    {job.status}
                    </span>
                    {job.job_type ? (
                    <span className="badge jobdetail-badge jobdetail-type">
                        {job.job_type}
                    </span>
                    ) : null}
                </div>
                </div>

                <div className="jobdetail-body">
                <div className="jobdetail-grid">
                    <div className="jobdetail-field">
                    <span className="jobdetail-label">Salary Range</span>
                    <span className="jobdetail-value">{job.salary_range || "—"}</span>
                    </div>

                    <div className="jobdetail-field">
                    <span className="jobdetail-label">Date Applied</span>
                    <span className="jobdetail-value">
                         {job.date_applied ? job.date_applied : "---"}
                    </span>
                    </div>

                    <div className="jobdetail-field">
                    <span className="jobdetail-label">Job ID</span>
                    <span className="jobdetail-value">#{job.id}</span>
                    </div>

                    <div className="jobdetail-field">
                    <span className="jobdetail-label">Location</span>
                    <span className="jobdetail-value">{job.location || "—"}</span>
                    </div>
                </div>

                <div className="jobdetail-notes">
                    <div className="jobdetail-notes-header">
                    <h3>Notes</h3>
                    </div>
                    <p className="jobdetail-notes-text">{job.notes || "No notes added."}</p>
                </div>

                <div className="jobdetail-actions">
                    <button className="btn btn-sm jobdetail-btn" type="button" onClick={() => {navigate(`/addjob/${id}`)}}>
                    Edit
                    </button>
                    <button className="btn btn-sm btn-outline" type="button" onClick={() => navigate('/dashboard')}>
                    Back
                    </button>
                </div>
                </div>
            </div>
            </div>
    )
}
