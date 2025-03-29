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

        {/* Desktop Menu */}
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

        {/* Mobile Menu Icon */}
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
        className={`fixed top-0 left-0 w-full h-full bg-white z-50 transform ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 ease-in-out flex flex-col items-center justify-center`}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-3xl"
          onClick={() => setMenuOpen(false)}
        >
          <FiX />
        </button>

        <ul className="flex flex-col items-center space-y-6 text-xl font-semibold">
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

        {/* User Actions */}
        <div className="mt-6">
          {user && signInUser ? (
            <>
              <span className="block text-lg font-bold">{user.displayName || user.email}</span>
              <button
                onClick={handleLogout}
                className="btn btn-secondary mt-4 px-6 py-2 text-lg"
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
                className="btn mt-4 px-6 py-2 text-lg"
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
