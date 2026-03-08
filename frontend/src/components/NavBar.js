import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'

export default function NavBar({showNav}) {
  return (
    <nav>
        <h2>Career Tracker</h2>
        <div>
          {showNav ? (
            <>
              <Link to={'/dashboard'}>DashBoard</Link>
              <Link to={'/resume'}>Resume</Link>
              <Link to={'/addjob'}>Add a Job</Link>
              <Link to={'/profile'}>Profile</Link>
            </>
          ) : null}
        </div>
    </nav>
  )
}
