import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    // console.log(user)
    const location = useLocation();

    if (loading) {
        return <div className="text-center text-xl font-bold">Loading...</div>;
    }

    return user ? children : <Navigate to="/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;
