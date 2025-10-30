import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { contextdata } from '../context/context';

const News = () => {
  // Get functions and state from the context
  const { getNews, loading, error } = useContext(contextdata);

  // Local state to store news fetched from the backend
  const [newsList, setNewsList] = useState([]);
  
  // State to manage how many items are visible
  const [visibleItems, setVisibleItems] = useState(4);

  // Fetch news when the component mounts - ONLY ONCE
  useEffect(() => {
    const fetchNews = async () => {
      const response = await getNews();
      if (response.success) {
        setNewsList(response.news);
      } else {
        console.error("Failed to fetch news:", response.message);
      }
    };

    fetchNews();
  }, []); // Empty dependency array to run only once on mount

  // Function to show more items
  const loadMore = () => {
    setVisibleItems((prevCount) => prevCount + 4);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Local News</h1>
          <p className="text-lg md:text-xl opacity-90">
            Stay updated with the latest happenings in your neighborhood
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Handle Loading State */}
        {loading && (
          <div className="text-center text-lg">Loading news...</div>
        )}

        {/* Handle Error State (prints error to UI) */}
        {!loading && error && (
          <div className="text-center text-lg text-red-600">
            Error: {error}
          </div>
        )}

        {/* Handle No News Found */}
        {!loading && !error && newsList.length === 0 && (
          <div className="text-center text-lg text-gray-600">
            No news found at the moment.
          </div>
        )}

        {/* Display News Grid */}
        {!loading && !error && newsList.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 max-w-7xl">
              {/* Map over newsList from state */}
              {newsList.slice(0, visibleItems).map(news => (
                <Link 
                  to={`/preview?type=news&id=${news._id}`} 
                  key={news._id} 
                  className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition min-w-[280px]"
                >
                  <img src={news.image_url} alt={news.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500"></span>
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

            {/* Load More Button */}
            <div className="text-center">
              {visibleItems < newsList.length && (
                <button 
                  onClick={loadMore}
                  className="bg-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Load More News
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default News;