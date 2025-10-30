import React, { useContext } from 'react'
import { Link, Outlet } from "react-router-dom"
import Footer from './Footer'
import { contextdata } from '../context/context'

const DEFAULT_PROFILE_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999999'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E"

const Navbar = () => {
  let {logout} = useContext(contextdata);
  return (
    <div>
      <nav className='flex w-full justify-around h-20 items-center shadow-md'>
        <h1 className='text-green-800 text-2xl font-bold'>
          <Link to="/">Neighbourhood KE</Link>
        </h1>
        <div className='flex w-1/2 justify-around items-center'>
          <p><Link to="/about">About</Link></p>
          <p><Link to="/news">News</Link></p>
          <p><Link to="/products">Products</Link></p>
          <p><Link to="/jobs">Jobs</Link></p>

          {/* --- Profile Section --- */}
          <div className='flex flex-col items-center'>
            <Link to="/profile">
              <img 
                className='w-10 h-10 rounded-full border-2 border-gray-300 bg-gray-100'
                src={DEFAULT_PROFILE_IMAGE}
                alt="Profile"
              />
            </Link>
          </div>
          {/* --- End of Profile Section --- */}

          <button onClick={logout} className='border border-black p-2 pl-5 pr-5 rounded-full'>
            Logout
          </button>
        </div>
      </nav>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Navbar