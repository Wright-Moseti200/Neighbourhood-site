import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { contextdata } from '../context/context'

const Home = () => {
  const { getNews, getProducts, getJobs, loading, user } = useContext(contextdata)
  
  const [newsItems, setNewsItems] = useState([])
  const [products, setProducts] = useState([])
  const [jobs, setJobs] = useState([])
  const [fetchError, setFetchError] = useState(null)

  // Fetch all data on mount
  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      setFetchError(null)

      // Fetch all data in parallel
      const [newsResult, productsResult, jobsResult] = await Promise.all([
        getNews(),
        getProducts(),
        getJobs()
      ])

      // Filter data based on user's county
      const userCounty = user?.county;

      // Set news data - filter by county if user has county
      if (newsResult.success) {
        const filteredNews = userCounty 
          ? newsResult.news.filter(news => news.location === userCounty)
          : newsResult.news;
        setNewsItems(filteredNews);
      } else {
        console.error('Failed to fetch news:', newsResult.message)
      }

      // Set products data - filter by county if user has county
      if (productsResult.success) {
        const filteredProducts = userCounty 
          ? productsResult.products.filter(product => product.location === userCounty)
          : productsResult.products;
        setProducts(filteredProducts);
      } else {
        console.error('Failed to fetch products:', productsResult.message)
      }

      // Set jobs data - filter by county if user has county
      if (jobsResult.success) {
        const filteredJobs = userCounty 
          ? jobsResult.jobs.filter(job => job.location === userCounty)
          : jobsResult.jobs;
        setJobs(filteredJobs);
      } else {
        console.error('Failed to fetch jobs:', jobsResult.message)
      }
    } catch (err) {
      console.error('Error fetching data:', err)
      setFetchError('Failed to load content. Please try again later.')
    }
  }

  // We only want to show the first 4 items on the home page
  const homeNews = newsItems.slice(0, 4)
  const homeProducts = products.slice(0, 4)
  const homeJobs = jobs.slice(0, 4)

  const handleImageError = (e) => {
    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999999'%3E%3Cpath d='M4 4h16v16H4V4z'/%3E%3C/svg%3E"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-green-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to the Neighborhood KE</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {user?.county 
              ? `Connect with your neighbors in ${user.county}, stay informed about local news, discover local businesses, and find opportunities in your community.`
              : 'Connect with your neighbors, stay informed about local news, discover local businesses, and find opportunities in your community.'
            }
          </p>
          {user?.county && (
            <div className="inline-block bg-green-700 px-4 py-2 rounded-full text-sm">
              Showing content for: <strong>{user.county}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Rest of your Home component remains the same */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 text-center mb-12">
          Everything Your Neighborhood Needs
        </h2>
        
        {/* Features Section - Same as before */}
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

        {/* Error Message */}
        {fetchError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {fetchError}
            <button 
              onClick={fetchAllData}
              className="ml-4 underline hover:no-underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
            <p className="text-gray-600 mt-4">Loading content...</p>
          </div>
        )}

        {/* News Section */}
        {!loading && (
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-green-800">Latest News</h2>
              {user?.county && (
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {user.county}
                </span>
              )}
            </div>
            {homeNews.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                {user?.county 
                  ? `No news available in ${user.county} at the moment.`
                  : 'No news available at the moment.'
                }
              </p>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                  {homeNews.map(news => (
                    <Link 
                      to={`/preview?type=news&id=${news._id}`}
                      key={news._id} 
                      className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
                    >
                      <img 
                        src={news.image_url} 
                        alt={news.title} 
                        className="w-full h-48 object-cover"
                        onError={handleImageError}
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">{news.title}</h3>
                        <p className="text-xs text-gray-600 mb-2 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {news.location}
                        </p>
                        <p className="text-xs text-gray-600 line-clamp-2">{news.description}</p>
                        <p className="text-xs text-gray-500 mt-2">By: {news.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                {newsItems.length > 4 && (
                  <div className="text-center">
                    <Link
                      to="/news"
                      className="inline-block bg-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      Show More News
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Products Section */}
        {!loading && (
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-green-800">Local Products</h2>
              {user?.county && (
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {user.county}
                </span>
              )}
            </div>
            {homeProducts.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                {user?.county 
                  ? `No products available in ${user.county} at the moment.`
                  : 'No products available at the moment.'
                }
              </p>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                  {homeProducts.map(product => (
                    <Link 
                      to={`/preview?type=product&id=${product._id}`}
                      key={product._id} 
                      className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
                    >
                      <img 
                        src={product.image_url} 
                        alt={product.title} 
                        className="w-full h-48 object-cover"
                        onError={handleImageError}
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            product.status !== "Not available" ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.status !== "Not available" ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                        <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">{product.title}</h3>
                        <p className="text-xs text-gray-600 mb-3 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {product.location}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-green-800">KSh {product.price}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">Seller: {product.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                {products.length > 4 && (
                  <div className="text-center">
                    <Link
                      to="/products"
                      className="inline-block bg-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      Show More Products
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Jobs Section */}
        {!loading && (
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-green-800">Job Opportunities</h2>
              {user?.county && (
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {user.county}
                </span>
              )}
            </div>
            {homeJobs.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                {user?.county 
                  ? `No job opportunities available in ${user.county} at the moment.`
                  : 'No job opportunities available at the moment.'
                }
              </p>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                  {homeJobs.map(job => (
                    <Link 
                      to={`/preview?type=job&id=${job._id}`}
                      key={job._id} 
                      className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            job.status !== "Not available" ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {job.status !== "Not available" ? 'Available' : 'Filled'}
                          </span>
                        </div>
                        <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">{job.title}</h3>
                        <p className="text-xs text-gray-600 mb-3 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {job.location}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-green-800">KSh {job.salary}</span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2">{job.description}</p>
                        <p className="text-xs text-gray-500 mt-2">Posted by: {job.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                {jobs.length > 4 && (
                  <div className="text-center">
                    <Link 
                      to="/jobs"
                      className="inline-block bg-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      Show More Jobs
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home