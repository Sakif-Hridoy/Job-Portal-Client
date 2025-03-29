import React, { useEffect, useState } from "react";
import HotJobCard from "./HotJobCard";

const HotJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [activeCategory, setActiveCategory] = useState("All Jobs");

  useEffect(() => {
    setLoading(true);
    fetch("https://job-portal-server-nrz5.onrender.com/jobs", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false)); // Handle errors
  }, []);

  return (
    <>
      <div>
        <div className="text-3xl font-bold text-center mt-6">
          {loading ? "Loading Jobs..." : "Jobs Of The Day"}
        </div>
        <p className="text-center text-gray-700 mt-4">
          Search and connect with the right candidates faster
        </p>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {/* Category Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            {["All Jobs", ...new Set(jobs.map((job) => job.category))]
              .filter((category) => category)
              .map((category) => (
                <button
                  key={category}
                  className={`btn ${
                    activeCategory === category ? "btn-primary" : "btn-accent"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
          </div>

          {/* Filtered Jobs */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {jobs
              .filter(
                (job) =>
                  activeCategory === "All Jobs" || job.category === activeCategory
              )
              .map((job) => (
                <HotJobCard key={job._id} job={job} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default HotJobs;
