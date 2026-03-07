import { React, useEffect, useState } from 'react'
import '../styles/dashboard.css'
import { appStatus, jobInformation } from '../api/dashBoard'
import '../components/jobCard'
import StatCard from '../components/statCard'
import JobCard from '../components/jobCard'
import { useNavigate, useParams } from 'react-router-dom'

export default function DashBoard() {

  const navigate = useNavigate()
  const cards = useParams()
  const [cardsToShow, setCardsToShow] = useState('total')

  const [applicationData, setApplicationData] = useState({
    'Accepted': 0,
    'Rejected': 0,
    'Interview': 0,
    'Offer': 0,
    'Total': 0
  })

  const [jobInfo, setJobInfo] = useState([])

  const statusConfig = [
    { key: "applied",   color: "bg-blue-200" },
    { key: "interview", color: "bg-purple-200" },
    { key: "offer",     color: "bg-amber-200" },
    { key: "accepted",  color: "bg-green-200" },
    { key: "rejected",  color: "bg-red-200" },
    { key: "total",     color: "bg-gray-200" }
  ]

  useEffect(() => {
    const fetchApplicationData = async () => {
      const result = await appStatus()
      setApplicationData(result)
    }

    const fetchJobInformation = async () => {
      const result = await jobInformation()
      setJobInfo(result)
    }

    fetchApplicationData()
    fetchJobInformation()

    if(Object.keys(cards).length !== 0){
      setCardsToShow(cards['name'])
    }
  }, [cards]);



  return (
    <div className="dashboard-container">

      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-6 gap-5 max-w-6xl w-full px-6">
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
      </div>

      <div className="jobs-grid">
        {jobInfo.map(jobs => (
          (cardsToShow.toLowerCase() === 'total' || cardsToShow.toLowerCase()===jobs.status.toLowerCase()) ? (
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
          ): null
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
