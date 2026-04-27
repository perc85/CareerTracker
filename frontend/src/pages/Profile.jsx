import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();

  const handleEdit = () => {
    alert("Edit functionality coming soon!")
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/", { replace: true });
    console.log("Logout successful");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchUserInfo = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/profile/get-profile-info`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      setUserData(data);
    };

    fetchUserInfo();
  }, []);

  if (!userData || !userData.user) {
    return (
      <div className="flex justify-center pt-28">
        <div className="flex flex-col border rounded-2xl">
          <div className="w-full rounded-t-2xl bg-gradient-to-r from-indigo-500 to-purple-700 py-12"></div>
          <div className="px-20 py-10">
            <h2 className="font-bold text-2xl">Loading Profile Details...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center max-h-full pt-28 pb-8 px-4">
      <div className="flex flex-col border w-full max-w-4xl rounded-2xl shadow-xl bg-gray-50">
        <div className="flex justify-between bg-gradient-to-r from-indigo-500 to-purple-700 text-white px-8 py-4 rounded-t-2xl">
          <div>
            <h2 className="font-bold text-2xl">Profile</h2>
            <p className="pt-2">Your account details</p>
          </div>
          <div className="flex justify-center gap-4">
            <button className="border px-4 my-2 rounded-2xl font-bold hover:-translate-y-1 duration-200 ease-in-out bg-white/10" onClick={handleEdit}>
              Edit
            </button>
            <button className="border px-4 my-2 rounded-2xl font-bold hover:-translate-y-1 duration-200 ease-in-out bg-white/10" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex px-8 py-4 gap-4 pt-6">
          <div>
            <img
              src={userData.user.profile_picture}
              alt={`${userData.user.name}`}
              className="rounded-full border border-indigo-500 border-4"
            />
          </div>
          <div className="flex flex-col h-full justify-between">
            <h2 className="font-bold text-2xl">{userData.user.name}</h2>
            <p className="font-semibold">{userData.user.email}</p>
            <p className="font-bold text-gray-500">
              Joined{" "}
              {userData.user.created_at
                ? new Date(userData.user.created_at).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-between px-8 pt-4">
          {[
            ["Applied", "applied"],
            ["Interview", "interview"],
            ["Offer", "offer"],
            ["Accepted", "accepted"],
            ["Rejected", "rejected"],
            ["Total", "total"],
          ].map(([label, key]) => (
            <div
              className="flex flex-col items-center border border-gray-300 shadow rounded-2xl w-full cursor-pointer py-3"
              key={key}
              onClick={() => navigate(`/dashboard/${label}`)}
            >
              <span className="font-bold opacity-80">{label}</span>
              <span className="font-bold text-lg">
                {key === "total"
                  ? Object.values(userData?.stats || {}).reduce(
                      (sum, v) => sum + (Number(v) || 0),
                      0,
                    )
                  : (userData?.stats?.[key] ?? 0)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-300 my-6 mx-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8">
          <div className="border px-4 rounded-2xl py-2">
            <p className="font-semibold text-gray-600 pb-2">Email</p>
            <p className="font-bold">{userData.user.email}</p>
          </div>
          <div className="border px-4 rounded-2xl py-2">
            <p className="font-semibold text-gray-600 pb-2">Name</p>
            <p className="font-bold">{userData.user.name}</p>
          </div>
        </div>
        <div className="flex justify-center border my-4 mx-8 rounded-2xl p-4">
          <p className="font-light text-black">More coming soon!</p>
        </div>
      </div>
    </div>
  );
}
