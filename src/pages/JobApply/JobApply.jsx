import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import useAuth from "../../hooks/useAuth";

const JobApply = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const submitJobApplication = (e) => {
    e.preventDefault();
    const form = e.target;
    const linkedIn = form.linkedIn.value;
    const github = form.github.value;
    const resume = form.resume.value;
    const api_key = import.meta.env.VITE_API_KEY;

    const jobApplication = {
      job_id: id,
      applicant_email: user.email,
      linkedIn,
      github,
      resume,
    };

    fetch("https://job-portal-server-nrz5.onrender.com/job-application", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key":api_key,
      },
      credentials: "include",
      body: JSON.stringify(jobApplication),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your application has been submitted!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/myApplications");
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Apply for the Job
        </h1>
        <form onSubmit={submitJobApplication} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">LinkedIn URL</span>
            </label>
            <input
              type="url"
              name="linkedIn"
              placeholder="Enter your LinkedIn profile URL"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">GitHub URL</span>
            </label>
            <input
              type="url"
              name="github"
              placeholder="Enter your GitHub profile URL"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Resume URL</span>
            </label>
            <input
              type="url"
              name="resume"
              placeholder="Enter your resume URL"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control mt-4">
            <button className="btn btn-primary w-full">Apply Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApply;
