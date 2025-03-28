import React, { useEffect, useState } from 'react';
import HotJobCard from './HotJobCard';

const HotJobs = () => {
    const [jobs,setJobs] = useState([]);
    const api_key = import.meta.env.VITE_API_KEY;
    console.log("API Key:", api_key);

    useEffect(()=>{
        fetch('http://localhost:5000/jobs',{
            method:'GET',
            headers:{
                'content-type':'application/json',
                "x-api-key":api_key,
            }
        })
        .then(res=>res.json())
        .then(data=>{console.log(data)
            setJobs(data)
        })
    },[jobs,api_key])
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {
                jobs.map(job=><HotJobCard key={job._id} job={job}></HotJobCard>)
            }
        </div>
    );
};

export default HotJobs;