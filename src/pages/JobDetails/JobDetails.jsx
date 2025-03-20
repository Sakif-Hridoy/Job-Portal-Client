import React from 'react';
import { useLoaderData } from 'react-router-dom';

const JobDetails = () => {
    const job = useLoaderData();
    return (
        <div>
            <h2>Job Details</h2>
        </div>
    );
};

export default JobDetails;