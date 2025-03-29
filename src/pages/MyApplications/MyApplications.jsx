import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyApplications = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    axiosSecure.get(`job-applications?email=${user?.email}`)
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false)); // Handle errors
  }, []);

  return (
    <div>
      <h2 className="text-3xl text-center font-bold">
        My Applications: {loading ? "Loading..." : jobs.length}
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job._id}>
                  <th>{index + 1}</th>
                  <td>{job.applicant_email}</td>
                  <td>
                    {job.title}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {job.category}
                    </span>
                  </td>
                  <td>{job.jobType}</td>
                  <th>
                    <button className="btn btn-active btn-sm">DEL</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
