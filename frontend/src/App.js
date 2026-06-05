import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import DashBoard from "./pages/DashBoard";
import NavBar from "./components/NavBar";
import JobDetail from "./pages/JobDetail";
import AddJob from "./pages/AddJob";
import Resume from "./pages/Resume";
import ResumeDetail from "./pages/ResumeDetail";
import AddResume from "./pages/AddResume";
import MagicLinkCallback from "./pages/MagicLinkCallback"
import ProtectedRoute from "./components/ProtectedRoute";
import { useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const location = useLocation();

  return (
    <div className="h-screen flex flex-col">
      {location.pathname === "/" || location.pathname === "/auth/magic-link/callback" ? <NavBar /> : <NavBar showNav={true} />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:name"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobdetail/:id"
            element={
              <ProtectedRoute>
                <JobDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addjob"
            element={
              <ProtectedRoute>
                <AddJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addjob/:id"
            element={
              <ProtectedRoute>
                <AddJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume"
            element={
              <ProtectedRoute>
                <Resume />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume/:id"
            element={
              <ProtectedRoute>
                <ResumeDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addresume"
            element={
              <ProtectedRoute>
                <AddResume />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/magic-link/callback" element={<MagicLinkCallback />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
