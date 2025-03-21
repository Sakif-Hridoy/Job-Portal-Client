import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import Register from "./pages/Register/Register.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import JobDetails from "./pages/JobDetails/JobDetails.jsx";
import PrivateRoute from "./privateRoute/PrivateRoute.jsx";

// Loader function for fetching job details
const jobDetailsLoader = async ({ params }) => {
  const response = await fetch(`https://api.example.com/jobs/${params.id}`);
  if (!response.ok) {
    throw new Response("Job not found", { status: 404 });
  }
  return response.json();
};

// Define routes with loaders
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      { index: true, element: <Home /> },
      { path: "signin", element: <SignIn /> },
      { path: "register", element: <Register /> },
      { 
        path: "/jobs/:id", 
        element: <PrivateRoute><JobDetails></JobDetails></PrivateRoute>, 
        loader:({params})=> fetch(`http://localhost:5000/jobs/${params.id}`)
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);