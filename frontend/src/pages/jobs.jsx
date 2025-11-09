import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { contextdata } from '../context/context';

const Jobs = () => {
  const { getJobs, loading, error, user } = useContext(contextdata);

  const [jobsList, setJobsList] = useState([]);
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await getJobs();
      if (response.success) {
        // Filter jobs by user's county
        const userCounty = user?.county;
        const filteredJobs = userCounty 
          ? response.jobs.filter(job => job.location === userCounty)
          : response.jobs;
        setJobsList(filteredJobs);
      }
    };

    fetchJobs();
  }, [user]); // Added user to dependency array

  const loadMore = () => {
    setVisibleItems((prevCount) => prevCount + 4);
  };

  const formatSalary = (salary) => {
    if (typeof salary === 'number') {
      return `Ksh ${salary.toLocaleString()}`;
    }
    return salary;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Job Opportunities</h1>
          <p className="text-lg md:text-xl opacity-90">
            {user?.county 
              ? `Find local employment opportunities in ${user.county}`
              : 'Find local employment opportunities in your neighborhood'
            }
          </p>
          {user?.county && (
            <div className="mt-4 inline-block bg-green-700 px-4 py-2 rounded-full text-sm">
              Showing jobs in: <strong>{user.county}</strong>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {loading && (
          <div className="text-center text-lg">Loading jobs...</div>
        )}

        {!loading && error && (
          <div className="text-center text-lg text-red-600">
            Error: {error}
          </div>
        )}

        {!loading && !error && jobsList.length === 0 && (
          <div className="text-center text-lg text-gray-600">
            {user?.county 
              ? `No job opportunities found in ${user.county} at the moment.`
              : 'No job opportunities found at the moment.'
            }
          </div>
        )}

        {!loading && !error && jobsList.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 max-w-7xl">
              {jobsList.slice(0, visibleItems).map(job => (
                <Link 
                  to={`/preview?type=job&id=${job._id}`} 
                  key={job._id} 
                  className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition min-w-[280px]"
                >
                  <img src={job.image_url} alt={job.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500"></span> 
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        job.status === 'Not available' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {job.status === 'Not available' ? 'Unavailable' : 'Available'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">{job.title}</h3>
                    <p className="text-xs text-gray-600 mb-3 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {job.location}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-800">{formatSalary(job.salary)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              {visibleItems < jobsList.length && (
                <button 
                  onClick={loadMore}
                  className="bg-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Load More Jobs
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Jobs;