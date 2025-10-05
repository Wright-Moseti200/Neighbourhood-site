import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  // Sample data for Nakuru/Kenya
  const newsItems = [
    {
      id: 1,
      title: "Nakuru County Launches Free Wi-Fi in CBD",
      location: "Nakuru CBD",
      description: "The county government has installed free public Wi-Fi hotspots across the central business district to boost digital connectivity.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Lake Nakuru Water Levels Rising",
      location: "Lake Nakuru",
      description: "Conservationists report increased water levels at Lake Nakuru National Park, attracting more flamingos to the area.",
      image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop",
      date: "5 days ago"
    },
    {
      id: 3,
      title: "New Market Opens in Milimani",
      location: "Milimani, Nakuru",
      description: "A modern farmers market has opened its doors, providing fresh produce and local goods to residents.",
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop",
      date: "1 week ago"
    },
    {
      id: 4,
      title: "Nakuru Tech Hub Hosts Startup Weekend",
      location: "Nakuru Town",
      description: "Young entrepreneurs gathered for a 3-day intensive program to develop innovative business solutions.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
      date: "1 week ago"
    }
  ]

  const products = [
    {
      id: 1,
      name: "Fresh Avocados (1kg)",
      location: "Njoro",
      price: "KSh 150",
      bargainable: true,
      available: true,
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
      date: "1 day ago"
    },
    {
      id: 2,
      name: "Handmade Kiondo Basket",
      location: "Nakuru Town",
      price: "KSh 800",
      bargainable: true,
      available: true,
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
      date: "3 days ago"
    },
    {
      id: 3,
      name: "Dairy Milk (5L)",
      location: "Molo",
      price: "KSh 300",
      bargainable: false,
      available: false,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop",
      date: "4 days ago"
    },
    {
      id: 4,
      name: "Wooden Coffee Table",
      location: "Pipeline, Nakuru",
      price: "KSh 5,500",
      bargainable: true,
      available: true,
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&h=300&fit=crop",
      date: "6 days ago"
    }
  ]

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
    }
  ]
   const navigate = useNavigate() 
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
            {newsItems.map(news => (
              <div key={news.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
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
              </div>
            ))}
          </div>
          <div className="text-center">
            <button 
            onClick={()=>{
              navigate("/news");
              window.scroll(0,0);
            }}
             className="bg-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
              Show More News
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">Local Products</h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            {products.map(product => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
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
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
            onClick={()=>{
              navigate("/products")
              window.scroll(0,0);
            }}
             className="bg-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
              Show More Products
            </button>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">Job Opportunities</h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            {jobs.map(job => (
              <div key={job.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
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
          <div className="text-center">
            <button onClick={()=>{
              navigate("/jobs")
              window.scroll(0,0);
            }} className="bg-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
              Show More Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home