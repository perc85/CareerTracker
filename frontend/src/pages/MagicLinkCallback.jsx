import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function MagicLinkCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("signing you in...");
  const local = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const AuthenticateMagicLink = async () => {
      try {
        const token = searchParams.get("token");

        if (!token) {
          setMessage("Invalid or missing magic link token");
        }
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/magic-link/auth`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                'token': token,
                'time': local
            }),
          },
        );
        if (!response.ok) {
            throw new Error("Magic Link login failed");
        }
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        navigate("/dashboard");
      } catch (e) {
        console.error(e);
        setMessage("Magic link login failed or expired.");
      }
    };
    AuthenticateMagicLink();
  }, [searchParams, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white border rounded-2xl p-8 shadow-sm">
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}
