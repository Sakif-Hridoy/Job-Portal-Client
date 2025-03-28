import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const JobDetails = () => {
  const job = useLoaderData();
  const {
    _id,
    title,
    company,
    location,
    jobType,
    category,
    applicationDeadline,
    salaryRange,
    description,
    requirements,
    responsibilities,
    hr_email,
    hr_name,
    company_logo,
  } = job;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Job Card */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center p-6">
          {/* Company Logo */}
          <img
            src={company_logo}
            alt={`${company} Logo`}
            className="w-24 h-24 object-cover rounded-full shadow-lg border p-1"
          />
          {/* Job Details */}
          <div className="md:ml-6 text-center md:text-left mt-4 md:mt-0">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-gray-600">{company}</p>
            <p className="text-gray-500">{location}</p>
            <div className="mt-2">
              <span className="badge badge-primary">{jobType}</span>
              <span className="badge badge-accent ml-2">{category}</span>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
          <p className="text-gray-700">{description}</p>
        </div>

        {/* Requirements & Responsibilities */}
        <div className="p-6 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Requirements */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Requirements</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          {/* Responsibilities */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {responsibilities.map((res, index) => (
                <li key={index}>{res}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Salary & Deadline */}
        <div className="p-6 border-t flex flex-col md:flex-row justify-between">
          <p className="text-gray-700">
            <strong>Salary:</strong> {salaryRange.min} - {salaryRange.max} {salaryRange.currency.toUpperCase()}
          </p>
          <p className="text-red-500">
            <strong>Deadline:</strong> {applicationDeadline}
          </p>
        </div>

        {/* HR Contact & Apply Button */}
        <div className="p-6 border-t flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-700">
            <p>
              <strong>HR Contact:</strong> {hr_name}
            </p>
            <p>
              <strong>Email:</strong> <a href={`mailto:${hr_email}`} className="text-blue-600">{hr_email}</a>
            </p>
          </div>
          <Link to={`/jobapply/${_id}`}>
            <button className="btn btn-primary mt-4 md:mt-0">Apply Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
