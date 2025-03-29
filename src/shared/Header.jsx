import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for menu

const Header = () => {
    const { user, signInUser, logoutUser } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logoutUser()
            .then(() => console.log('User logged out'))
            .catch(err => console.error(err));
    };

    return (
        <nav className="navbar bg-base-100 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4 py-3">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold">Job Portal</Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex space-x-6">
                    <NavLink className="font-bold" to="/">Home</NavLink>
                    <NavLink className="font-bold" to="/myApplications">My Applications</NavLink>
                    <NavLink className="font-bold" to="/addjob">Post Job</NavLink>
                    <NavLink className="font-bold" to="/mypostedjobs">My Posted Jobs</NavLink>
                </div>

                {/* Mobile Menu Icon */}
                <div className="lg:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-full bg-base-100 shadow-md">
                    <ul className="flex flex-col items-center py-4 space-y-4">
                        <NavLink className="font-bold" to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                        <NavLink className="font-bold" to="/myApplications" onClick={() => setMenuOpen(false)}>My Applications</NavLink>
                        <NavLink className="font-bold" to="/addjob" onClick={() => setMenuOpen(false)}>Post Job</NavLink>
                        <NavLink className="font-bold" to="/mypostedjobs" onClick={() => setMenuOpen(false)}>My Posted Jobs</NavLink>
                    </ul>
                </div>
            )}

            {/* User Actions */}
            <div className="hidden lg:flex items-center space-x-4 mr-4">
                {user && signInUser ? (
                    <>
                        <span className="font-bold">{user.displayName || user.email}</span>
                        <button onClick={handleLogout} className="btn btn-sm btn-secondary">Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink className="btn btn-sm btn-primary" to="/signin">Sign In</NavLink>
                        <NavLink className="btn btn-sm ml-2" to="/register">Register</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;
