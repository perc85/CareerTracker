import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function NavBar({ navType }) {
  const [open, setOpen] = useState(false);

  const linkStyles =
    "px-3 py-2 rounded-md border-b-2 border-transparent transition duration-200 hover:bg-white/10 hover:border-white";

  const regularLinks = (
    <>
      <NavLink className={linkStyles} to="/dashboard">
        DashBoard
      </NavLink>
      <NavLink className={linkStyles} to="/resume">
        Resume
      </NavLink>
      <NavLink className={linkStyles} to="/addjob">
        Add Job
      </NavLink>
      <NavLink className={linkStyles} to="/profile">
        Profile
      </NavLink>
    </>
  );

  const homepageLinks = (
    <>
      <NavLink className={linkStyles} to="/login">
        Login
      </NavLink>
      <NavLink className={linkStyles} to="/signup">
        Sign up
      </NavLink>
    </>
  );

  let linksToShow = null;

  if (navType === "regular") {
    linksToShow = regularLinks;
  } else if (navType === "homepage") {
    linksToShow = homepageLinks;
  }

  return (
    <nav className="top-0 left-0 z-50 w-full fixed bg-gradient-to-r from-indigo-500 to-purple-700 text-white">
      <div className="flex justify-between items-center px-8 py-4">
        <Link to={'/'} className="font-bold text-2xl transition-opacity hover:opacity-80">Career Tracker</Link>

        {navType !== "none" && (
          <button
            className="md:hidden flex flex-col gap-1"
            onClick={() => setOpen(!open)}
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
        )}

        <div className="hidden md:flex gap-8 px-4 font-bold">{linksToShow}</div>
      </div>

      {open && navType !== "none" && (
        <div className="flex flex-col gap-4 px-8 pb-4 md:hidden font-bold">
          {navType === "regular" && (
            <>
              <NavLink
                className={linkStyles}
                to="/dashboard"
                onClick={() => setOpen(false)}
              >
                DashBoard
              </NavLink>
              <NavLink
                className={linkStyles}
                to="/resume"
                onClick={() => setOpen(false)}
              >
                Resume
              </NavLink>
              <NavLink
                className={linkStyles}
                to="/addjob"
                onClick={() => setOpen(false)}
              >
                Add Job
              </NavLink>
              <NavLink
                className={linkStyles}
                to="/profile"
                onClick={() => setOpen(false)}
              >
                Profile
              </NavLink>
            </>
          )}

          {navType === "homepage" && (
            <>
              <NavLink
                className={linkStyles}
                to="/login"
                onClick={() => setOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                className={linkStyles}
                to="/signup"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
