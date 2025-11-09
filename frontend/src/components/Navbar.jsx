import React, { useContext, useState } from 'react'
import { Link, Outlet } from "react-router-dom"
import Footer from './Footer'
import { contextdata } from '../context/context'

const DEFAULT_PROFILE_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999999'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E"

const Navbar = () => {
  let { logout } = useContext(contextdata);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <nav className='flex w-full justify-between md:justify-around h-20 items-center shadow-md px-4 md:px-0 relative'>
        {/* Logo */}
        <h1 className='text-green-800 text-2xl font-bold'>
          <Link to="/" onClick={closeMenu}>Neighbourhood KE</Link>
        </h1>

        {/* Desktop Navigation */}
        <div className='hidden md:flex w-1/2 justify-around items-center'>
          <p><Link to="/about">About</Link></p>
          <p><Link to="/news">News</Link></p>
          <p><Link to="/products">Products</Link></p>
          <p><Link to="/jobs">Jobs</Link></p>

          {/* Profile Section */}
          <div className='flex flex-col items-center'>
            <Link to="/profile">
              <img 
                className='w-10 h-10 rounded-full border-2 border-gray-300 bg-gray-100'
                src={DEFAULT_PROFILE_IMAGE}
                alt="Profile"
              />
            </Link>
          </div>

          <button onClick={logout} className='border border-black p-2 pl-5 pr-5 rounded-full'>
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center space-x-4'>
          {/* Profile Icon - Mobile */}
          <Link to="/profile" className='flex items-center'>
            <img 
              className='w-8 h-8 rounded-full border-2 border-gray-300 bg-gray-100'
              src={DEFAULT_PROFILE_IMAGE}
              alt="Profile"
            />
          </Link>
          
          {/* Hamburger Menu */}
          <button 
            onClick={toggleMenu}
            className='flex flex-col justify-center items-center w-8 h-8 space-y-1'
          >
            <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-current transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation Menu - FIXED VERSION */}
        <div className={`absolute top-20 left-0 w-full bg-white shadow-lg md:hidden transform transition-all duration-300 ease-in-out z-20 ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
          <div className='flex flex-col p-4 space-y-4'>
            <Link 
              to="/about" 
              className='py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors text-center'
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              to="/news" 
              className='py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors text-center'
              onClick={closeMenu}
            >
              News
            </Link>
            <Link 
              to="/products" 
              className='py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors text-center'
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link 
              to="/jobs" 
              className='py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors text-center'
              onClick={closeMenu}
            >
              Jobs
            </Link>
            <button 
              onClick={() => {
                closeMenu();
                logout();
              }} 
              className='border border-black p-3 rounded-full text-center hover:bg-gray-100 transition-colors'
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={closeMenu}
        ></div>
      )}
      
      <Outlet />
      <Footer />
    </div>
  )
}

export default Navbar