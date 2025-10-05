import React from 'react'

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Waitress/Waiter",
      location: "Nakuru CBD",
      salary: "KSh 20,000",
      bargainable: true,
      available: true,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Mechanic",
      location: "Lanet, Nakuru",
      salary: "KSh 35,000",
      bargainable: true,
      available: true,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
      date: "3 days ago"
    },
    {
      id: 3,
      title: "House Help",
      location: "Milimani",
      salary: "KSh 15,000",
      bargainable: false,
      available: false,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
      date: "5 days ago"
    },
    {
      id: 4,
      title: "Delivery Driver",
      location: "Nakuru Town",
      salary: "KSh 25,000",
      bargainable: true,
      available: true,
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=300&fit=crop",
      date: "1 week ago"
    },
    {
      id: 5,
      title: "Shop Attendant",
      location: "Pipeline, Nakuru",
      salary: "KSh 18,000",
      bargainable: true,
      available: true,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      date: "1 week ago"
    },
    {
      id: 6,
      title: "Security Guard",
      location: "Section 58, Nakuru",
      salary: "KSh 22,000",
      bargainable: false,
      available: true,
      image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400&h=300&fit=crop",
      date: "2 weeks ago"
    },
    {
      id: 7,
      title: "Plumber",
      location: "Njoro",
      salary: "KSh 30,000",
      bargainable: true,
      available: true,
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop",
      date: "2 weeks ago"
    },
    {
      id: 8,
      title: "Hair Stylist",
      location: "Nakuru CBD",
      salary: "KSh 28,000",
      bargainable: true,
      available: false,
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
      date: "3 weeks ago"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Job Opportunities</h1>
          <p className="text-lg md:text-xl opacity-90">
            Find local employment opportunities in your neighborhood
          </p>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 max-w-7xl">
          {jobs.map(job => (
            <div key={job.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition min-w-[280px]">
              <img src={job.image} alt={job.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">{job.date}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${job.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {job.available ? 'Available' : 'Unavailable'}
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
                  <span className="font-bold text-green-800">{job.salary}</span>
                  {job.bargainable && (
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      Bargainable
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <button className="bg-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
            Load More Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Jobs