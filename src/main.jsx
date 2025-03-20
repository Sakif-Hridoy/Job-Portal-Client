import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";

import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import Register from "./pages/Register/Register.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import JobDetails from "./pages/JobDetails/JobDetails.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <AuthProvider>
   <BrowserRouter> 
    <Routes>
      <Route path="/" element={<MainLayout />}> {/* Root route with Layout */}
        <Route index element={<Home />} /> {/* Home page as default route */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register></Register>} />
        <Route path="/jobs/:id" element={<JobDetails></JobDetails>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
   </AuthProvider>
  </StrictMode>
);
