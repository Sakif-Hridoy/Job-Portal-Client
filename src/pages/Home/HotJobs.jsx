import React, { useEffect, useState } from "react";
import HotJobCard from "./HotJobCard";

const HotJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Jobs");
  const api_key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetch("http://localhost:5000/jobs", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-api-key": api_key,
      },
      credentials:"include",
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, []);

  return (
    <>
      <div>
        <div className="text-3xl font-bold text-center mt-6">Jobs Of The Day</div>
        <p className="text-center text-gray-700 mt-4">
          Search and connect with the right candidates faster
        </p>
      </div>

      {/* Category Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        {["All Jobs", ...new Set(jobs.map((job) => job.category))].filter((category)=>category).map(
          (category) => (
            <button
              key={category}
              className={`btn ${
                activeCategory === category ? "btn-primary" : "btn-accent"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          )
        )}
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
  );
};

export default HotJobs;
