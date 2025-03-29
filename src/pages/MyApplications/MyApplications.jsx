import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyApplications = () => {
  const { user } = useAuth();
  console.log(user)
  const [jobs, setJobs] = useState([]);
  console.log(jobs)

  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    // fetch(`https://job-portal-server-nrz5.onrender.com/job-applications?email=${user.email}`)
    //   .then((res) => res.json())
    //   .then((data) => setJobs(data));
    // axios.get(`https://job-portal-server-nrz5.onrender.com/job-applications?email=${user.email}`,{
    //   withCredentials:true
    // })
    // .then(res=>setJobs(res.data))
    axiosSecure.get(`job-applications?email=${user?.email}`)
    .then(res=>setJobs(res.data))

  }, []);

  return (
    <div>
      <h2 className="text-3xl text-center font-bold">My Applications: {jobs.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                Serial
              </th>
              <th>Email</th>
              <th>Job</th>
              <th>Job Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {jobs.map((job,index) => (
              <tr key={job._id}>
                <th>{index+1}</th>
                
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <span>{job.applicant_email}</span>
                    </div>
                    <div>
                      <div className="font-bold"></div>
                      <div className="text-sm opacity-50"></div>
                    </div>
                  </div>
                </td>
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
    </div>
  );
};

export default MyApplications;
