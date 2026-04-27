import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/google`,
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

  return (
    <div className="flex justify-center pt-28 px-4">
      <div className="flex flex-col rounded-2xl bg-gray-50 w-full max-w-xl border">
        <div className="px-6 py-4 text-white bg-gradient-to-r from-indigo-500 to-purple-700 rounded-t-2xl">
          <h2 className="pb-2 font-bold text-2xl">Welcome Back</h2>
          <p>Sign in to continue tracking your applications</p>
        </div>

        <div className="flex justify-center bg-white rounded-b-2xl">
          <div className="px-8 py-8">
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
        </div>
      </div>
    </div>
  );
}
