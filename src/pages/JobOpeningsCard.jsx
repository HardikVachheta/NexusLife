import { UserCheck2, Users2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJobByCompanyName } from '../services/jobService';

const JobOpeningsCard = () => {
    const [jobList, setJobList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { companyName } = useParams();

    useEffect(() => {
        const fetchJobDetails = async () => {
            if (!companyName || companyName === 'jobs' || companyName === '') {
                setError("Please specify a company name in the URL (e.g., /jobs/infynno)");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            setJobList([]); // Clear previous jobs
            try {
                const response = await fetchJobByCompanyName(companyName);
                setJobList(response);
            } catch (err) {
                console.error("Error fetching job data:", err);
                setError("Failed to fetch job details. Please ensure the server is running and the company name is correct.");
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [companyName]);

    // Render different UI based on the state (loading, error, success).
    return (
        <div
            style={{ backgroundColor: 'rgba(43, 56, 83, 0.13)', backdropFilter: 'blur(2px)' }}
            className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-2 sm:mb-4">
                    Job Openings at {companyName}
                </h1>
                <p className="text-lg sm:text-xl text-center text-gray-600 mb-8 sm:mb-12">
                    Explore available positions and find your next role.
                </p>

                {loading && (
                    <div className="text-center py-8">
                        <p className="text-gray-600 animate-pulse">Loading job details...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline ml-2">{error}</span>
                    </div>
                )}

                {jobList.length > 0 && !loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {jobList.map((job, index) => (
                            <div
                                key={index}
                                className="bg-gray-200 opacity-90 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 flex flex-col justify-between"
                            >
                                <div className="mb-4">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{job.title}</h2>
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <UserCheck2 className='text-indigo-500 h-5 w-5 mr-2' />
                                        <p className="text-sm font-medium">{job.experience ? job.experience : " N/A"}</p>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Users2Icon className='text-indigo-500 h-5 w-5 mr-2' />
                                        <p className="text-sm font-medium">{job.opening ? job.opening : "N/A" }</p>
                                    </div>
                                </div>
                                <button style={{backgroundColor: "rgb(79 70 229)"}}
                                    className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                                >
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {jobList.length === 0 && !loading && !error && (
                    <div className="text-center py-8">
                        <p className="text-gray-600">No job openings found at this time.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobOpeningsCard;
