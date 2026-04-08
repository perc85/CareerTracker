import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "../styles/AuthPage.css";

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
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue tracking your applications</p>
        </div>

        <div className="auth-body">
          <div className="auth-provider">
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
