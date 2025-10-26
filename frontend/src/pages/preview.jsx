import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { newsItems, products, jobs } from '../data' // Import all our data

const Preview = () => {
  // Get query params from URL
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  const [item, setItem] = useState(null);
  const [file, setFile] = useState(null); // For job application form

  // Find the correct item when the component loads or params change
  useEffect(() => {
    // Scroll to top on new item load
    window.scrollTo(0, 0);

    let dataArray;
    if (type === 'news') {
      dataArray = newsItems;
    } else if (type === 'product') {
      dataArray = products;
    } else if (type === 'job') {
      dataArray = jobs;
    }

    // Find the item by its ID.
    if (dataArray && id) {
      const foundItem = dataArray.find(i => i.id === parseInt(id));
      setItem(foundItem);
    } else {
      setItem(null); // Reset or handle 'not found'
    }
    
  }, [id, type]); // Re-run effect if id or type changes

  // --- Handlers for Job Form ---
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      alert(`Successfully submitted application for ${item.title} with file: ${file.name}`);
      // In a real app, you would upload this file to a server here.
      setFile(null); // Clear the file input
      e.target.reset(); // Reset the form
    } else {
      alert("Please select a file to submit.");
    }
  };


  // --- Render ---

  // Loading state
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <h1 className="text-2xl text-gray-500">Loading...</h1>
      </div>
    )
  }

  // If item is found, render based on type
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">

      {/* ======================= */}
      {/* NEWS ITEM LAYOUT      */}
      {/* ======================= */}
      {type === 'news' && (
        <div className="max-w-4xl mx-auto">
          <img src={item.image} alt={item.title} className="w-full h-64 md:h-96 object-cover rounded-lg mb-6 shadow-lg" />
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">{item.title}</h1>
          <div className="flex items-center text-gray-500 mb-6">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{item.location}</span>
            <span className="mx-2">|</span>
            <span>{item.date}</span>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {item.longDescription || item.description}
          </p>
        </div>
      )}

      {/* ======================= */}
      {/* PRODUCT ITEM LAYOUT    */}
      {/* ======================= */}
      {type === 'product' && (
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Column */}
          <div>
            <img src={item.image} alt={item.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">{item.name}</h1>
            
            <span className="text-3xl font-bold text-green-700 mb-4">{item.price}</span>
            
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-sm px-3 py-1 rounded-full ${item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {item.available ? 'Available' : 'Unavailable'}
              </span>
              {item.bargainable && (
                <span className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                  Bargainable
                </span>
              )}
            </div>

            <div className="text-gray-600 space-y-2 mb-6">
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {item.location}
              </p>
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Posted: {item.date}
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">{item.description}</p>
            
            <a 
              href={`tel:${item.sellerPhone}`}
              className="w-full md:w-auto text-center bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition text-lg flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Seller
            </a>
          </div>
        </div>
      )}

      {/* ======================= */}
      {/* JOB ITEM LAYOUT     */}
      {/* ======================= */}
      {type === 'job' && (
        <div className="max-w-4xl mx-auto">
          <img src={item.image} alt={item.title} className="w-full h-64 md:h-96 object-cover rounded-lg mb-6 shadow-lg" />
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">{item.title}</h1>
          <span className="text-2xl font-bold text-green-700 mb-4 block">{item.salary}</span>
          
          <div className="flex items-center text-gray-500 mb-6 flex-wrap gap-x-4 gap-y-2">
            <p className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {item.location}
            </p>
            <span className="hidden md:inline">|</span>
            <span className={`text-sm px-3 py-1 rounded-full ${item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {item.available ? 'Available' : 'Unavailable'}
            </span>
            {item.bargainable && (
              <span className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                Salary Bargainable
              </span>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job Details</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{item.description}</p>
            
            {item.responsibilities && (
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Responsibilities</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
                  {item.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Resume Drop Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">Apply for this Job</h3>
              <p className="text-gray-600 mb-4">Interested? Upload your CV or Resume below.</p>
              <form onSubmit={handleSubmit}>
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-100 file:text-green-800
                    hover:file:bg-green-200"
                />
                <button 
                  type="submit"
                  disabled={!item.available} // Disable button if job is unavailable
                  className="mt-4 w-full md:w-auto bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition text-lg
                  disabled:bg-gray-400 disabled:cursor-not-allowed">
                  {item.available ? 'Submit Application' : 'Position Filled'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Preview