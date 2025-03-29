import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
    const { user } = useAuth();
    const navigate = useNavigate()

    const handleAddJob = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());
        const { min, max, currency, ...newJob } = initialData;
        newJob.salaryRange = { min, max, currency };
        console.log(initialData)
        newJob.requirements = newJob.requirements.split('\n');
        newJob.responsibilities = newJob.responsibilities.split('\n');
        const api_key = import.meta.env.VITE_API_KEY;

        fetch('https://job-portal-server-nrz5.onrender.com/job', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-api-key':api_key
            },
            credentials:'include',
            body: JSON.stringify(newJob)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Job Has been added.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                navigate('/mypostedjobs')
            });
            
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-semibold text-center mb-6">Post A New Job</h2>
            <form onSubmit={handleAddJob} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job title */}
                <div className="form-control">
                    <label className="label">Job Title</label>
                    <input type="text" name='title' placeholder="Job Title" className="input input-bordered w-full" required />
                </div>
                
                {/* Job Location */}
                <div className="form-control">
                    <label className="label">Job Location</label>
                    <input type="text" name='location' placeholder="Job Location" className="input input-bordered w-full" required />
                </div>
                
                {/* Job Type */}
                <div className="form-control">
                    <label className="label">Job Type</label>
                    <select name="jobType" className="select select-bordered w-full" required>
                        <option disabled selected>Pick a Job Type</option>
                        <option>Full-time</option>
                        <option>Intern</option>
                        <option>Part-time</option>
                    </select>
                </div>
                
                {/* Job Field */}
                <div className="form-control">
                    <label className="label">Job Field</label>
                    <select name="jobField" className="select select-bordered w-full" required>
                        <option disabled selected>Pick a Job Field</option>
                        <option>Engineering</option>
                        <option>Marketing</option>
                        <option>Finance</option>
                        <option>Teaching</option>
                    </select>
                </div>
                
                {/* Salary Range */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-control">
                        <label className="label">Min Salary</label>
                        <input type="text" name='min' placeholder="Min" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label">Max Salary</label>
                        <input type="text" name='max' placeholder="Max" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label">Currency</label>
                        <select name="currency" className="select select-bordered w-full" required>
                            <option disabled selected>Currency</option>
                            <option>BDT</option>
                            <option>USD</option>
                            <option>INR</option>
                        </select>
                    </div>
                </div>
                
                {/* Job Description */}
                <div className="md:col-span-2">
                    <label className="label">Job Description</label>
                    <textarea className="textarea textarea-bordered w-full" name="description" required></textarea>
                </div>
                
                {/* Company Name & Logo */}
                <div className="form-control">
                    <label className="label">Company Name</label>
                    <input type="text" name='company' placeholder="Company Name" className="input input-bordered w-full" required />
                </div>
                <div className="form-control">
                    <label className="label">Company Logo URL</label>
                    <input type="text" name='company_logo' placeholder="Company Logo URL" className="input input-bordered w-full" required />
                </div>
                
                {/* Requirements & Responsibilities */}
                <div className="md:col-span-2">
                    <label className="label">Job Requirements</label>
                    <textarea className="textarea textarea-bordered w-full" name="requirements" required></textarea>
                </div>
                <div className="md:col-span-2">
                    <label className="label">Job Responsibilities</label>
                    <textarea className="textarea textarea-bordered w-full" name="responsibilities" required></textarea>
                </div>
                
                {/* HR Info & Deadline */}
                <div className="form-control">
                    <label className="label">HR Name</label>
                    <input type="text" name='hr_name' placeholder="HR Name" className="input input-bordered w-full" required />
                </div>
                <div className="form-control">
                    <label className="label">HR Email</label>
                    <input type="text" defaultValue={user?.email} name='hr_email' placeholder="HR Email" className="input input-bordered w-full" required />
                </div>
                <div className="form-control">
                    <label className="label">Application Deadline</label>
                    <input type="date" name='applicationDeadline' className="input input-bordered w-full" required />
                </div>
                
                {/* Submit Button */}
                <div className="md:col-span-2 flex justify-center mt-4">
                    <button className="btn btn-primary w-full">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddJob;
