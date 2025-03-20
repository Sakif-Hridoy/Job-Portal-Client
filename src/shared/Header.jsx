import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Header = () => {
    const { user,signInUser, logoutUser } = useContext(AuthContext);

    const handleLogout = () => {
        logoutUser()
            .then(() => console.log('User logged out'))
            .catch(err => console.error(err));
    };

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl font-bold">Job Portal</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink className="font-bold" to="/">Home</NavLink></li>
                    <li><NavLink className="font-bold" to="/addCoffee">Add Job</NavLink></li>
                    <li><NavLink className="font-bold" to="/users">Users</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end">
                {user && signInUser ? (
                    <>
                        <span className="mr-3 font-bold">{user.displayName || user.email}</span>
                        <button onClick={handleLogout} className="btn btn-sm btn-error">Logout</button>
                    </>
                ) : (
                    <>
                    <NavLink className="btn btn-sm btn-primary" to="/signin">Sign In</NavLink>
                    <NavLink className="btn btn-sm ml-2" to="/register">Register</NavLink>
                    </>
                    
                )}
                
            </div>
        </div>
    );
};

export default Header;
