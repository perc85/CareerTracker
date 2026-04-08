import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import DashBoard from "./pages/DashBoard";
import NavBar from "./components/NavBar";
import JobDetail from "./pages/JobDetail";
import AddJob from "./pages/AddJob";
import Resume from "./pages/Resume";
import AddResume from "./pages/AddResume";
import ProtectedRoute from "./components/ProtectedRoute";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? <NavBar /> : <NavBar showNav={true} />}

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
          path="/addresume"
          element={
            <ProtectedRoute>
              <AddResume />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
