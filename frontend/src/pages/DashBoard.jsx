import { React, useEffect, useState } from 'react'
import '../styles/dashboard.css'
import { appStatus, jobInformation } from '../api/dashBoard'
import '../components/jobCard'
import StatCard from '../components/statCard'
import JobCard from '../components/jobCard'

export default function DashBoard() {

  const [applicationData, setApplicationData] = useState({
    'Accepted': 0,
    'Rejected': 0,
    'Pending': 0,
    'Total': 0
  })

  const [jobInfo, setJobInfo] = useState([])

  const statusConfig = [
    {'key': 'Accepted', 'color': "bg-green-100"},
    {'key': 'Pending', 'color': "bg-yellow-100"},
    {'key': 'Rejected', 'color': "bg-red-100"},
    {'key': 'Total', 'color': "bg-blue-100"}
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
  }, []);



  return (
    <div className='flex flex-col gap-10 p-8'>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
        {statusConfig.map(status => (
          <StatCard 
            key = {status.key}
            title={status.key}
            color = {status.color}
            value = {applicationData[status.key]}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
        {jobInfo.map(jobs => (
          <JobCard
            key = {jobs.id}
            id = {jobs.id}
            name = {jobs.company}
            title = {jobs.title}
            date = {jobs.date_applied}
            type = {jobs.job_type}
            location = {jobs.location}
            status = {jobs.status}
            salary = {jobs.salary_range}
            notes = {jobs.notes}
          />
        ))}
      </div>
    </div>
  )
}
