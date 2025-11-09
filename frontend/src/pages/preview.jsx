import React, { useEffect, useState, useContext } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { contextdata } from '../context/context';

const Preview = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const id = searchParams.get('id');
  const navigate = useNavigate();

  const {
    user,
    getCredentials,
    getNews,
    getProducts,
    getJobs,
    uploadDocument,
    submitResume,
    loading,
    error,
    clearError
  } = useContext(contextdata);

  const [item, setItem] = useState(null);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find the correct item when the component loads or params change
  useEffect(() => {
    window.scrollTo(0, 0);
    clearError();

    const fetchItem = async () => {
      try {
        let response;
        if (type === 'news') {
          response = await getNews();
          if (response.success) {
            const foundItem = response.news.find(i => i._id === id);
            setItem(foundItem);
            console.log('News item found:', foundItem);
          }
        } else if (type === 'product') {
          response = await getProducts();
          if (response.success) {
            const foundItem = response.products.find(i => i._id === id);
            setItem(foundItem);
            console.log('Product item found:', foundItem);
          }
        } else if (type === 'job') {
          response = await getJobs();
          if (response.success) {
            const foundItem = response.jobs.find(i => i._id === id);
            setItem(foundItem);
            console.log('Job item found:', foundItem);
          }
        }

        if (!item && response && !response.success) {
          console.error('Item not found');
        }
      } catch (err) {
        console.error('Error fetching item:', err);
      }
    };

    if (id && type) {
      fetchItem();
    }
  }, [id, type]);

  // Ensure user credentials are loaded
  useEffect(() => {
    if (!user) {
      getCredentials();
    }
  }, [user]);

  // Handle file change for resume
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      clearError();
    }
  };

  // Handle job application submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to apply for jobs');
      navigate('/login');
      return;
    }

    if (!file) {
      alert("Please select a resume file to submit.");
      return;
    }

    if (!item) {
      alert("Job information not available.");
      return;
    }

    setIsSubmitting(true);
    clearError();

    try {
      console.log('Starting file upload process...');
      console.log('Current user:', user);

      const uploadRes = await uploadDocument(file);
      console.log('Upload response received:', uploadRes);
      
      if (!uploadRes.success) {
        throw new Error(uploadRes.message || "Failed to upload resume");
      }

      if (!uploadRes.url) {
        throw new Error("No URL returned from document upload");
      }

      const resumeUrl = uploadRes.url;
      console.log('Resume uploaded successfully, URL:', resumeUrl);

      const applicationData = {
        owner: item.name || 'Unknown',
        title: item.title,
        salary: item.salary,
        details: item.details || item.description,
        url: resumeUrl
      };

      console.log('Application data prepared:', applicationData);
      console.log('Applicant will be automatically set to:', user.username);

      const submitRes = await submitResume(applicationData);
      console.log('Application submission response:', submitRes);
      
      if (!submitRes.success) {
        throw new Error(submitRes.message || "Failed to submit application");
      }

      alert(`Successfully submitted application for ${item.title} as ${user.username}!`);
      setFile(null);
      e.target.reset();
      
    } catch (err) {
      console.error('Application submission error:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to format price/salary
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `Ksh ${price.toLocaleString()}`;
    }
    return price;
  };

  // Loading state
  if (!item && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <h1 className="text-2xl text-gray-500">Item not found</h1>
      </div>
    );
  }

  if (loading && !item) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <h1 className="text-2xl text-gray-500">Loading...</h1>
      </div>
    );
  }

  // If item is found, render based on type
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">

      {/* Global Error Display */}
      {error && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
          <button 
            onClick={clearError}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ======================= */}
      {/* NEWS ITEM LAYOUT      */}
      {/* ======================= */}
      {type === 'news' && item && (
        <div className="max-w-4xl mx-auto">
          <img 
            src={item.image_url} 
            alt={item.title} 
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-6 shadow-lg" 
          />
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">{item.title}</h1>
          
          <div className="flex items-center text-gray-500 mb-6 flex-wrap gap-4">
            <p className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {item.location}
            </p>
            <p className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Posted by: {item.name}
            </p>
            {item.date && (
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {new Date(item.date).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* News Content */}
          <div className="prose prose-lg max-w-none">
            {item.description && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Summary</h2>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </div>
            )}

            {item.details && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Full Story</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{item.details}</p>
              </div>
            )}

            {item.content && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Content</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{item.content}</p>
              </div>
            )}

            {item.category && (
              <div className="flex items-center gap-2 mt-6">
                <span className="text-sm font-medium text-gray-600">Category:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {item.category}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================= */}
      {/* PRODUCT ITEM LAYOUT    */}
      {/* ======================= */}
      {type === 'product' && item && (
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Column */}
          <div>
            <img 
              src={item.image_url} 
              alt={item.title} 
              className="w-full h-auto object-cover rounded-lg shadow-lg" 
            />
            
            {/* Additional Images */}
            {item.images && item.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {item.images.map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    alt={`${item.title} ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">{item.title}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-green-700">
                {formatPrice(item.price)}
              </span>
              <span className={`text-sm px-3 py-1 rounded-full ${
                item.status !== "Not available" 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {item.status !== "Not available" ? 'Available' : 'Unavailable'}
              </span>
            </div>

            {/* Product Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="text-gray-600 space-y-3">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {item.location}
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Seller: {item.name}
                </p>
                {item.category && (
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    Category: {item.category}
                  </p>
                )}
              </div>

              <div className="text-gray-600 space-y-3">
                {item.tel && (
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    Phone: {item.tel}
                  </p>
                )}
                {item.email && (
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Email: {item.email}
                  </p>
                )}
                {item.condition && (
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Condition: {item.condition}
                  </p>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Product Description</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {item.description || item.details || 'No description available.'}
              </p>
            </div>

            {/* Features/Specifications */}
            {item.features && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Features</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {Array.isArray(item.features) 
                    ? item.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))
                    : <li>{item.features}</li>
                  }
                </ul>
              </div>
            )}

            {/* Contact Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {item.tel && (
                <a 
                  href={`tel:${item.tel}`}
                  className="flex-1 text-center bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Seller
                </a>
              )}
              {item.email && (
                <a 
                  href={`mailto:${item.email}`}
                  className="flex-1 text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Seller
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================= */}
      {/* JOB ITEM LAYOUT     */}
      {/* ======================= */}
      {type === 'job' && item && (
        <div className="max-w-4xl mx-auto">
          <img 
            src={item.image_url} 
            alt={item.title} 
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-6 shadow-lg" 
          />
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">{item.title}</h1>
              <span className="text-2xl font-bold text-green-700 block mb-4">
                {formatPrice(item.salary)}
              </span>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-2">
              <span className={`text-sm px-3 py-1 rounded-full ${
                item.status === 'Not available' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {item.status === 'Not available' ? 'Position Filled' : 'Available'}
              </span>
              <p className="text-sm text-gray-600">Posted by: {item.name}</p>
            </div>
          </div>

          {/* Job Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-6 bg-gray-50 rounded-lg">
            <div className="space-y-3">
              <p className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <strong>Location:</strong> {item.location}
              </p>
              
              {item.jobType && (
                <p className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <strong>Job Type:</strong> {item.jobType}
                </p>
              )}
            </div>

            <div className="space-y-3">
              {item.category && (
                <p className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <strong>Category:</strong> {item.category}
                </p>
              )}
              
              {item.deadline && (
                <p className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <strong>Application Deadline:</strong> {new Date(item.deadline).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {item.description || item.details || 'No description available.'}
            </p>
          </div>

          {/* Responsibilities */}
          {item.responsibilities && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {Array.isArray(item.responsibilities) 
                  ? item.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))
                  : <li>{item.responsibilities}</li>
                }
              </ul>
            </div>
          )}

          {/* Requirements */}
          {item.requirements && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Requirements</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {Array.isArray(item.requirements) 
                  ? item.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))
                  : <li>{item.requirements}</li>
                }
              </ul>
            </div>
          )}

          {/* Benefits */}
          {item.benefits && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Benefits</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {Array.isArray(item.benefits) 
                  ? item.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))
                  : <li>{item.benefits}</li>
                }
              </ul>
            </div>
          )}

          {/* Resume Drop Section */}
          {item.status !== 'Not available' && (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">Apply for this Job</h3>
              <p className="text-gray-600 mb-4">
                {user ? `Applying as: ${user.username}` : 'Please log in to apply'}
              </p>
              <form onSubmit={handleSubmit}>
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-100 file:text-green-800
                    hover:file:bg-green-200
                    disabled:opacity-50"
                  disabled={!user || isSubmitting}
                />
                <button 
                  type="submit"
                  disabled={!user || !file || isSubmitting || item.status === 'Not available'}
                  className="mt-4 w-full md:w-auto bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition text-lg
                  disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          )}

          {item.status === 'Not available' && (
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-xl font-semibold text-red-800 mb-2">Position Filled</h3>
              <p className="text-red-600">This job position is no longer available.</p>
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default Preview;