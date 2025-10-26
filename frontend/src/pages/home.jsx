import React from 'react'
import { Link } from 'react-router-dom' // Import Link
import { newsItems, products, jobs } from '../data' // Import data from data.js

const Home = () => {
   

  // We only want to show the first 4 items on the home page
  const homeNews = newsItems.slice(0, 4);
  const homeProducts = products.slice(0, 4);
  const homeJobs = jobs.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-green-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to the Neighborhood KE</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Connect with your neighbors, stay informed about local news, discover local businesses, and find opportunities in your community.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 text-center mb-12">
          Everything Your Neighborhood Needs
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-3">Local News</h3>
            <p className="text-gray-600">
              Stay updated with what's happening in your community. From events to important announcements.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-3">Job Opportunities</h3>
            <p className="text-gray-600">
              Find local employment opportunities and connect with businesses in your area.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-3">Local Products</h3>
            <p className="text-gray-600">
              Discover products and services from businesses right in your neighborhood.
            </p>
          </div>
        </div>

        {/* News Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">Latest News</h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            {homeNews.map(news => (
              // UPDATED: Card is now a Link
              <Link 
                to={`/preview?type=news&id=${news.id}`}
                key={news.id} 
                className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">{news.date}</span>
                  </div>
                  <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">{news.title}</h3>
                  <p className="text-xs text-gray-600 mb-2 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {news.location}
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">{news.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            {/* UPDATED: Button is now a Link */}
            <Link
              to="/news"
              className="bg-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Show More News
            </Link>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">Local Products</h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            {homeProducts.map(product => (
              // UPDATED: Card is now a Link
              <Link 
                to={`/preview?type=product&id=${product.id}`}
                key={product.id} 
                className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">{product.date}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">{product.name}</h3>
                  <p className="text-xs text-gray-600 mb-3 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {product.location}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-green-800">{product.price}</span>
                    {product.bargainable && (
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        Bargainable
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            {/* UPDATED: Button is now a Link */}
            <Link
              to="/products"
              className="bg-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Show More Products
            </Link>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">Job Opportunities</h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            {homeJobs.map(job => (
              // UPDATED: Card is now a Link
              <Link 
                to={`/preview?type=job&id=${job.id}`}
                key={job.id} 
                className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
              >
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
              </Link>
            ))}
          </div>
          <div className="text-center">
            {/* UPDATED: Button is now a Link */}
            <Link 
              to="/jobs"
              className="bg-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Show More Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home