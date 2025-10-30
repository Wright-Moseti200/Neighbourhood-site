import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { contextdata } from '../context/context'

const Login = () => {
  const navigate = useNavigate()
  const { login, signUp, loading, error, clearError, isAuthenticated } = useContext(contextdata)
  
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    county: '',
    location_description: ''
  })
  const [formErrors, setFormErrors] = useState({})

  const kenyanCounties = [
    "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita-Taveta", "Garissa",
    "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka-Nithi", "Embu",
    "Kitui", "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga", "Murang'a",
    "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans-Nzoia", "Uasin Gishu",
    "Elgeyo-Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado",
    "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisumu",
    "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"
  ]

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile')
    }
  }, [isAuthenticated, navigate])

  // Clear errors when switching between login/signup
  useEffect(() => {
    clearError()
    setFormErrors({})
    setFormData({
      username: '',
      email: '',
      phone: '',
      password: '',
      county: '',
      location_description: ''
    })
  }, [isLogin])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateLoginForm = () => {
    const errors = {}
    
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    
    return errors
  }

  const validateSignupForm = () => {
    const errors = {}
    
    if (!formData.username) {
      errors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters'
    }
    
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    
    if (!formData.phone) {
      errors.phone = 'Phone number is required'
    } else if (!/^(07|01)\d{8}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits starting with 07 or 01'
    }
    
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    
    if (!formData.county) {
      errors.county = 'County is required'
    }
    
    if (!formData.location_description) {
      errors.location_description = 'Location description is required'
    } else if (formData.location_description.length < 10) {
      errors.location_description = 'Please provide a more detailed description (at least 10 characters)'
    }
    
    return errors
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    
    // Validate form
    const errors = validateLoginForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    
    // Call login from context
    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      // Redirect to profile or home page
      navigate('/profile')
    }
    // Error is handled by context and displayed below
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    
    // Validate form
    const errors = validateSignupForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    
    // Call signUp from context
    const result = await signUp({
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      county: formData.county,
      location_description: formData.location_description
    })
    
    if (result.success) {
      // Redirect to profile or home page
      navigate('/profile')
    }
    // Error is handled by context and displayed below
  }

  return (
    <div className='w-full min-h-screen bg-white'>
      {/* Header */}
      <div className='w-full flex h-20 justify-between px-4 md:px-8 lg:justify-around items-center'>
        <h1 className='text-xl md:text-2xl font-bold text-green-800'>Neighborhood KE</h1>
        <div className='flex gap-4 md:gap-20 items-center'>
          <button 
            onClick={() => setIsLogin(true)}
            className={`p-2 md:p-3 rounded-full px-4 md:px-5 font-semibold text-sm md:text-base transition ${
              isLogin ? 'bg-green-800 text-white' : 'bg-neutral-300'
            }`}
          >
            Log in
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`p-2 md:p-3 px-4 md:px-5 font-semibold rounded-full text-sm md:text-base transition ${
              !isLogin ? 'bg-green-800 text-white' : 'bg-neutral-300'
            }`}
          >
            Sign up
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className='flex min-h-[75vh] flex-col justify-center items-center px-4 py-8'>
        {isLogin ? (
          // Login Form
          <form onSubmit={handleLogin} className='w-full max-w-[500px] flex flex-col rounded-lg shadow-lg p-6 md:p-10'>
            <h1 className='font-bold text-2xl md:text-3xl text-center text-green-800'>Welcome Back</h1>
            <p className='text-center text-gray-600 mt-2'>Log in to your neighborhood</p>
            
            {/* Error Message */}
            {error && (
              <div className='mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm'>
                {error}
              </div>
            )}
            
            <div className='mt-5'>
              <input 
                type="email" 
                placeholder='Email address' 
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full outline-none border border-gray-300 p-3 md:p-4 rounded-full placeholder:text-gray-500 focus:border-green-800 transition'
              />
              {formErrors.email && (
                <p className='text-red-600 text-xs mt-1 ml-4'>{formErrors.email}</p>
              )}
              
              <input 
                type="password" 
                placeholder='Password' 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className='mt-4 w-full outline-none border border-gray-300 p-3 md:p-4 rounded-full placeholder:text-gray-500 focus:border-green-800 transition'
              />
              {formErrors.password && (
                <p className='text-red-600 text-xs mt-1 ml-4'>{formErrors.password}</p>
              )}
            </div>
            
            <p className='mt-5 text-xs md:text-sm text-gray-600'>
              By continuing, you agree to our Privacy Policy, Cookie Policy, and Member Agreement.
            </p>
            
            <button 
              type='submit'
              disabled={loading}
              className='w-full p-3 md:p-4 bg-green-800 font-semibold text-white rounded-full mt-5 hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
            
            <p className='text-center mt-4 text-sm text-gray-600'>
              Don't have an account? 
              <button 
                type='button'
                onClick={() => setIsLogin(false)} 
                className='text-green-800 font-semibold ml-1 hover:underline'
              >
                Sign up
              </button>
            </p>
          </form>
        ) : (
          // Signup Form
          <form onSubmit={handleSignup} className='w-full max-w-[500px] flex flex-col rounded-lg shadow-lg p-6 md:p-10'>
            <h1 className='font-bold text-2xl md:text-3xl text-center text-green-800'>Join Your Neighborhood</h1>
            <p className='text-center text-gray-600 mt-2'>Create an account to get started</p>
            
            {/* Error Message */}
            {error && (
              <div className='mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm'>
                {error}
              </div>
            )}
            
            <div className='mt-5 space-y-4'>
              <div>
                <input 
                  type="text" 
                  placeholder='Username' 
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  className='w-full outline-none border border-gray-300 p-3 md:p-4 rounded-full placeholder:text-gray-500 focus:border-green-800 transition'
                />
                {formErrors.username && (
                  <p className='text-red-600 text-xs mt-1 ml-4'>{formErrors.username}</p>
                )}
              </div>
              
              <div>
                <input 
                  type="email" 
                  placeholder='Email address' 
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full outline-none border border-gray-300 p-3 md:p-4 rounded-full placeholder:text-gray-500 focus:border-green-800 transition'
                />
                {formErrors.email && (
                  <p className='text-red-600 text-xs mt-1 ml-4'>{formErrors.email}</p>
                )}
              </div>
              
              <div>
                <input 
                  type="tel" 
                  placeholder='Phone number (e.g., 0712345678)' 
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  className='w-full outline-none border border-gray-300 p-3 md:p-4 rounded-full placeholder:text-gray-500 focus:border-green-800 transition'
                />
                {formErrors.phone && (
                  <p className='text-red-600 text-xs mt-1 ml-4'>{formErrors.phone}</p>
                )}
              </div>
              
              <div>
                <input 
                  type="password" 
                  placeholder='Create a password' 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full outline-none border border-gray-300 p-3 md:p-4 rounded-full placeholder:text-gray-500 focus:border-green-800 transition'
                />
                {formErrors.password && (
                  <p className='text-red-600 text-xs mt-1 ml-4'>{formErrors.password}</p>
                )}
              </div>
              
              <div>
                <select 
                  name="county"
                  value={formData.county}
                  onChange={handleChange}
                  className='w-full outline-none border border-gray-300 p-3 md:p-4 rounded-full text-gray-700 focus:border-green-800 transition appearance-none bg-white'
                >
                  <option value="">Select your county</option>
                  {kenyanCounties.map((county, index) => (
                    <option key={index} value={county}>{county}</option>
                  ))}
                </select>
                {formErrors.county && (
                  <p className='text-red-600 text-xs mt-1 ml-4'>{formErrors.county}</p>
                )}
              </div>
              
              <div>
                <textarea 
                  placeholder='Brief description of your location' 
                  name='location_description'
                  value={formData.location_description}
                  onChange={handleChange}
                  rows="3"
                  className='w-full outline-none border border-gray-300 p-3 md:p-4 rounded-2xl placeholder:text-gray-500 focus:border-green-800 transition resize-none'
                />
                <p className='text-xs text-gray-500 mt-1 px-2'>
                  e.g., "Around Kabarak University" or "Milimani Estate, near Nakuru War Memorial" or "Njoro Subcounty, Pipeline Ward"
                </p>
                {formErrors.location_description && (
                  <p className='text-red-600 text-xs mt-1 ml-4'>{formErrors.location_description}</p>
                )}
              </div>
            </div>
            
            <p className='mt-5 text-xs md:text-sm text-gray-600'>
              By continuing with sign up, you agree to our Privacy Policy, Cookie Policy, and Member Agreement.
            </p>
            
            <button 
              type='submit'
              disabled={loading}
              className='w-full p-3 md:p-4 bg-green-800 font-semibold text-white rounded-full mt-5 hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
            
            <p className='text-center mt-4 text-sm text-gray-600'>
              Already have an account? 
              <button 
                type='button'
                onClick={() => setIsLogin(true)} 
                className='text-green-800 font-semibold ml-1 hover:underline'
              >
                Log in
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login