// pages/CompanyJobs.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/axios";

const JobCard = ({ job }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
    <div className="flex items-start justify-between gap-4 mb-3">
      <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full whitespace-nowrap font-medium">
        {job.type || "Full-time"}
      </span>
    </div>

    <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-3">
      {job.department && (
        <span className="flex items-center gap-1">
          🏢 {job.department}
        </span>
      )}
      {job.location && (
        <span className="flex items-center gap-1">
          📍 {job.location}
        </span>
      )}
      {job.experience && (
        <span className="flex items-center gap-1">
          💼 {job.experience}
        </span>
      )}
    </div>

    {job.description && (
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        {job.description}
      </p>
    )}

    {job.skills?.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill, i) => (
          <span
            key={i}
            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    )}

    {job.applyUrl && (
      <a
        href={job.applyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-1 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
      >
        Apply Now →
      </a>
    )}
  </div>
);

const CompanyJobs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/company/${id}/jobs`);
        console.log("/api/company/${id}/jobs :",res.data);
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">
          Scanning career page for live jobs...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-lg">⚠️ {error}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 underline text-sm"
        >
          ← Go Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-800 text-sm flex items-center gap-1"
          >
            ← Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {data.company?.name}
            </h1>
            <a
              href={data.careerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline"
            >
              {data.careerUrl}
            </a>
          </div>
        </div>

        {/* Job Count Badge */}
        <div className="mb-6">
          <span className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full">
            {data.jobs?.length} Open Position{data.jobs?.length !== 1 ? "s" : ""} Found
          </span>
        </div>

        {/* Jobs Grid */}
        {data.jobs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.jobs.map((job, i) => (
              <JobCard key={i} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg font-medium">No open positions found</p>
            <p className="text-sm mt-1">
              Check their website directly:{" "}
              <a
                href={data.careerUrl}
                target="_blank"
                className="text-blue-500 underline"
              >
                {data.careerUrl}
              </a>
            </p>
          </div>
        )}

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-10">
          Last scanned: {new Date(data.scrapedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CompanyJobs;