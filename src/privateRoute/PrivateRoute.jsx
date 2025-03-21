import React, { Children, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, replace } from 'react-router-dom';

const PrivateRoute = () => {
    const {user,loading} = useContext(AuthContext);
    if(loading){
        return <span className='loading loading-ring loading-lg'></span>
    }
    if (user){
        return Children
    }
    return <Navigate to="/signin" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;