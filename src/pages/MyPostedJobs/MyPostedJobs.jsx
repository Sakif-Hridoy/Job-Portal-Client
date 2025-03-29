import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { user } = useAuth();
  const api_key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setLoading(true);
    fetch(`https://job-portal-server-nrz5.onrender.com/jobs?email=${user?.email}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-api-key': api_key,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false)); // Handle errors
  }, []);

  return (
    <div>
      <h2 className="text-3xl text-center font-bold">
        My Posted Jobs: {loading ? "Loading..." : jobs.length}
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Serial</th>
                <th>Email</th>
                <th>Job</th>
                <th>Job Type</th>
                <th>Application Count</th>
                <th>View Applications</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job._id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{job.title}</td>
                  <td>{job.jobType}</td>
                  <td>{job.applicationCount}</td>
                  <td>
                    <Link to={`/viewapplications/${job._id}`}>
                      <button className="btn btn-sm btn-accent font-bold">
                        View Application
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button className="btn btn-active btn-sm">DEL</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPostedJobs;
