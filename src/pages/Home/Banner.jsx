import React from "react";
import jobBanner from "../../assets/images/job-banner.jpg"

const Banner = () => {
  return (
    <div className="hero bg-base-200 min-h-96">
      <div className="hero-content flex-col lg:flex-row">
        <div className="flex-1">
        <div className="justify-items-center">
        <img
            src= {jobBanner}
            className="max-w-sm rounded-lg shadow-2xl"
          />
        </div>
        </div>
        <div className="flex-1">
          <h1 className="text-5xl font-bold">
            The Easiest Way to Get Your New Job
          </h1>
          <p className="py-6">
            Each month, more than 3 million job seekers turn to website in their
            search for work, making over 140,000 applications every single day
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
