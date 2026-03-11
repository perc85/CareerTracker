import React from 'react'
import '../styles/Profile.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {

  const [userData, setUserData] = useState([])

  const navigate = useNavigate()

  const handleLogout = () => {
  
    localStorage.removeItem('access_token')
    navigate('/', { replace: true })
    console.log('Logout successful')
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    const fetchUserInfo = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/get-profile-info`, {
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
            <button className="profile-btn" type="button" onClick={handleLogout}>
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
                src={userData?.user?.profile_picture || ""}
                alt="Profile"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="profile-identity">
              <h3>{userData?.user?.name || "—"}</h3>
              <p className="profile-email">{userData?.user?.email || "—"}</p>
              <p className="profile-meta">
                Joined{" "}
                <span>
                  {userData?.user?.created_at
                    ? new Date(userData.user.created_at).toLocaleDateString()
                    : "—"}
                </span>
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="profile-stats" aria-label="Application stats">
            {[
              ["Applied", "applied"],
              ["Interview", "interview"],
              ["Offer", "offer"],
              ["Accepted", "accepted"],
              ["Rejected", "rejected"],
              ["Total", "total"],
            ].map(([label, key]) => (
              <div className="profile-stat cursor-pointer" key={key} onClick={() => navigate(`/dashboard/${label}`)}>
                <span className="profile-stat-label">{label}</span>
                <span className="profile-stat-value">
                  {key === "total"
                    ? Object.values(userData?.stats || {}).reduce(
                        (sum, v) => sum + (Number(v) || 0),
                        0
                      )
                    : userData?.stats?.[key] ?? 0}
                </span>
              </div>
            ))}
          </div>

          <div className="profile-divider" />

          {/* Details grid */}
          <div className="profile-grid">
            <div className="profile-field">
              <span className="profile-label">Email</span>
              <span className="profile-value">{userData?.user?.email || "—"}</span>
            </div>

            <div className="profile-field">
              <span className="profile-label">Name</span>
              <span className="profile-value">{userData?.user?.name || "—"}</span>
            </div>

            <div className="profile-field profile-span-2">
              <h1 className='text-center'>More coming soon!</h1>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
