import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const api_key = import.meta.env.VITE_API_KEY;

  // Create user (Sign Up)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign In User
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout User
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Track Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("state Captured", currentUser);
      if (currentUser?.email) {
        const user = { email: currentUser?.email };
        axios
          .post("https://job-portal-server-nrz5.onrender.com/jwt", user, {
            withCredentials: true,
            headers:{
            "x-api-key": api_key,

            }
          })
          .then((res) => console.log(res.data));
        setUser(currentUser);
        setLoading(false);
      } else {
        axios
          .post(
            "https://job-portal-server-nrz5.onrender.com/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => console.log("logout", res.data));
        setUser("");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    loading,
    createUser,
    signInUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
