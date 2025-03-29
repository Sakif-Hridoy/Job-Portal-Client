import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons

const Header = () => {
  const { user, signInUser, logoutUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser()
      .then(() => console.log("User logged out"))
      .catch((err) => console.error(err));
  };

  return (
    <nav className="navbar bg-base-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Job Portal
        </Link>

        {/* Desktop Menu (Hidden on Small Screens) */}
        <div className="hidden lg:flex space-x-6">
          <NavLink className="font-bold" to="/">
            Home
          </NavLink>
          <NavLink className="font-bold" to="/myApplications">
            My Applications
          </NavLink>
          <NavLink className="font-bold" to="/addjob">
            Post Job
          </NavLink>
          <NavLink className="font-bold" to="/mypostedjobs">
            My Posted Jobs
          </NavLink>
        </div>

        {/* User Actions (Always Visible) */}
        <div className="hidden lg:flex items-center space-x-4">
          {user && signInUser ? (
            <>
              <span className="font-bold">{user.displayName || user.email}</span>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink className="btn btn-sm btn-primary" to="/signin">
                Sign In
              </NavLink>
              <NavLink className="btn btn-sm" to="/register">
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-white z-50 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col items-center py-10 space-y-6`}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-3xl"
          onClick={() => setMenuOpen(false)}
        >
          <FiX />
        </button>

        <ul className="flex flex-col items-center space-y-6 text-lg font-semibold">
          <NavLink
            className="hover:text-blue-600"
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            className="hover:text-blue-600"
            to="/myApplications"
            onClick={() => setMenuOpen(false)}
          >
            My Applications
          </NavLink>
          <NavLink
            className="hover:text-blue-600"
            to="/addjob"
            onClick={() => setMenuOpen(false)}
          >
            Post Job
          </NavLink>
          <NavLink
            className="hover:text-blue-600"
            to="/mypostedjobs"
            onClick={() => setMenuOpen(false)}
          >
            My Posted Jobs
          </NavLink>
        </ul>

        {/* User Actions in Mobile Menu */}
        <div className="mt-6 flex flex-col items-center space-y-4">
          {user && signInUser ? (
            <>
              <span className="block text-lg font-bold">{user.displayName || user.email}</span>
              <button
                onClick={handleLogout}
                className="btn btn-secondary px-6 py-2 text-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                className="btn btn-primary text-lg px-6 py-2"
                to="/signin"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </NavLink>
              <NavLink
                className="btn px-6 py-2 text-lg"
                to="/register"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
