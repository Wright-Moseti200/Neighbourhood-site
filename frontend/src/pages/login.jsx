import React, { useState } from 'react'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)

  const kenyanCounties = [
    "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita-Taveta", "Garissa",
    "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka-Nithi", "Embu",
    "Kitui", "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga", "Murang'a",
    "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans-Nzoia", "Uasin Gishu",
    "Elgeyo-Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado",
    "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisumu",
    "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"
  ]

  return (
    <div className='w-full min-h-screen bg-white'>
      {/* Header */}
      <div className='w-full flex h-20 justify-between px-4 md:px-8 lg:justify-around items-center'>
        <h1 className='text-xl md:text-2xl font-bold text-green-800'>Neighborhood KE</h1>
        <div className='flex gap-4 md:gap-20 items-center'>
          <button 
            onClick={() => setIsLogin(true)}
            className='bg-neutral-300 p-2 md:p-3 rounded-full px-4 md:px-5 font-semibold text-sm md:text-base'
          >
            Log in
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className='bg-green-800 text-white p-2 md:p-3 px-4 md:px-5 font-semibold rounded-full text-sm md:text-base'
          >
            Sign up
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className='flex min-h-[75vh] flex-col justify-center items-center px-4 py-8'>
        {isLogin ? (
          // Login Form
          <div className='w-full max-w-[500px] flex flex-col rounded-lg shadow-lg p-6 md:p-10'>
            <h1 className='font-bold text-2xl md:text-3xl text-center text-green-800'>Welcome Back</h1>
            <p className='text-center text-gray-600 mt-2'>Log in to your neighborhood</p>
            
            <div className='mt-5'>
              <input 
                type="email" 
                placeholder='Email address' 
                name='email' 
                className='w-full outline-none border border-gray-300 p-3 md:p-4 rounded-full placeholder:text-gray-500 focus:border-green-800 transition'
              />
              <br/>
              <input 
                type="password" 
                placeholder='Password' 
                name="password" 
                className='mt-4 w-full outline-none border border-gray-300 p-3 md:p-4 rounded-full placeholder:text-gray-500 focus:border-green-800 transition'
              />
            </div>
            
            <p className='mt-5 text-xs md:text-sm text-gray-600'>
              By continuing, you agree to our Privacy Policy, Cookie Policy, and Member Agreement.
            </p>
            
            <button className='w-full p-3 md:p-4 bg-green-800 font-semibold text-white rounded-full mt-5 hover:bg-green-700 transition'>
              Log in
            </button>
            
            <p className='text-center mt-4 text-sm text-gray-600'>
              Don't have an account? 
              <button 
                onClick={() => setIsLogin(false)} 
                className='text-green-800 font-semibold ml-1 hover:underline'
              >
                Sign up
              </button>
            </p>
          </div>
        ) : (
          // Signup Form
          <div className='w-full max-w-[500px] flex flex-col rounded-lg shadow-lg p-6 md:p-10'>
            <h1 className='font-bold text-2xl md:text-3xl text-center text-green-800'>Join Your Neighborhood</h1>
            <p className='text-center text-gray-600 mt-2'>Create an account to get started</p>
            
            <div className='mt-5 space-y-4'>
              <input 
                type="text" 
                placeholder='Username' 
                name='username' 
                className='w-full outline-none border border-gray-300 p-3 md:p-4 rounded-full placeholder:text-gray-500 focus:border-green-800 transition'
              />
              
              <input 
                type="email" 
                placeholder='Email address' 
                name='email' 
                className='w-full outline-none border border-gray-300 p-3 md:p-4 rounded-full placeholder:text-gray-500 focus:border-green-800 transition'
              />
              
              <input 
                type="tel" 
                placeholder='Phone number (e.g., 0712345678)' 
                name='phone' 
                className='w-full outline-none border border-gray-300 p-3 md:p-4 rounded-full placeholder:text-gray-500 focus:border-green-800 transition'
              />
              
              <input 
                type="password" 
                placeholder='Create a password' 
                name="password" 
                className='w-full outline-none border border-gray-300 p-3 md:p-4 rounded-full placeholder:text-gray-500 focus:border-green-800 transition'
              />
              
              <select 
                name="county" 
                className='w-full outline-none border border-gray-300 p-3 md:p-4 rounded-full text-gray-700 focus:border-green-800 transition appearance-none bg-white'
                defaultValue=""
              >
                <option value="" disabled>Select your county</option>
                {kenyanCounties.map((county, index) => (
                  <option key={index} value={county}>{county}</option>
                ))}
              </select>
              
              <div>
                <textarea 
                  placeholder='Brief description of your location' 
                  name='location' 
                  rows="3"
                  className='w-full outline-none border border-gray-300 p-3 md:p-4 rounded-2xl placeholder:text-gray-500 focus:border-green-800 transition resize-none'
                />
                <p className='text-xs text-gray-500 mt-1 px-2'>
                  e.g., "Around Kabarak University" or "Milimani Estate, near Nakuru War Memorial" or "Njoro Subcounty, Pipeline Ward"
                </p>
              </div>
            </div>
            
            <p className='mt-5 text-xs md:text-sm text-gray-600'>
              By continuing with sign up, you agree to our Privacy Policy, Cookie Policy, and Member Agreement.
            </p>
            
            <button className='w-full p-3 md:p-4 bg-green-800 font-semibold text-white rounded-full mt-5 hover:bg-green-700 transition'>
              Sign up
            </button>
            
            <p className='text-center mt-4 text-sm text-gray-600'>
              Already have an account? 
              <button 
                onClick={() => setIsLogin(true)} 
                className='text-green-800 font-semibold ml-1 hover:underline'
              >
                Log in
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login