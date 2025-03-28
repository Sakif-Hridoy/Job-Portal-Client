import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const HotJobCard = ({ job }) => {
  const {
    _id,
    title,
    company,
    company_logo,
    requirements,
    description,
    location,
    salaryRange,
  } = job;
  return (
    <div className="card mt-4 bg-base-100 shadow-2xl mb-4">
     <div className="mt-4 flex gap-2">
     <figure>
        <img
        className="w-16"
          src={company_logo}
          alt="Companies"
        />
      </figure>
      <div className="">
        <h4 className="text-2xl">{company}</h4>
        <p className="flex gap-2 items-center"><FaMapMarkerAlt></FaMapMarkerAlt> {location}</p>
      </div>
     </div>
      <div className="card-body">
        <h2 className="card-title">{title}
            <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{description}</p>
        <div className="flex gap-2 flex-wrap">
                {
                    requirements.map((skill,index) =><p key={index} className="border rounded-md text-center px-2 bg-blue-400 text-white">{skill}</p>)
                }
        </div>
        <div className="card-actions flex justify-between items-center mt-4">
            <p className="flex items-center">Salary: {salaryRange.min} - {salaryRange.max} {salaryRange.currency} </p>
          <Link to={`/jobs/${_id}`}><button className="btn btn-sm btn-primary">Apply Now</button></Link>
        </div>
      </div>
    </div>
  );
};

export default HotJobCard;
