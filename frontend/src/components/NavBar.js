import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'

export default function NavBar() {
  return (
    <nav>
        <h2>Career Tracker</h2>

        <div>
            <Link to={'/dashboard'}>DashBoard</Link>
            <Link to={'/resume'}>Resume</Link>
            <Link to={'/addjob'}>Add a Job</Link>
            <Link to={'/profile'}>Profile</Link>
        </div>
    </nav>
  )
}
