/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { newsItems, products, jobs } from '../data'

const KENYA_COUNTIES = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa", 
  "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", 
  "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", 
  "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", 
  "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", 
  "Samburu", "Siaya", "Taita Taveta", "Tana River", "Tharaka Nithi", "Trans Nzoia", 
  "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [formData, setFormData] = useState({
    // News fields
    title: '',
    briefDescription: '',
    details: '',
    location: '',
    image: '',
    // Product fields
    name: '',
    price: '',
    bargainable: false,
    available: true,
    sellerPhone: '',
    // Job fields
    salary: '',
    responsibilities: [''],
  })

  // Dummy data - In a real app, these would come from an API/backend
  const [userPosts, setUserPosts] = useState({
    news: newsItems.slice(0, 2),
    products: products.slice(0, 2),
    jobs: jobs.slice(0, 2)
  })

  const [jobApplications] = useState([
    {
      id: 1,
      jobTitle: "Waitress/Waiter",
      company: "Restaurant CBD",
      status: "Pending",
      appliedDate: "2023-10-20",
      resumeName: "john_resume.pdf"
    }
  ])

  const [receivedApplications] = useState([
    {
      id: 1,
      jobId: 1,
      jobTitle: "Waitress/Waiter",
      applicantName: "Jane Smith",
      applicantEmail: "jane@example.com",
      applicantPhone: "+254712345678",
      status: "Pending",
      appliedDate: "2023-10-20",
      resumeName: "jane_resume.pdf"
    }
  ])

  const handleOpenModal = (type) => {
    setModalType(type)
    setShowModal(true)
    setFormData({
      title: '',
      briefDescription: '',
      details: '',
      location: '',
      image: '',
      name: '',
      price: '',
      bargainable: false,
      available: true,
      sellerPhone: '',
      salary: '',
      responsibilities: [''],
    })
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setModalType(null)
    setFormData({}) // Reset form data
  }

  // First, update the handleChange function to handle file inputs
  const handleChange = (e) => {
    const { name, type, files } = e.target
    
    if (type === 'file') {
      const file = files[0]
      setFormData(prev => ({
        ...prev,
        [name]: file
      }))
    } else {
      const value = type === 'checkbox' ? e.target.checked : e.target.value
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleResponsibilityChange = (index, value) => {
    const newResponsibilities = [...formData.responsibilities || ['']]
    newResponsibilities[index] = value
    setFormData(prev => ({
      ...prev,
      responsibilities: newResponsibilities
    }))
  }

  const addResponsibility = () => {
    setFormData(prev => ({
      ...prev,
      responsibilities: [...(prev.responsibilities || ['']), '']
    }))
  }

  // Update the handleSubmit function to handle FormData
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const form = new FormData()
    
    // Append all form data
    Object.keys(formData).forEach(key => {
      if (key === 'image' && formData[key] instanceof File) {
        form.append('image', formData[key])
      } else if (key === 'responsibilities' && Array.isArray(formData[key])) {
        form.append('responsibilities', JSON.stringify(formData[key]))
      } else {
        form.append(key, formData[key])
      }
    })

    // Create URL preview for the image
    const imageUrl = formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image

    const newItem = {
      id: Date.now(),
      // keep original fields for compatibility with display code
      title: formData.title || '',
      name: formData.name || '',
      price: formData.price || '',
      salary: formData.salary || '',
      // map the new modal fields into the existing display fields
      description: formData.briefDescription || '',
      longDescription: formData.details || '',
      // keep responsibilities / other fields
      responsibilities: formData.responsibilities || [],
      bargainable: formData.bargainable || false,
      available: formData.available !== undefined ? formData.available : true,
      sellerPhone: formData.sellerPhone || '',
      image: imageUrl,
      date: new Date().toLocaleDateString(),
    }

    // Update the appropriate section based on modal type
    setUserPosts(prev => ({
      ...prev,
      [modalType]: [newItem, ...prev[modalType]]
    }))

    handleCloseModal()
  }

  const handleDelete = (type, id) => {
    setUserPosts(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }))
  }

  const handleImageError = (e) => {
    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999999'%3E%3Cpath d='M4 4h16v16H4V4z'/%3E%3C/svg%3E"
  }

  const ModalForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-green-800 mb-6">
          Create New {modalType?.charAt(0).toUpperCase() + modalType?.slice(1)}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Common Fields */}
          {modalType !== 'products' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          )}

          {modalType === 'products' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <select
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="">Select County</option>
              {KENYA_COUNTIES.map(county => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required={!formData.image}
            />
          </div>

          {/* Replaced Description + Long Description with Brief Description + Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Brief Description</label>
            <textarea
              name="briefDescription"
              value={formData.briefDescription || ''}
              onChange={handleChange}
              rows="2"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Details</label>
            <textarea
              name="details"
              value={formData.details || ''}
              onChange={handleChange}
              rows="5"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Type-specific Fields */}
          {modalType === 'news' && (
            <div className="text-sm text-gray-600">
              Note: "Brief Description" will be shown in feeds. Use "Details" for full content.
            </div>
          )}

          {modalType === 'products' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price (KSh)</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Seller Phone</label>
                <input
                  type="tel"
                  name="sellerPhone"
                  value={formData.sellerPhone || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="bargainable"
                  checked={formData.bargainable || false}
                  onChange={handleChange}
                  className="rounded"
                />
                <label className="text-sm text-gray-700">Price is negotiable</label>
              </div>
            </>
          )}

          {modalType === 'jobs' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Salary (KSh)</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
                {(formData.responsibilities || [''])?.map((resp, index) => (
                  <div key={index} className="mt-2">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder={`Responsibility ${index + 1}`}
                      required
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addResponsibility}
                  className="mt-2 text-green-800 text-sm hover:underline"
                >
                  + Add Another Responsibility
                </button>
              </div>
            </>
          )}

          <div className="flex gap-4 justify-end mt-6">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  // Update the action buttons to use modal
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
  )

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
  )

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">John Doe</h1>
          <p className="text-lg md:text-xl opacity-90">
            Member since October 2023
          </p>
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

        {/* Posts Content */}
        {activeTab === 'posts' && (
          <div className="space-y-12">
            {/* News Section */}
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-6">My News Posts</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {userPosts.news.map(news => (
                  <div key={news.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-48 object-cover" 
                      onError={handleImageError}
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">{news.date}</span>
                      </div>
                      <h3 className="font-semibold text-green-800 mb-2">{news.title}</h3>
                      <p className="text-xs text-gray-600 mb-4">{news.description}</p>
                      <div className="flex gap-2">
                        <button className="text-blue-600 text-sm hover:underline">Edit</button>
                        <button 
                          onClick={() => handleDelete('news', news.id)} 
                          className="text-red-600 text-sm hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Products Section */}
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-6">My Products</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {userPosts.products.map(product => (
                  <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">{product.date}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      <h3 className="font-semibold text-green-800 mb-2">{product.name}</h3>
                      <p className="font-bold text-green-800 mb-4">{product.price}</p>
                      <div className="flex gap-2">
                        <button className="text-blue-600 text-sm hover:underline">Edit</button>
                        <button 
                          onClick={() => handleDelete('products', product.id)} 
                          className="text-red-600 text-sm hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jobs Section */}
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-6">My Job Postings</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {userPosts.jobs.map(job => (
                  <div key={job.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                    <img src={job.image} alt={job.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">{job.date}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          job.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {job.available ? 'Available' : 'Filled'}
                        </span>
                      </div>
                      <h3 className="font-semibold text-green-800 mb-2">{job.title}</h3>
                      <p className="font-bold text-green-800 mb-4">{job.salary}</p>
                      <div className="flex gap-2">
                        <button className="text-blue-600 text-sm hover:underline">Edit</button>
                        <button 
                          onClick={() => handleDelete('jobs', job.id)} 
                          className="text-red-600 text-sm hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Applications Content */}
        {activeTab === 'applications' && (
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-6">My Job Applications</h2>
            <div className="space-y-4">
              {jobApplications.map(application => (
                <div 
                  key={application.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-md"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-green-800 text-lg mb-2">{application.jobTitle}</h3>
                      <p className="text-gray-600">{application.company}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      application.status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {application.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Applied: {application.appliedDate}</p>
                    <p>Resume: {application.resumeName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Received Applications Content */}
        {activeTab === 'received' && (
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-6">Applications Received</h2>
            <div className="space-y-4">
              {receivedApplications.map(application => (
                <div 
                  key={application.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-md"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-green-800 text-lg mb-2">
                        {application.jobTitle}
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-800">
                          <span className="font-medium">Applicant:</span> {application.applicantName}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Email:</span> {application.applicantEmail}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Phone:</span> {application.applicantPhone}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                        application.status === 'Pending' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {application.status}
                      </span>
                      <p className="text-sm text-gray-500">
                        Applied: {application.appliedDate}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <span className="text-sm text-gray-600">
                        Resume: {application.resumeName}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          // Handle accepting application
                        }}
                        className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm hover:bg-green-200"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => {
                          // Handle rejecting application
                        }}
                        className="px-4 py-2 bg-red-100 text-red-800 rounded-lg text-sm hover:bg-red-200"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && <ModalForm />}
    </div>
  )
}

export default Profile