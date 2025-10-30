/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { contextdata } from '../context/context'; 

const DEFAULT_JOB_IMAGE = "https://i.imgur.com/6q7p56s.png";

// Move ModalForm outside the main component to prevent re-renders
const ModalForm = ({ 
  modalType, 
  formData, 
  handleChange, 
  handleSubmit, 
  handleCloseModal, 
  loading, 
  error 
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        Create New {modalType?.charAt(0).toUpperCase() + modalType?.slice(1)}
      </h2>

      {/* Show loading/error from context */}
      {loading && <p className="text-blue-600">Submitting...</p>}
      {error && <p className="text-red-600 bg-red-50 p-2 rounded">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Common Fields */}
        {modalType !== 'products' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
              disabled={loading}
            />
          </div>
        )}

        {modalType === 'products' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
              disabled={loading}
            />
          </div>
        )}

        {modalType !== 'jobs' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image *</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required={modalType !== 'jobs'}
              disabled={loading}
            />
          </div>
        )}

        {modalType === 'jobs' && (
           <div className="text-sm text-gray-600 p-2 bg-blue-50 rounded">
             Note: A default image will be used for this job posting.
           </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Brief Description *</label>
          <textarea
            name="briefDescription"
            value={formData.briefDescription}
            onChange={handleChange}
            rows="2"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Details</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows="5"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            disabled={loading}
          />
        </div>

        {/* Type-specific Fields */}
        {modalType === 'products' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (KSh) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Seller Phone *</label>
              <input
                type="tel"
                name="sellerPhone"
                value={formData.sellerPhone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
                disabled={loading}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="bargainable"
                checked={formData.bargainable}
                onChange={handleChange}
                className="rounded"
                disabled={loading}
              />
              <label className="text-sm text-gray-700">Price is negotiable</label>
            </div>
          </>
        )}

        {modalType === 'jobs' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Salary (KSh) *</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Responsibilities *</label>
              <textarea
                name="responsibility"
                value={formData.responsibility}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter job responsibilities"
                required
                disabled={loading}
              />
            </div>
          </>
        )}

        <div className="flex gap-4 justify-end mt-6">
          <button
            type="button"
            onClick={handleCloseModal}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

const Profile = () => {
  // Get ALL functions and state from context
  const {
    user,
    loading,
    error,
    getCredentials,
    uploadImage,
    createPost,
    getNews,
    getProducts,
    getJobs,
    getMyApplications,
    getReceivedApplications,
    updateApplicationStatus,
    clearError
  } = useContext(contextdata);

  const [activeTab, setActiveTab] = useState('posts');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  // State for data fetched from API
  const [userPosts, setUserPosts] = useState({ news: [], products: [], jobs: [] });
  const [jobApplications, setJobApplications] = useState([]);
  const [receivedApplications, setReceivedApplications] = useState([]);

  // Local loading states for tabs
  const [postsLoading, setPostsLoading] = useState(false);
  const [myAppsLoading, setMyAppsLoading] = useState(false);
  const [receivedAppsLoading, setReceivedAppsLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    briefDescription: '',
    details: '',
    location: '',
    image: null,
    name: '',
    price: '',
    bargainable: false,
    sellerPhone: '',
    salary: '',
    responsibility: '',
  });

  // Fetch user credentials on component mount
  useEffect(() => {
    const initializeUser = async () => {
      setUserLoading(true);
      try {
        if (!user) {
          const result = await getCredentials();
          console.log('User credentials result:', result); // Debug log
        }
      } catch (err) {
        console.error('Error fetching user credentials:', err);
      } finally {
        setUserLoading(false);
      }
    };
    
    initializeUser();
  }, []);

  // Fetch user posts when user data is available
  useEffect(() => {
    if (user) {
      console.log('User data available:', user); // Debug log
      fetchUserPosts();
    }
  }, [user]);

  // Fetch user posts from all categories
  const fetchUserPosts = async () => {
    if (!user || !user.username) {
      console.log('No user or username available'); // Debug log
      return;
    }
    
    setPostsLoading(true);
    try {
      console.log('Fetching posts for user:', user.username); // Debug log
      
      const [newsRes, productsRes, jobsRes] = await Promise.all([
        getNews(),
        getProducts(),
        getJobs()
      ]);

      console.log('API Responses:', { newsRes, productsRes, jobsRes }); // Debug log

      // Filter posts by current user's username
      const filterByUser = (items) => {
        if (!items || !Array.isArray(items)) {
          console.log('No items to filter or items is not an array');
          return [];
        }
        return items.filter(item => item && item.name === user.username);
      };

      const filteredPosts = {
        news: newsRes.success ? filterByUser(newsRes.news) : [],
        products: productsRes.success ? filterByUser(productsRes.products) : [],
        jobs: jobsRes.success ? filterByUser(jobsRes.jobs) : [],
      };

      console.log('Filtered posts:', filteredPosts); // Debug log
      setUserPosts(filteredPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setPostsLoading(false);
    }
  };

  // Fetch data when tabs are clicked
  useEffect(() => {
    const fetchTabContent = async () => {
      if (activeTab === 'applications') {
        setMyAppsLoading(true);
        try {
          const res = await getMyApplications();
          console.log('My applications:', res); // Debug log
          if (res.success) {
            setJobApplications(res.applications || []);
          }
        } catch (err) {
          console.error('Error fetching applications:', err);
        } finally {
          setMyAppsLoading(false);
        }
      } else if (activeTab === 'received') {
        setReceivedAppsLoading(true);
        try {
          const res = await getReceivedApplications();
          console.log('Received applications:', res); // Debug log
          if (res.success) {
            setReceivedApplications(res.applications || []);
          }
        } catch (err) {
          console.error('Error fetching received applications:', err);
        } finally {
          setReceivedAppsLoading(false);
        }
      }
    };
    
    fetchTabContent();
  }, [activeTab]);

  // Handle opening the modal
  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
    clearError();
    // Reset form data
    setFormData({
      title: '',
      briefDescription: '',
      details: '',
      location: '',
      image: null,
      name: '',
      price: '',
      bargainable: false,
      sellerPhone: '',
      salary: '',
      responsibility: '',
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
    clearError();
  };

  // Use useCallback for handleChange to prevent unnecessary re-renders
  const handleChange = useCallback((e) => {
    const { name, type, files, checked, value } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  // Use useCallback for handleSubmit to prevent unnecessary re-renders
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    let imageUrl = '';

    try {
      // 1. Handle image upload
      if (modalType === 'jobs') {
        imageUrl = DEFAULT_JOB_IMAGE;
      } else if (formData.image) {
        const uploadRes = await uploadImage(formData.image);
        if (!uploadRes.success) {
          throw new Error(uploadRes.message || "Image upload failed");
        }
        imageUrl = uploadRes.url;
      } else if (modalType !== 'jobs') {
        throw new Error("An image is required for news or products");
      }

      // 2. Construct post data according to backend expectations
      const postData = {
        category: modalType,
        title: modalType === 'products' ? formData.name : formData.title,
        description: formData.briefDescription,
        details: formData.details,
        image_url: imageUrl,
      };

      // Add optional fields only if they have values
      if (formData.price) {
        postData.price = Number(formData.price);
      }
      if (formData.sellerPhone) {
        postData.tel = formData.sellerPhone;
      }
      if (formData.salary) {
        postData.salary = Number(formData.salary);
      }
      if (formData.responsibility) {
        postData.responsibities = formData.responsibility;
      }

      console.log('Submitting post data:', postData); // Debug log

      // 3. Create the post
      const postRes = await createPost(postData);
      if (!postRes.success) {
        throw new Error(postRes.message || "Failed to create post");
      }

      // 4. Success: Close modal and refresh posts
      handleCloseModal();
      await fetchUserPosts(); // Refresh the posts

    } catch (err) {
      console.error("handleSubmit error:", err.message);
    }
  }, [modalType, formData, uploadImage, createPost, fetchUserPosts]);

  // Handle application status update
  const handleUpdateStatus = async (applicationId, newStatus) => {
    console.log('Updating application status:', applicationId, newStatus); // Debug log
    const res = await updateApplicationStatus(applicationId, newStatus);
    if (res.success) {
      // Refresh the list of received applications
      const refreshRes = await getReceivedApplications();
      if (refreshRes.success) {
        setReceivedApplications(refreshRes.applications || []);
      }
    }
  };

  const handleImageError = (e) => {
    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999999'%3E%3Cpath d='M4 4h16v16H4V4z'/%3E%3C/svg%3E";
  };

  // Formatting user join date
  const getJoinDate = () => {
    if (!user) return "Member";
    // If your user model has createdAt, use it, otherwise use current date
    return "Member";
  };

  // ACTION BUTTONS COMPONENT
  const ActionButtons = () => (
    <div className="mb-8 flex flex-wrap gap-4 justify-center">
      <button 
        onClick={() => handleOpenModal('news')}
        className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Post News
      </button>
      <button 
        onClick={() => handleOpenModal('products')}
        className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Product
      </button>
      <button 
        onClick={() => handleOpenModal('jobs')}
        className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Post Job
      </button>
    </div>
  );

  // TAB BUTTON COMPONENT
  const TabButton = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-semibold rounded-lg transition ${
        isActive 
          ? 'bg-green-800 text-white' 
          : 'text-green-800 hover:bg-green-100'
      }`}
    >
      {label}
    </button>
  );

  // Show loading state while fetching user
  if (userLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // MAIN RETURN
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FFFFFF'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E"
              alt="Profile"
              className="w-24 h-24 rounded-full bg-white/20"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {user ? user.username : "User Not Found"}
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            {getJoinDate()}
          </p>
          {user && (
            <p className="text-sm opacity-75 mt-2">
              {user.county} • {user.email}
            </p>
          )}
          {!user && (
            <p className="text-sm opacity-75 mt-2">
              Please check if you are logged in
            </p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ActionButtons />
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8 justify-center">
          <TabButton 
            label="My Posts" 
            isActive={activeTab === 'posts'} 
            onClick={() => setActiveTab('posts')}
          />
          <TabButton 
            label="My Applications" 
            isActive={activeTab === 'applications'} 
            onClick={() => setActiveTab('applications')}
          />
          <TabButton 
            label="Received Applications" 
            isActive={activeTab === 'received'} 
            onClick={() => setActiveTab('received')}
          />
        </div>

        {/* Global Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
            <button 
              onClick={clearError}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Posts Content */}
        {activeTab === 'posts' && (
          <div className="space-y-12">
            {postsLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading your posts...</p>
              </div>
            ) : (
              <>
                {/* News Section */}
                <div>
                  <h2 className="text-2xl font-bold text-green-800 mb-6">My News Posts</h2>
                  {userPosts.news.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">You have not posted any news.</p>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {userPosts.news.map(news => (
                        <div key={news._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                          <img 
                            src={news.image_url} 
                            alt={news.title} 
                            className="w-full h-48 object-cover" 
                            onError={handleImageError}
                          />
                          <div className="p-4">
                            <h3 className="font-semibold text-green-800 mb-2 line-clamp-2">{news.title}</h3>
                            <p className="text-xs text-gray-600 mb-4 line-clamp-3">{news.description}</p>
                            <div className="flex gap-2">
                              <button className="text-blue-600 text-sm hover:underline">Edit</button>
                              <button className="text-red-600 text-sm hover:underline">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Products Section */}
                <div>
                  <h2 className="text-2xl font-bold text-green-800 mb-6">My Products</h2>
                  {userPosts.products.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">You have not posted any products.</p>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {userPosts.products.map(product => (
                        <div key={product._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                          <img 
                            src={product.image_url} 
                            alt={product.title} 
                            className="w-full h-48 object-cover"
                            onError={handleImageError}
                          />
                          <div className="p-4">
                            <h3 className="font-semibold text-green-800 mb-2 line-clamp-2">{product.title}</h3>
                            <p className="font-bold text-green-800 mb-4">Ksh {product.price?.toLocaleString()}</p>
                            <div className="flex gap-2">
                              <button className="text-blue-600 text-sm hover:underline">Edit</button>
                              <button className="text-red-600 text-sm hover:underline">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Jobs Section */}
                <div>
                  <h2 className="text-2xl font-bold text-green-800 mb-6">My Job Postings</h2>
                  {userPosts.jobs.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">You have not posted any jobs.</p>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {userPosts.jobs.map(job => (
                        <div key={job._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                          <img 
                            src={job.image_url || DEFAULT_JOB_IMAGE} 
                            alt={job.title} 
                            className="w-full h-48 object-cover" 
                            onError={handleImageError} 
                          />
                          <div className="p-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              job.status === 'Not available' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {job.status === 'Not available' ? 'Filled' : 'Available'}
                            </span>
                            <h3 className="font-semibold text-green-800 my-2 line-clamp-2">{job.title}</h3>
                            <p className="font-bold text-green-800 mb-4">Ksh {job.salary?.toLocaleString()}</p>
                            <div className="flex gap-2">
                              <button className="text-blue-600 text-sm hover:underline">Edit</button>
                              <button className="text-red-600 text-sm hover:underline">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Applications Content */}
        {activeTab === 'applications' && (
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-6">My Job Applications</h2>
            {myAppsLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading applications...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobApplications.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">You have not applied for any jobs.</p>
                ) : (
                  jobApplications.map(application => (
                    <div 
                      key={application._id}
                      className="bg-white border border-gray-200 rounded-lg p-6 shadow-md"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-green-800 text-lg mb-2">{application.job_title}</h3>
                          <p className="text-gray-600">Posted by: {application.owner}</p>
                          {application.salary && (
                            <p className="text-green-800 font-semibold">Salary: Ksh {application.salary?.toLocaleString()}</p>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm capitalize ${
                          application.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : application.status === 'accepted'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {application.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Applied on: {new Date(application.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Received Applications Content */}
        {activeTab === 'received' && (
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-6">Applications Received</h2>
            {receivedAppsLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading applications...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {receivedApplications.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">You have not received any applications.</p>
                ) : (
                  receivedApplications.map(application => (
                    <div 
                      key={application._id}
                      className="bg-white border border-gray-200 rounded-lg p-6 shadow-md"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-green-800 text-lg mb-2">
                            {application.job_title}
                          </h3>
                          <div className="space-y-2">
                            <p className="text-gray-800">
                              <span className="font-medium">Applicant:</span> {application.applicant}
                            </p>
                            {application.salary && (
                              <p className="text-green-800 font-semibold">
                                Salary: Ksh {application.salary?.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2 text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm capitalize ${
                            application.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800'
                              : application.status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {application.status}
                          </span>
                          <p className="text-sm text-gray-500">
                            Applied: {new Date(application.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {application.resume && (
                          <a 
                            href={application.resume}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 text-blue-600 hover:underline"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            <span className="text-sm">View Resume</span>
                          </a>
                        )}
                        
                        {/* Only show buttons if status is 'pending' */}
                        {application.status === 'pending' && (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleUpdateStatus(application._id, 'accepted')}
                              className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm hover:bg-green-200 transition"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(application._id, 'rejected')}
                              className="px-4 py-2 bg-red-100 text-red-800 rounded-lg text-sm hover:bg-red-200 transition"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal - Now using the external ModalForm component */}
      {showModal && (
        <ModalForm
          modalType={modalType}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCloseModal={handleCloseModal}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};

export default Profile;