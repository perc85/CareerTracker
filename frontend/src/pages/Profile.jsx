import React from 'react'
import '../styles/Profile.css'
import { useState, useEffect } from 'react'

export default function Profile() {

  const [userData, setUserData] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    const fetchUserInfo = async () => {
      const response = await fetch('http://127.0.0.1:5000/profile/get-profile-info', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      setUserData(data)
    }

    fetchUserInfo()
  }, [])
  
  return (
    <main className="profile-page">
      <section className="profile-card" aria-label="User profile">
        <header className="profile-header">
          <div>
            <h2>Profile</h2>
            <p>Your account details</p>
          </div>

          <div className="profile-header-actions">
            <button className="profile-btn profile-btn-ghost" type="button">
              Edit
            </button>
            <button className="profile-btn" type="button">
              Sign out
            </button>
          </div>
        </header>

        <div className="profile-body">
          {/* Top section: avatar + name/email */}
          <div className="profile-top">
            <div className="profile-avatar-wrap" aria-label="Profile picture">
              <img
                className="profile-avatar"
                src={userData?.profile_picture || ""}
                alt="Profile"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="profile-identity">
              <h3>{userData?.name || "—"}</h3>
              <p className="profile-email">{userData?.email || "—"}</p>
              <p className="profile-meta">
                Joined{" "}
                <span>
                  {userData?.created_at
                    ? new Date(userData.created_at).toLocaleDateString()
                    : "—"}
                </span>
              </p>
            </div>
          </div>

          {/* Details grid */}
          <div className="profile-grid">
            <div className="profile-field">
              <span className="profile-label">Email</span>
              <span className="profile-value">{userData?.email || "—"}</span>
            </div>

            <div className="profile-field">
              <span className="profile-label">Name</span>
              <span className="profile-value">{userData?.name || "—"}</span>
            </div>


            <div className="profile-field profile-span-2">
              <span className="profile-label">Profile Picture URL</span>
              {userData?.profile_picture ? (
                <a
                  className="profile-link"
                  href={userData.profile_picture}
                  target="_blank"
                  rel="noreferrer"
                >
                  {userData.profile_picture}
                </a>
              ) : (
                <span className="profile-value">—</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
