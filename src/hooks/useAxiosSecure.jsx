import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const api_key = import.meta.env.VITE_API_KEY; 

const axiosInstance = axios.create({
    baseURL:'https://job-portal-server-nrz5.onrender.com',
    withCredentials:true,
    headers:{
      "Content-Type":"application/json",
      "x-api-key":api_key,
    }

})

const useAxiosSecure = () => {
    const {logoutUser} = useAuth();
    const navigate = useNavigate();

   useEffect(()=>{
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
          console.log("error caught in interceptor", error);
          if (error.response?.status === 401 || error.response?.status === 403) {
            console.log("need to log out the user");
            logoutUser().then(() => {
              console.log("logged out user");
              navigate("/signin");
            });
          }
          return Promise.reject(error);
        }
      );
      
   })

    return axiosInstance
};

export default useAxiosSecure;