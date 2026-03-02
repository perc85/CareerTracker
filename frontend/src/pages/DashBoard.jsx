import { React, useEffect, useState } from 'react'
import '../styles/dashboard.css'
import { appStatus, jobInformation } from '../api/dashBoard'
import '../components/jobCard'
import StatCard from '../components/statCard'
import JobCard from '../components/jobCard'
import { useNavigate } from 'react-router-dom'

export default function DashBoard() {

  const navigate = useNavigate()

  const [applicationData, setApplicationData] = useState({
    'Accepted': 0,
    'Rejected': 0,
    'Interview': 0,
    'Offer': 0,
    'Total': 0
  })

  const [jobInfo, setJobInfo] = useState([])

  const statusConfig = [
    {'key': 'Accepted', 'color': "bg-green-100"},
    {'key': 'Rejected', 'color': "bg-red-100"},
    {'key': 'Offer', 'color': "bg-yellow-100"},
    {'key': 'Interview', 'color': 'bg-green-100'},
    {'key': 'Total', 'color': "bg-blue-100"}
  ]

  useEffect(() => {
    const fetchApplicationData = async () => {
      const result = await appStatus()
      console.log(result)
      setApplicationData(result)
    }

    const fetchJobInformation = async () => {
      const result = await jobInformation()
      setJobInfo(result)
    }

    fetchApplicationData()
    fetchJobInformation()
  }, []);



  return (
    <div className="dashboard-container">

      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-5 gap-5 max-w-6xl w-full px-6">
          {statusConfig.map((status) => (
            <StatCard
              key={status.key}
              title={status.key}
              color={status.color}
              value={applicationData[status.key]}
            />
          ))}
        </div>
      </div>

      <div className="jobs-grid">
        {jobInfo.map(jobs => (
          <JobCard
            key={jobs.id}
            id={jobs.id}
            name={jobs.company}
            title={jobs.title}
            date={jobs.date_applied ? jobs.date_applied : "---"}
            type={jobs.job_type}
            location={jobs.location}
            status={jobs.status}
            salary={jobs.salary_range}
            notes={jobs.notes}
          />
        ))}
      </div>

      <div className="add-job-wrapper">
        <button
          name="add-jobs"
          className="add-job-button"
          onClick={() => navigate('/addjob')}
        >
          + Add More Job Applications
        </button>
      </div>

    </div>
  )
}
