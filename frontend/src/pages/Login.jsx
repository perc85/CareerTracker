import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const local = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [email, setEmail] = useState();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/google/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            local_time: local,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Google login failed");
      }
      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleMagicLinkLogin = async () => {
    try{
      const sendEmail = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/magic-link/send`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          user_email: email,
        })
      })
    }catch(e){
      console.log(e)
    }
  };

  return (
    <div className="flex justify-center pt-28 px-4">
      <div className="flex flex-col rounded-2xl bg-gray-50 w-full max-w-xl border">
        <div className="px-6 py-4 text-white bg-gradient-to-r from-indigo-500 to-purple-700 rounded-t-2xl">
          <h2 className="pb-2 font-bold text-2xl">Welcome Back</h2>
          <p>Sign in to continue tracking your applications</p>
        </div>

        <div className="flex justify-center bg-white rounded-b-2xl">
          <div className="px-8 py-8 w-full max-w-sm">
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log("Login Failed")}
                theme="outline"
                size="large"
                shape="pill"
                text="continue_with"
                width="320"
              />
            </div>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="space-y-3">
              <p className="text-center text-sm text-gray-600">
                Login with Magic Link
              </p>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                onClick={handleMagicLinkLogin}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                Send Magic Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
